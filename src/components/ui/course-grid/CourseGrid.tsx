import CourseCard from "./components/CourseCard";
import SingleCourseCard from "../single-course-card/SingleCourseCard";
import type { CourseCardData } from "~/lib/blocks";

const CourseGrid = ({ courses }: { courses: CourseCardData[] }) => {
  return courses.length == 1 ? (
    <SingleCourseCard course={courses[0]!} />
  ) : (
    <div className="mb-[32px] grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2">
      {courses.map((course, i) => (
        <CourseCard key={i} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
