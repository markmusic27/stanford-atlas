import { createOpenAI } from "@ai-sdk/openai";
import { generateText, type ModelMessage } from "ai";
import type { NextRequest } from "next/server";
import { env } from "~/env";

const openai = createOpenAI({ apiKey: env.OPENAI_API_KEY });

export const POST = async (req: NextRequest) => {
  try {
    const { body } = await req.json();

    const messages = body as ModelMessage[];

    const result = await generateText({
      model: openai("gpt-4o"),
      messages,
    });

    return Response.json({
      text: result.text,
      usage: result.usage,
      finishReason: result.finishReason,
    });
  } catch (error) {
    console.error("Error generating text:", error);
    return Response.json({ error: "Failed to generate text" }, { status: 500 });
  }
};
