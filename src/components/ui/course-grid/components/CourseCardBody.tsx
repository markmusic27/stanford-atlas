import { isoToUSDate } from "~/lib/utils";
import { IconType } from "../../icons/Icon";
import CourseCardButton from "./CourseCardButton";
import CardContentItem from "../../single-course-card/components/CardContentItem";
import type { CourseCardData } from "~/lib/courseSchema";

const CourseCardBody = ({ course }: { course: CourseCardData }) => {
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
        <p className="text-secondary-text-1 text-[14px]">{`${isoToUSDate(course.schedule.startDate)} - ${isoToUSDate(course.schedule.endDate)}`}</p>
      </div>
      <div className="h-[12px]" />
      <div className="flex flex-col gap-[6px] pl-[12px]">
        <CardContentItem
          icon={IconType.Calendar}
          value={course.schedule.days.join(", ")}
        />
        <CardContentItem
          icon={IconType.Clock}
          value={`${course.schedule.startTime} - ${course.schedule.endTime}`}
        />
        <CardContentItem
          icon={IconType.Location}
          value={course.schedule.location}
        />
      </div>
      <div className="h-[12px]" />
      <CardContentItem
        title="Instructor:"
        value={
          course.instructors.length > 2
            ? `${course.instructors
                .slice(0, 2)
                .map((instructor) => instructor.displayName)
                .join(", ")}, ...`
            : course.instructors
                .map((instructor) => instructor.displayName)
                .join(", ")
        }
      />
      <div className="h-[18px]" />
      <CourseCardButton
        text="View details"
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
