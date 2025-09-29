"use client";

import CursorScale from "../CursorScale";
import CardBarHeader from "./components/CardBarHeader";
import CardBarContent from "./components/CardBarContent";
import { useEffect, useRef, useState } from "react";
import CourseCard, {
  type CourseProps,
} from "../course-grid/components/CourseCard";
import type { CourseCardData } from "~/lib/courseSchema";
import useCourseServer from "~/hooks/useCourseServer";
import { AnimatePresence, motion } from "motion/react";
import SingleCourseCardSkeleton from "./SingleCourseCardSkeleton";

const SingleCourseCard = (props: CourseProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      const width = element.getBoundingClientRect().width;
      setIsNarrow(width < 600);
    };

    updateWidth();

    const observer = new ResizeObserver(() => updateWidth());
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const { state, data } = useCourseServer(props);

  if (isNarrow) {
    return (
      <div ref={containerRef}>
        <CourseCard {...props} />
      </div>
    );
  }

  const isReady = state === "ok" && Boolean(data);
  const course = (data ?? null) as CourseCardData | null;

  return (
    <div ref={containerRef}>
      <AnimatePresence mode="wait">
        {!isReady ? (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <SingleCourseCardSkeleton />
          </motion.div>
        ) : (
          <motion.a
            key="content"
            href={`https://navigator.stanford.edu/classes/${course!.termCode}/${course!.section.classNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="block"
          >
            <div className="bg-primary-1 border-primary-7 flex w-full cursor-pointer flex-row items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
              <CardBarHeader course={course!} />
              <div className="bg-primary-10 my-[16px] w-[1px] shrink-0 self-stretch"></div>
              <CardBarContent course={course!} />
            </div>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SingleCourseCard;
