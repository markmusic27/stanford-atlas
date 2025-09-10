import type { CourseCardData } from "~/lib/course.util";
import CursorScale from "../../CursorScale";
import CardHeader from "./CardHeader";
import CardBody from "./CardBody";

interface CardComponent {
  course: CourseCardData;
}

const CardComponent = ({ course }: CardComponent) => {
  return (
    <div className="bg-primary-1 border-primary-7 flex flex-col items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
      <CardHeader
        subjectCode={course.subjectCode}
        termLabel={course.termLabel}
      />
      <CardBody course={course} />
    </div>
  );
};

export default CardComponent;
