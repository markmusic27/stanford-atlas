import { isoToUSDate } from "~/lib/utils";
import { IconType } from "../../icons/Icon";
import CourseCardButton from "./CourseCardButton";
import CardContentItem from "../../single-course-card/components/CardContentItem";
import type { CourseCardData } from "~/lib/courseSchema";

const CourseCardBody = ({ course }: { course: CourseCardData }) => {
  const startDateUS = isoToUSDate(course.schedule.startDate);
  const endDateUS = isoToUSDate(course.schedule.endDate);
  const dateRange =
    startDateUS !== "invalid" && endDateUS !== "invalid"
      ? `${startDateUS} - ${endDateUS}`
      : "To be Scheduled";

  const daysValue =
    course.schedule.days.length > 0
      ? course.schedule.days.join(", ")
      : "To be Scheduled";

  const timeRange =
    course.schedule.startTime && course.schedule.endTime
      ? `${course.schedule.startTime} - ${course.schedule.endTime}`
      : "To be Scheduled";

  const instructorValue =
    course.instructors.length === 0
      ? "Information not available"
      : course.instructors.length > 3
        ? `${course.instructors
            .slice(0, 3)
            .map((instructor) => instructor.displayName)
            .join(", ")}, ...`
        : course.instructors
            .map((instructor) => instructor.displayName)
            .join(", ");

  return (
    <div className="flex flex-1 flex-col p-[16px]">
      <p className="text-secondary-text-1 text-[14px]">{`${course.section.kindLabel}: ${course.section.number}`}</p>
      <p className="text-secondary-text-1 text-[14px]">{`Units: ${course.section.unitsMin === course.section.unitsMax ? course.section.unitsMin : `${course.section.unitsMin} - ${course.section.unitsMax}`}`}</p>
      <p className="text-secondary-text-1 text-[14px]">{`Class #: ${course.section.classNumber}`}</p>
      <div className="h-[12px]" />
      <p className="text-primary-text text-[18px]">{course.title}</p>
      <div className="h-[14px]" />
      <div className="flex flex-row items-center gap-[4px]">
        <p className="text-secondary-text-4 text-[14px]">{`${course.courseType} -`}</p>
        <p className="text-secondary-text-1 text-[14px]">{dateRange}</p>
      </div>
      <div className="h-[12px]" />
      <div className="flex flex-col gap-[6px] pl-[12px]">
        <CardContentItem icon={IconType.Calendar} value={daysValue} />
        <CardContentItem icon={IconType.Clock} value={timeRange} />
        <CardContentItem
          icon={IconType.Location}
          value={course.schedule.location || "To be Scheduled"}
        />
      </div>
      <div className="h-[12px]" />
      <CardContentItem title="Instructor:" value={instructorValue} />
      <div className="h-[18px]" />
      <CourseCardButton
        text="View on Navigator"
        onClick={() => {
          window.open(
            `https://navigator.stanford.edu/classes/${course.termCode}/${course.section.classNumber}`,
            "_blank",
            "noopener,noreferrer",
          );
        }}
      />
    </div>
  );
};

export default CourseCardBody;
