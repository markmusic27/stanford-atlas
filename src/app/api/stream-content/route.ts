import { createOpenAI } from "@ai-sdk/openai";
import type { NextRequest } from "next/server";
import { env } from "~/env";
import { Schema } from "./returnSchema";
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

    const response = streamObject({
      model: openai("gpt-4o"),
      schema: Schema,
      messages: messages,
      system: PROMPT,
    });

    // Stream partial objects to the client as NDJSON
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      try {
        for await (const obj of response.partialObjectStream) {
          const line = JSON.stringify(obj) + "\n";
          await writer.write(encoder.encode(line));
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
