import { createOpenAI } from "@ai-sdk/openai";
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
import { PayloadSchema } from "./schemas";

const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });

export const POST = async (req: NextRequest) => {
  try {
    // Check authorization
    const authHeader = req.headers.get("authorization");
    const expectedAuth = `Bearer ${env.API_SECRET_KEY}`;

    if (!authHeader || authHeader !== expectedAuth) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Extract messages and format them
    const cloned = req.clone();
    const messages = (await cloned.json()) as ModelMessage[];

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
                Authorization:
                  "Bearer YJAna9RQePF@-uVw7_qBQt*apMF4*bZZfbTcybLobw*nGKCwteJMGh",
                Accept: "application/json, text/event-stream",
              },
            },
          },
        );

        const client = await experimental_createMCPClient({
          transport: httpTransport,
        });

        const tools = await client.tools();

        const response = streamText({
          model: openai("gpt-5"),
          messages,
          tools: tools,
          stopWhen: stepCountIs(MAX_STEPS),
          system: PROMPT,
        });

        let buffer: string | undefined = undefined;
        let lastSentJson: string | undefined = undefined;

        for await (const delta of response.fullStream) {
          // Handles reasoning
          if (delta.type == "reasoning-start") {
            console.log("STARTED REASONING");
          }

          // Handles tool calling
          if (delta.type == "tool-call") {
            console.log("TOOL CALLED");
            console.log(delta.toolName);
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
            console.clear();
            console.dir(buffer);

            try {
              // Parse blocks from the current buffer
              const blocks = parseBlocks(buffer);

              // Create payload and validate against schema
              const candidate = { blocks } as unknown;
              const validation = PayloadSchema.safeParse(candidate);

              if (validation.success) {
                const jsonLine = JSON.stringify(validation.data) + "\n";

                // Only send if this is different from what we last sent
                if (jsonLine !== lastSentJson) {
                  lastSentJson = jsonLine;
                  await writer.write(encoder.encode(jsonLine));
                }
              }
            } catch (parseError) {
              // If parsing fails, continue accumulating text without sending
              // The parseBlocks function will throw if it can't validate the blocks
              console.log(
                "Parse error (continuing to accumulate):",
                parseError,
              );
            }
          }

          if (delta.type == "text-end") {
            buffer = undefined;
          }
        }
      } catch (err) {
        const errorPayload = JSON.stringify({ error: true }) + "\n";
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
