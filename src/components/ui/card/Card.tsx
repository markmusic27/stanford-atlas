"use client";

import CursorScale from "../CursorScale";
import CursorShimmer from "../CursorShimmer";
import { useState } from "react";
import { CustomSwitch } from "../CustomSwitch";

interface CardProps {
  title: string;
  description: string;
  preventToggle?: boolean;
  className?: string;
  onToggle?: () => void;
}

const Card = ({
  title,
  description,
  className,
  onToggle,
  preventToggle,
}: CardProps) => {
  return (
    <div
      className={`bg-primary-4 dark:bg-primary-6 flex flex-col items-start justify-between rounded-[16px] py-[20px] pr-[24px] pl-[18px] sm:flex-row sm:items-center ${className}`}
    >
      <div className="flex max-w-[440px] flex-1 flex-col gap-[6px] sm:max-w-none">
        <p className="text-primary-text cursor-default text-[16px]">{title}</p>
        <p className="text-secondary-text-2 cursor-default text-[14px]">
          {description}
        </p>
      </div>
      <div className="pl-[8px] md:pl-0">
        <CustomSwitch
          preventToggle={preventToggle}
          className="mt-[16px] scale-[1.3] sm:mt-0 md:scale-[1.1]"
          onToggle={onToggle}
        />
      </div>
    </div>
  );
};

export default Card;
