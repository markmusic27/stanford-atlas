import type { ApiCourseResponse, CourseCardData } from "./courseSchema";

const termCodes = new Map<string, number>([
  ["2025-2026 Autumn", 1262],
  ["2025-2026 Winter", 1264],
  ["2025-2026 Spring", 1266],
  ["2025-2026 Summer", 1268],
]);

const extractTermLabel = (raw: string) => {
  const comps = raw.split(" ");
  const quarter = comps[1];
  const years = comps[0]?.split("-");

  if (years?.length != 2) {
    throw Error("Error parsing term years");
  }

  return `${quarter} ${quarter == "Autumn" ? years[0] : years[1]}`;
};

const getTermCode = (term: string) => {
  const code = termCodes.get(term);

  if (code == undefined) {
    throw Error("Could not find termCode for the term");
  }

  return code;
};

const formatCourseData = (data: ApiCourseResponse) => {
  const formatted: CourseCardData = {
    subjectCode: `${data.course.subject} ${data.course.code}`,
    termLabel: extractTermLabel(data.section.term),
    title: data.course.title,
    termCode: getTermCode(data.section.term),
    courseType: data.section.component,
    section: {
      kindLabel: data.section.component,
      number: data.section.section_num,
      classNumber: data.class_id,
      unitsMin: data.course.units_min,
      unitsMax: data.course.units_max,
    },
    schedule: {
      startDate: "2025-09-01",
      endDate: "2025-12-15",
      days: ["Mon", "Wed"],
      startTime: "09:00",
      endTime: "10:15",
      location: data.section.schedules[0]?.location,
    },
    instructors: [
      { displayName: "Dr. Ada Lovelace", isPrimary: true },
      { displayName: "Alan Turing", isPrimary: false },
    ],
  };

  return formatted;
};

export default formatCourseData;
