import type { Block } from "~/lib/blocks";
import { Markdown } from "./Markdown";
import SingleCourseCard from "./single-course-card/SingleCourseCard";
import CourseGrid from "./course-grid/CourseGrid";

const BlockRenderer = ({ blocks }: { blocks: Block[] }) => {
  return (
    <div className="space-y-[16px]">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "markdown":
            return <Markdown key={i} text={block.markdown} />;
          case "course-card":
            return <SingleCourseCard key={i} course={block.props} />;
          case "course-grid":
            return <CourseGrid key={i} courses={block.props} />;
          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
