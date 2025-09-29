import CourseCard, { type CourseProps } from "./components/CourseCard";
import SingleCourseCard from "../single-course-card/SingleCourseCard";
import type { CourseCardData } from "~/lib/courseSchema";

const CourseGrid = ({ courses }: { courses: CourseProps[] }) => {
  return courses.length == 1 ? (
    <SingleCourseCard {...courses[0]!} />
  ) : (
    <div className="mb-[32px] grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2">
      {courses.map((courseProps, i) => (
        <CourseCard key={i} {...courseProps} />
      ))}
    </div>
  );
};

export default CourseGrid;
