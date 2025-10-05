import type {
  ApiCourseResponse,
  CourseCardData,
  Schedule as ApiSchedule,
} from "./courseSchema";

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

const shortDay = (day: string) => {
  switch (day) {
    case "Monday":
      return "Mon";
    case "Tuesday":
      return "Tue";
    case "Wednesday":
      return "Wed";
    case "Thursday":
      return "Thu";
    case "Friday":
      return "Fri";
    case "Saturday":
      return "Sat";
    case "Sunday":
      return "Sun";
    default:
      return day;
  }
};

const toIsoDateLike = (mmmdyyyy: string | undefined) => {
  if (!mmmdyyyy) return "";
  const date = new Date(mmmdyyyy);
  if (Number.isNaN(date.getTime())) return "";
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const toHhMmAmPm = (twelveHour?: string): string => {
  if (!twelveHour) return "";
  const trimmed = twelveHour.trim();
  const match = /^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AP]M)$/i.exec(trimmed);
  if (!match) return "";
  const hNum = parseInt(match[1] ?? "", 10);
  if (Number.isNaN(hNum)) return "";
  const h = String(hNum);
  const mm = match[2] ?? "";
  const ampm = (match[3] ?? "").toLowerCase();
  return `${h}:${mm}${ampm}`;
};

const pickPrimarySchedule = (schedules: ApiSchedule[]) => schedules?.[0];

const formatCourseData = (data: ApiCourseResponse) => {
  const sched = pickPrimarySchedule(data.section.schedules ?? []);

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
      startDate: toIsoDateLike(sched?.start_date),
      endDate: toIsoDateLike(sched?.end_date),
      days: (sched?.days ?? []).map(shortDay),
      startTime: toHhMmAmPm(sched?.start_time),
      endTime: toHhMmAmPm(sched?.end_time),
      location: sched?.location ?? "",
    },
    instructors: (sched?.instructors ?? []).map((i) => ({
      displayName: i.name,
      isPrimary: i.is_primary_instructor,
    })),
  };

  return formatted;
};

export default formatCourseData;
