"use client";

import CourseCardHeader from "./CourseCardHeader";
import CourseCardBody from "./CourseCardBody";
import CourseCardSkeleton from "./CourseCardSkeleton";
import { AnimatePresence, motion } from "motion/react";
import useCourseServer from "~/hooks/useCourseServer";
import type { CourseCardData } from "~/lib/courseSchema";

export interface CourseProps {
  courseId: number;
  classId: number;
}

const CourseCard = (props: CourseProps) => {
  const { state, data } = useCourseServer(props);

  const isReady = state === "ok" && Boolean(data);
  const course: CourseCardData | null = data ?? null;

  return (
    <AnimatePresence mode="wait">
      {!isReady ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <CourseCardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="bg-primary-1 border-primary-7 flex flex-col items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
            <CourseCardHeader
              subjectCode={course!.subjectCode}
              termLabel={course!.termLabel}
            />
            <CourseCardBody course={course!} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CourseCard;
