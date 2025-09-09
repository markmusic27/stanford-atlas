import type { CourseCardData } from "~/lib/course.util";
import CursorScale from "../CursorScale";

interface SingleCourseCardProps {
  course: CourseCardData;
}

const SingleCourseCard = ({ course }: SingleCourseCardProps) => {
  return (
    <CursorScale hoverScale={1.005} maxTranslate={3}>
      <div className="bg-primary-1 border-primary-7 flex w-full cursor-pointer flex-row items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.03)]">
        <div className="flex h-[220px] max-w-[175px] min-w-[132px] flex-23 flex-col px-[16px]">
          <p>{course.subjectCode}</p>
          <div className="h-[10px]" />
          <p>{`${course.section.kindLabel}: ${course.section.number}`}</p>
          <p>{`Class #: ${course.section.classNumber}`}</p>
        </div>
        <div className="bg-primary-10 my-[28px] w-[1px] shrink-0 self-stretch"></div>
        <div className="h-[220px] flex-77"></div>
      </div>
    </CursorScale>
  );
};

export default SingleCourseCard;
