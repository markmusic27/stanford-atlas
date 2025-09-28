import { z } from "zod";

// *---------------- Course Card Schemas ----------------*

export const SectionSchema = z
  .object({
    kindLabel: z.string(),
    number: z.string(),
    classNumber: z.number(),
    unitsMin: z.number(),
    unitsMax: z.number(),
  })
  .strict();

export const ScheduleSchema = z
  .object({
    startDate: z.string(),
    endDate: z.string(),
    days: z.array(z.string()),
    startTime: z.string(),
    endTime: z.string(),
    location: z.string(),
  })
  .strict();

export const InstructorSchema = z
  .object({
    displayName: z.string(),
    isPrimary: z.boolean(),
  })
  .strict();

export const CourseCardDataSchema = z
  .object({
    subjectCode: z.string(),
    termLabel: z.string(),
    title: z.string(),
    termCode: z.number(),
    courseType: z.string(),
    section: SectionSchema,
    schedule: ScheduleSchema,
    instructors: z.array(InstructorSchema),
  })
  .strict();

export type CourseCardData = z.infer<typeof CourseCardDataSchema>;
