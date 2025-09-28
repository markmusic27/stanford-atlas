import { Markdown } from "./Markdown";
import SingleCourseCard from "./single-course-card/SingleCourseCard";
import CourseGrid from "./course-grid/CourseGrid";
import type { Block } from "~/app/api/stream-content/schemas";

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  return (
    <div className="space-y-[16px]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "markdown":
            return <Markdown key={i} text={block.data} />;
          case "course-card":
            return <SingleCourseCard key={i} course={block.data} />;
          case "course-list":
            return <CourseGrid key={i} courses={block.data} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
