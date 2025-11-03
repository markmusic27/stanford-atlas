"use client";

import { motion } from "motion/react";
import { cn } from "~/lib/utils";

const ShimmerBlock = ({
  className,
  duration = 1.6,
  spread = 80,
}: {
  className?: string;
  duration?: number;
  spread?: number;
}) => {
  return (
    <motion.div
      className={cn("rounded-full", className)}
      initial={{ backgroundPosition: "100% center" }}
      animate={{ backgroundPosition: "0% center" }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
      style={{
        backgroundImage: `linear-gradient(90deg, transparent calc(50% - ${spread}px), var(--color-shimmer), transparent calc(50% + ${spread}px)), linear-gradient(var(--color-primary-6), var(--color-primary-6))`,
        backgroundSize: "250% 100%, auto",
        backgroundRepeat: "no-repeat, repeat",
      }}
    />
  );
};

const CourseCardSkeleton = () => {
  return (
    <div className="bg-primary-1 dark:bg-primary-2 border-primary-7 flex flex-col items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
      <div className="bg-primary-2 dark:bg-primary-4 relative flex flex-row items-center justify-between px-[16px] pt-[20px] pb-[14px]">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1px] w-full"
          width="100%"
          height="1"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0.5"
            x2="100%"
            y2="0.5"
            stroke="var(--color-primary-10)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray="3 3"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ShimmerBlock className="h-[16px] w-[120px]" />
        <ShimmerBlock className="h-[16px] w-[140px]" />
      </div>

      <div className="flex flex-1 flex-col p-[16px]">
        <ShimmerBlock className="h-[14px] w-[120px]" />
        <div className="h-[6px]" />
        <ShimmerBlock className="h-[14px] w-[140px]" />
        <div className="h-[6px]" />
        <ShimmerBlock className="h-[14px] w-[160px]" />

        <div className="h-[12px]" />
        <ShimmerBlock className="h-[24px] w-[70%]" />

        <div className="h-[14px]" />
        <ShimmerBlock className="h-[16px] w-[50%]" />

        <div className="h-[12px]" />
        <div className="pl/[12px] flex flex-col gap-[6px]">
          <ShimmerBlock className="h-[14px] w-[140px]" />
          <ShimmerBlock className="h-[14px] w-[120px]" />
          <ShimmerBlock className="h-[14px] w-[220px]" />
        </div>

        <div className="h/[12px]" />

        <div className="h-[18px]" />
        <ShimmerBlock className="h-[48px] w-full rounded-[16px]" />
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
