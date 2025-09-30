import { createOpenAI } from "@ai-sdk/openai";
import type { NextRequest } from "next/server";
import { env } from "~/env";
import { PayloadSchema } from "./schemas";
import { PROMPT } from "./prompt";
import { streamText, type ModelMessage } from "ai";
import {
  YAML_FORMAT_INSTRUCTIONS as YAML_FMT,
  parseBlocksFromYamlish as parseBlocksFromYamlishFmt,
} from "./format";

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

    // Stream text to the client as NDJSON by converting YAML-like output into the PayloadSchema
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    // YAML format instructions and parser are imported from ./format

    void (async () => {
      try {
        const response = streamText({
          model: openai("gpt-5"),
          messages,
          system: `${PROMPT}\n\n${YAML_FMT}`,
        });

        let yamlBuffer = "";
        let lastSentJson = "";
        let finalPayload: unknown = null;

        for await (const delta of response.textStream) {
          yamlBuffer += delta;
          // Attempt to parse fully-formed blocks from current buffer
          const blocks = parseBlocksFromYamlishFmt(yamlBuffer);
          if (blocks.length > 0) {
            const candidate = { blocks } as unknown;
            const validation = PayloadSchema.safeParse(candidate);
            if (validation.success) {
              const jsonLine = JSON.stringify(validation.data) + "\n";
              if (jsonLine !== lastSentJson) {
                lastSentJson = jsonLine;
                finalPayload = validation.data;
                await writer.write(encoder.encode(jsonLine));
              }
            }
          }
        }

        // Final validation after stream ends
        if (finalPayload == null) {
          const blocks = parseBlocksFromYamlishFmt(yamlBuffer);
          const candidate = { blocks } as unknown;
          const validation = PayloadSchema.safeParse(candidate);
          if (validation.success) {
            finalPayload = validation.data;
            const jsonLine = JSON.stringify(validation.data) + "\n";
            await writer.write(encoder.encode(jsonLine));
          } else {
            const errorPayload =
              JSON.stringify({
                error: true,
                reason: "Schema validation failed for streamed YAML output",
                details: validation.error.message,
              }) + "\n";
            await writer.write(encoder.encode(errorPayload));
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
