"use client";

import CourseCardHeader from "./CourseCardHeader";
import CourseCardBody from "./CourseCardBody";
import CourseCardSkeleton from "./CourseCardSkeleton";
import useCourseServer from "~/hooks/useCourseServer";
import type { CourseCardData } from "~/lib/courseSchema";

export interface CourseProps {
  courseId: number;
  classId: number;
}

const CourseCard = (props: CourseProps) => {
  const { state, data } = useCourseServer(props);

  if (state !== "ok" || !data) return <CourseCardSkeleton />;

  const course = data as CourseCardData;

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
