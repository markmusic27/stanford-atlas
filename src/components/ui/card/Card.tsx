"use client";

import CursorScale from "../CursorScale";
import CursorShimmer from "../CursorShimmer";
import { Switch } from "../switch";
import { useState } from "react";

interface CardProps {
  title: string;
  description: string;
  isEnabled: boolean;
  className?: string;
}

const Card = ({ title, description, isEnabled, className }: CardProps) => {
  const [enabled, setEnabled] = useState(isEnabled);
  return (
    <div
      className={`bg-primary-4 flex flex-row items-center justify-between rounded-[16px] py-[20px] pr-[24px] pl-[18px] ${className}`}
    >
      <div className="flex max-w-[440px] flex-1 flex-col gap-[6px]">
        <p className="text-primary-text cursor-default text-[16px]">{title}</p>
        <p className="text-secondary-text-2 cursor-default text-[14px]">
          {description}
        </p>
      </div>
      <Switch
        className="scale-[1.2] transition-colors data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-gray-200"
        checked={enabled}
        onCheckedChange={setEnabled}
      />
    </div>
  );
};

export default Card;
