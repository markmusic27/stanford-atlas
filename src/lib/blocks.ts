import { z } from "zod";

// *---------------- Course Card Block ----------------*

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

export const InstructorSchema = z.object({
  displayName: z.string(),
  isPrimary: z.boolean(),
});

export const CourseCardSchema = z.object({
  subjectCode: z.string(),
  termLabel: z.string(),
  title: z.string(),
  termCode: z.number(),
  courseLabel: z.string(),
  section: SectionSchema,
  schedule: ScheduleSchema,
  instructors: z.array(InstructorSchema),
});

// *---------------- Markdown Block ----------------*

// *---------------- Response Block ----------------*
