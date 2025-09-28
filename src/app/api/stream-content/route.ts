import { createOpenAI } from "@ai-sdk/openai";
import type { NextRequest } from "next/server";
import { env } from "~/env";
import { PayloadSchema } from "./returnSchema";
import { PROMPT } from "./prompt";
import { streamObject, type ModelMessage } from "ai";

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

    // Stream partial objects to the client as NDJSON
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    void (async () => {
      try {
        const maxAttempts = 3;
        let attempt = 1;
        let finalPayload: unknown = null;
        let lastError: string | null = null;

        const runAttempt = async (
          attemptMessages: ModelMessage[],
          shouldStream: boolean,
        ) => {
          const response = streamObject({
            model: openai("gpt-4o"),
            schema: PayloadSchema,
            messages: attemptMessages,
            system: PROMPT,
          });

          let lastObj: unknown = null;
          for await (const obj of response.partialObjectStream) {
            lastObj = obj;
            if (shouldStream) {
              const line = JSON.stringify(obj) + "\n";
              await writer.write(encoder.encode(line));
            }
          }
          return lastObj;
        };

        // First attempt: stream to client as usual
        finalPayload = await runAttempt(messages, true);

        // Validate
        let validation = PayloadSchema.safeParse(finalPayload);
        if (!validation.success) {
          lastError = validation.error.message;

          // Retry up to maxAttempts without streaming
          while (attempt < maxAttempts) {
            attempt++;

            const systemErrorMessage: ModelMessage = {
              role: "system",
              content:
                `The previous assistant output failed schema validation. Error: ${lastError}. ` +
                "Return ONLY a JSON object with shape: { blocks: [ { type: 'markdown' | 'course-card' | 'course-list', data: ... } ] }",
            };

            finalPayload = await runAttempt(
              [...messages, systemErrorMessage],
              true,
            );

            validation = PayloadSchema.safeParse(finalPayload);
            if (validation.success) {
              break;
            }
            lastError = validation.error.message;
          }
        }

        if (!validation.success) {
          const errorPayload =
            JSON.stringify({
              error: true,
              reason: "Schema validation failed after max retry attempts",
              details: lastError,
            }) + "\n";
          await writer.write(encoder.encode(errorPayload));
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
