export interface CourseCardData {
  /** e.g., "CS 106B"  ← Course.subject + " " + Course.code */
  subjectCode: string;

  /** e.g., "Autumn 2025"  ← derive from Section.term */
  termLabel: string;

  /** e.g., "From Player to Maker: 2D Engine-Based Game Development" ← Course.title */
  title: string;

  courseType: string;

  termCode: number;

  section: {
    /** e.g., "Lec"  ← Section.component ("LEC" → "Lec", etc.) */
    kindLabel: string;

    /** e.g., "01" ← Section.section_num */
    number: string;

    /** e.g., 2236  ← Section.class_id */
    classNumber: number;

    /** e.g., "4"  ← Section.units (fallback to Course.unitsMin/unitsMax if needed) */
    unitsMin: number;
    unitsMax: number;
  };

  schedule: {
    /** e.g., "2025-09-22" ← Schedule.start_date (ISO/string passthrough OK) */
    startDate: string;
    /** e.g., "2025-12-05" ← Schedule.end_date */
    endDate: string;

    /** e.g., ["Tues","Thurs"] ← Schedule.days (format to your preferred labels) */
    days: string[];

    /** e.g., "10:30am" ← Schedule.start_time */
    startTime: string;
    /** e.g., "11:50am" ← Schedule.end_time */
    endTime: string;

    /** e.g., "CODA B80" ← Schedule.location */
    location: string;
  };

  /** Primary + co-instructors for the row under "Instructor" ← Schedule.instructors */
  instructors: Array<{
    /** e.g., "Arya, M." or "Arya M." ← Instructor fields combined to your taste */
    displayName: string;
    isPrimary: boolean;
  }>;
}
