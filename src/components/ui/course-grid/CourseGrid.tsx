import type { CourseCardData } from "~/lib/course.util";
import CourseCard from "./components/CourseCard";
import SingleCourseCard from "../single-course-card/SingleCourseCard";

const CourseGrid = ({ courses }: { courses: CourseCardData[] }) => {
  return courses.length == 1 ? (
    <SingleCourseCard course={courses[0]!} />
  ) : (
    <div className="grid w-full grid-cols-1 gap-[16px] sm:grid-cols-2">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
