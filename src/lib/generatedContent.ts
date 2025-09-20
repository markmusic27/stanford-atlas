import { z } from "zod";
import { MarkdownSchema } from "./blocks";

// This file deliniates the return information from the LLM / MCP server
// It differs from the blocks.ts content in that courses are passed through course_ids

// Generated content return types
export const GeneratedCourseSchema = z
  .object({
    type: z.literal("course"),
    id: z.string(),
  })
  .strict();

export const GeneratedCourseGridSchema = z
  .object({
    type: z.literal("course-grid"),
    ids: z.array(z.string()),
  })
  .strict();

export const GeneratedContentSchema = z.discriminatedUnion("type", [
  MarkdownSchema,
  GeneratedCourseSchema,
  GeneratedCourseGridSchema,
]);

export type GeneratedContent = z.infer<typeof GeneratedContentSchema>;

export const GeneratedCOntentListSchema = z.array(GeneratedContentSchema);
