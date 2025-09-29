"use client";

import CursorScale from "../CursorScale";
import CardBarHeader from "./components/CardBarHeader";
import CardBarContent from "./components/CardBarContent";
import { useEffect, useRef, useState } from "react";
import CardComponent, {
  type CourseProps,
} from "../course-grid/components/CourseCard";
import type { CourseCardData } from "~/lib/courseSchema";

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

  return (
    // <div ref={containerRef}>
    //   {isNarrow ? (
    //     <CardComponent course={course} />
    //   ) : (
    //     <a
    //       href={`https://navigator.stanford.edu/classes/${course.termCode}/${course.section.classNumber}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="block"
    //     >
    //       <div className="bg-primary-1 border-primary-7 flex w-full cursor-pointer flex-row items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
    //         <CardBarHeader course={course} />
    //         <div className="bg-primary-10 my-[16px] w-[1px] shrink-0 self-stretch"></div>
    //         <CardBarContent course={course} />
    //       </div>
    //     </a>
    //   )}
    // </div>
    <div></div>
  );
};

export default SingleCourseCard;
