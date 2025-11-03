import { createAnthropic } from "@ai-sdk/anthropic";
import type { NextRequest } from "next/server";
import { env } from "~/env";
import { PROMPT } from "./prompt";
import {
  experimental_createMCPClient,
  streamText,
  type ModelMessage,
  stepCountIs,
} from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { MAX_STEPS } from "~/lib/constants";
import { parseBlocks } from "./parser";
import { PayloadSchema, RequestPayloadSchema } from "./schemas";
import { createClient } from "~/utils/supabase/server";

const anthropic = createAnthropic({ apiKey: env.ANTHROPIC_API_KEY });

type UserPreferences = {
  major: string;
  interests: string;
  future: string;
};

async function constructPrompt(
  userId?: string,
  displayName?: string,
): Promise<string> {
  let basePrompt = PROMPT;

  // If there is no userId and no displayName to inject, return the base prompt
  if (!userId && !displayName?.trim()) {
    return basePrompt;
  }

  try {
    let data: unknown = undefined;
    let error: unknown = undefined;

    if (userId) {
      const supabase = await createClient();
      const result = await supabase
        .from("user_preferences")
        .select("major, interests, future")
        .eq("user_id", userId)
        .single();
      data = result.data;
      error = result.error;
    }

    const prefs = (data ?? {}) as Partial<UserPreferences>;

    const hasPreferences =
      Boolean(prefs.major?.trim()) ||
      Boolean(prefs.interests?.trim()) ||
      Boolean(prefs.future?.trim());

    const hasDisplayName = Boolean(displayName?.trim());

    if (hasPreferences || hasDisplayName) {
      basePrompt += "\n\n## User Personalization\n\n";
      basePrompt +=
        "The user has provided the following information about themselves. Use this to personalize your responses and course recommendations:\n\n";

      if (hasDisplayName && displayName) {
        basePrompt += `**Display Name:** ${displayName}\n\n`;
      }

      if (prefs.major?.trim()) {
        basePrompt += `**Major/Academic Interest:** ${prefs.major}\n\n`;
      }

      if (prefs.interests?.trim()) {
        basePrompt += `**Interests:** ${prefs.interests}\n\n`;
      }

      if (prefs.future?.trim()) {
        basePrompt += `**Future Goals:** ${prefs.future}\n\n`;
      }
    }

    return basePrompt;
  } catch (err) {
    console.error("Error fetching user preferences:", err);
    return basePrompt;
  }
}

export const POST = async (req: NextRequest) => {
  try {
    // Check authorization
    const authHeader = req.headers.get("authorization");
    const expectedAuth = `Bearer ${env.API_SECRET_KEY}`;

    if (!authHeader || authHeader !== expectedAuth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract messages, userId, and displayName
    const cloned = req.clone();
    const body: unknown = await cloned.json();
    const parseResult = RequestPayloadSchema.safeParse(body);

    let messages: ModelMessage[];
    let userId: string | undefined;
    let displayName: string | undefined;

    if (parseResult.success) {
      messages = parseResult.data.messages as ModelMessage[];
      userId = parseResult.data.userId;
      displayName = parseResult.data.displayName?.trim()
        ? parseResult.data.displayName
        : undefined;
    } else {
      // Fallback for backwards compatibility
      messages = body as ModelMessage[];
      userId = undefined;
      displayName = undefined;
    }

    // Stream text to the client as NDJSON by converting output into the PayloadSchema
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    void (async () => {
      try {
        const httpTransport = new StreamableHTTPClientTransport(
          new URL("https://stanfordmcp.com/mcp/"),
          {
            requestInit: {
              headers: {
                Authorization: `Bearer ${env.MCP_KEY}`,
                Accept: "application/json, text/event-stream",
              },
            },
          },
        );

        const client = await experimental_createMCPClient({
          transport: httpTransport,
        });

        const tools = await client.tools();

        const constructedPrompt = await constructPrompt(userId, displayName);

        const response = streamText({
          model: anthropic("claude-sonnet-4-5"),
          messages,
          tools: tools,
          stopWhen: stepCountIs(MAX_STEPS),
          system: constructedPrompt,
          providerOptions: {
            oepnai: {
              reasoning_effort: "low",
            },
          },
        });

        let buffer = "";
        let lastSentJson: string | undefined;
        const chainOfThought: string[] = [];

        const sendCurrentPayload = async (reasoning: boolean) => {
          try {
            const blocks = parseBlocks(buffer);
            const candidate = { chainOfThought, reasoning, blocks } as unknown;
            const validation = PayloadSchema.safeParse(candidate);

            if (validation.success) {
              const jsonLine = JSON.stringify(validation.data) + "\n";
              if (jsonLine !== lastSentJson) {
                lastSentJson = jsonLine;
                await writer.write(encoder.encode(jsonLine));
              }
            }
          } catch {
            // ignore parse errors while streaming partial content
          }
        };

        for await (const delta of response.fullStream) {
          // Handles reasoning
          if (delta.type == "reasoning-start") {
            chainOfThought.push("reasoning");
            await sendCurrentPayload(true);
          }

          // Handles tool calling
          if (delta.type == "tool-call") {
            chainOfThought.push(delta.toolName);
            await sendCurrentPayload(true);
          }

          // Handles response
          if (delta.type == "text-start") {
            buffer = "";
          }

          if (delta.type == "text-delta") {
            if (buffer == undefined) {
              throw Error("Text was not started");
            }

            buffer += delta.text;

            try {
              // Parse blocks from the current buffer
              const blocks = parseBlocks(buffer);
              const reasoning = false;

              // Create payload and validate against schema
              const candidate = {
                chainOfThought,
                reasoning,
                blocks,
              } as unknown;

              const validation = PayloadSchema.safeParse(candidate);

              if (validation.success) {
                const jsonLine = JSON.stringify(validation.data) + "\n";

                // Only send if this is different from what we last sent
                if (jsonLine !== lastSentJson) {
                  lastSentJson = jsonLine;
                  await writer.write(encoder.encode(jsonLine));
                }
              }
            } catch {
              // ignore parse errors while streaming partial content
            }
          }
        }
      } catch (err) {
        const errorPayload =
          JSON.stringify({ error: true, message: err }) + "\n";
        await writer.write(encoder.encode(errorPayload));
      } finally {
        await writer.close();
      }
    })();

    return new Response(readable, {
      status: 200,
      headers: {
        "Content-Type": "application/x-ndjson; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    console.error("Error generating text:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
};
