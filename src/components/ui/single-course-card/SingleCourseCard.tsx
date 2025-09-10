import type { CourseCardData } from "~/lib/course.util";
import CursorScale from "../CursorScale";
import CardBarHeader from "./components/CardBarHeader";
import CardBarContent from "./components/CardBarContent";

interface SingleCourseCardProps {
  course: CourseCardData;
}

const SingleCourseCard = ({ course }: SingleCourseCardProps) => {
  return (
    <CursorScale hoverScale={1.003} maxTranslate={2}>
      <a
        href={`https://navigator.stanford.edu/classes/${course.termCode}/${course.section.classNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="bg-primary-1 border-primary-7 flex w-full cursor-pointer flex-row items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
          <CardBarHeader course={course} />
          <div className="bg-primary-10 my-[16px] w-[1px] shrink-0 self-stretch"></div>
          <CardBarContent course={course} />
        </div>
      </a>
    </CursorScale>
  );
};

export default SingleCourseCard;
