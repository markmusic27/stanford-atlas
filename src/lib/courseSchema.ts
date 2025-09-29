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

// *---------------- Middle Layer ----------------*

// types.ts

export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export interface Instructor {
  name: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  sunet_id: string;
  is_primary_instructor: boolean;
}

export interface Schedule {
  start_date: string; // e.g. "Sep 22, 2025" or ""
  end_date: string; // e.g. "Dec 5, 2025" or ""
  start_time: string; // e.g. "1:30:00 PM" or ""
  end_time: string; // e.g. "2:50:00 PM" or ""
  location: string;
  days: Day[]; // may be empty
  instructors: Instructor[]; // may be empty
}

export interface Attribute {
  name: string; // e.g. "NQTR"
  value: string; // e.g. "AUT" | "SPR"
  description: string; // e.g. "Autumn"
  catalog_print: boolean;
  schedule_print: boolean;
}

export interface Section {
  class_id: number; // number inside sections
  term: string; // e.g. "2025-2026 Autumn"
  units: string; // e.g. "3-4" or ""
  section_num: string; // e.g. "01"
  component: string; // e.g. "LEC", "DIS"
  curr_class_size: number;
  max_class_size: number;
  curr_waitlist_size: number;
  max_waitlist_size: number;
  notes: string;
  schedules: Schedule[];
  attributes: Attribute[];
}

export interface Tag {
  organization: string; // e.g. "EDUC", "STATS"
  name: string; // e.g. "alluniversity"
}

export interface Course {
  year: string; // "2025-2026"
  subject: string; // "STATS"
  code: string; // "229"
  title: string; // "Machine Learning (CS 229)"
  description: string;
  gers: string[]; // may include empty string
  repeatable: boolean;
  grading_basis: string; // "Letter or Credit/No Credit"
  units_min: number; // 3
  units_max: number; // 4
  objectives: string[]; // empty in sample
  final_exam: boolean;
  sections: Section[];
  tags: Tag[];
  attributes: Attribute[];
  course_id: number; // 105750
  active: boolean;
  offer_num: string; // "2"
  academic_group: string; // "H&S"
  academic_org: string; // "STATISTICS"
  academic_career: string; // "GR"
  max_units_repeat: number; // 4
  max_times_repeat: number; // 1
}

export interface ApiCourseResponse {
  id: number; // "105750" (string at top level)
  class_id: number; // "7511"   (string at top level)
  message: string;
  course: Course;
  section: Section;
}
