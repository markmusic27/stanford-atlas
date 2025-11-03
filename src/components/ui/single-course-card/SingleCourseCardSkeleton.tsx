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

const SingleCourseCardSkeleton = () => {
  return (
    <div className="bg-primary-1 dark:bg-primary-2 border-primary-7 flex w-full cursor-pointer flex-row items-stretch overflow-clip rounded-[24px] border-[1px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.02)]">
      {/* Left bar header area */}
      <div className="flex max-w-[175px] min-w-[132px] flex-col items-center justify-center px-[24px]">
        <ShimmerBlock className="h-[16px] w-[120px]" />
        <div className="h-[10px]" />
        <ShimmerBlock className="h-[14px] w-[100px]" />
        <div className="h-[6px]" />
        <ShimmerBlock className="h-[14px] w-[110px]" />
      </div>

      {/* Divider */}
      <div className="bg-primary-10 my-[16px] w-[1px] shrink-0 self-stretch" />

      {/* Right content area */}
      <div className="flex-77 px-[24px] py-[16px]">
        <ShimmerBlock className="h-[22px] w-[70%]" />
        <div className="h-[14px]" />
        <ShimmerBlock className="h-[16px] w-[50%]" />
        <div className="h-[12px]" />
        <div className="flex flex-row items-center gap-[12px]">
          <div className="flex flex-2 flex-col gap-[6px] pl-[12px]">
            <ShimmerBlock className="h-[14px] w-[140px]" />
            <ShimmerBlock className="h-[14px] w-[120px]" />
            <ShimmerBlock className="h-[14px] w-[220px]" />
          </div>
          <div className="flex flex-3 flex-col gap-[6px] pl-[12px]">
            <ShimmerBlock className="h-[14px] w-[200px]" />
            <ShimmerBlock className="h-[14px] w-[120px]" />
            <ShimmerBlock className="h-[14px] w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourseCardSkeleton;
