import z from "zod";

export const MarkdownSchema = z
  .object({
    type: z
      .literal("markdown")
      .describe(
        "Markdown string. Supports all markdown blocks (except LATEX).",
      ),
    data: z.string(),
  })
  .strict();

export const CourseCardSchema = z
  .object({
    type: z.literal("course-card"),
    data: z
      .number()
      .describe(
        "Single numeric course ID (example: 225317). Do not use catalog codes like 'CS 106A'.",
      ),
  })
  .strict();

export const CourseListSchema = z
  .object({
    type: z.literal("course-list"),
    data: z
      .array(z.number())
      .describe(
        "Array of numeric course IDs (example: 225317). Deduplicate and order by relevance.",
      ),
  })
  .strict();

export const Block = z
  .discriminatedUnion("type", [
    MarkdownSchema,
    CourseCardSchema,
    CourseListSchema,
  ])
  .describe(
    "One UI block. Choose among: 'markdown' (explain/guide), 'course-card' (spotlight one course), 'course-list' (several related courses).",
  );

export const PayloadSchema = z.object({
  blocks: z
    .array(Block)
    .describe(
      "List of UI blocks shown to user: markdown | course-card | course-list",
    ),
});

export const ResponseSchema = z.object({
  type: z.literal("response"),
  payload: z.array(Block),
});

export const PayloadJsonSchema = z
  .string()
  .transform((s, ctx) => {
    try {
      return JSON.parse(s) as unknown;
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid JSON string",
      });
      return z.NEVER;
    }
  })
  .pipe(PayloadSchema);

export const QuerySchema = z.object({
  type: z.literal("query"),
  payload: z.string(),
});

export const HistorySchema = z.discriminatedUnion("type", [
  ResponseSchema,
  QuerySchema,
]);

export type ChatHistory = z.infer<typeof HistorySchema>;
