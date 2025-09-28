import { isoToUSDate } from "~/lib/utils";
import CardContentItem from "./CardContentItem";
import { IconType } from "../../icons/Icon";
import type { CourseCardData } from "~/lib/courseSchema";

const CardBarContent = ({ course }: { course: CourseCardData }) => {
  return (
    <div className="flex-77 px-[24px] py-[16px]">
      <p className="text-primary-text text-[18px]">{course.title}</p>
      <div className="h-[14px]" />
      <div className="flex flex-row items-center gap-[4px]">
        <p className="text-secondary-text-1 text-[14px]">{`${course.courseType} -`}</p>
        <p className="text-secondary-text-4 text-[14px]">{`${isoToUSDate(course.schedule.startDate)} - ${isoToUSDate(course.schedule.endDate)}`}</p>
      </div>
      <div className="h-[12px]" />
      <div className="flex flex-row items-center gap-[12px]">
        <div className="flex flex-2 flex-col gap-[6px] pl-[12px]">
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
        <div className="flex flex-3 flex-col gap-[6px] pl-[12px]">
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
          <CardContentItem
            title="Units:"
            value={
              course.section.unitsMin === course.section.unitsMax
                ? `${course.section.unitsMin}`
                : `${course.section.unitsMin} - ${course.section.unitsMax}`
            }
          />
          <CardContentItem title="Quarter:" value={course.termLabel} />
        </div>
      </div>
    </div>
  );
};

export default CardBarContent;
