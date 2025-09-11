import type { CourseCardData } from "~/lib/blocks";

const CardBarHeader = ({ course }: { course: CourseCardData }) => {
  return (
    <div className="flex max-w-[175px] min-w-[132px] flex-col items-center justify-center px-[24px]">
      <p className="text-primary-text text-center font-mono text-[16px] font-[450]">
        {course.subjectCode}
      </p>
      <div className="h-[10px]" />
      <p className="text-secondary-text-1 text-center text-[14px]">{`${course.section.kindLabel}: ${course.section.number}`}</p>
      <p className="text-secondary-text-1 text-center text-[14px]">{`Class #: ${course.section.classNumber}`}</p>
    </div>
  );
};

export default CardBarHeader;
