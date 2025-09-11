import CourseCardHeader from "./CourseCardHeader";
import CourseCardBody from "./CourseCardBody";
import type { CourseCardData } from "~/lib/blocks";

interface CourseCard {
  course: CourseCardData;
}

const CourseCard = ({ course }: CourseCard) => {
  return (
    <div className="bg-primary-1 border-primary-7 flex flex-col items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
      <CourseCardHeader
        subjectCode={course.subjectCode}
        termLabel={course.termLabel}
      />
      <CourseCardBody course={course} />
    </div>
  );
};

export default CourseCard;
