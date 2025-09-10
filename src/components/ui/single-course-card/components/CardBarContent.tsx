import type { CourseCardData } from "~/lib/course.util";
import { isoToUSDate } from "~/lib/utils";

const CardBarContent = ({ course }: { course: CourseCardData }) => {
  return (
    <div className="flex-77 px-[24px] py-[16px]">
      <p className="text-primary-text text-[18px]">{course.title}</p>
      <div className="h-[12px]" />
      <div className="flex flex-row items-center gap-[4px]">
        <p className="text-secondary-text-1 text-[14px]">{`${course.courseType} -`}</p>
        <p className="text-secondary-text-4 text-[14px]">{`${isoToUSDate(course.schedule.startDate)} - ${isoToUSDate(course.schedule.endDate)}`}</p>
      </div>
      <div className="h-[12px]" />
      <div></div>
    </div>
  );
};

export default CardBarContent;
