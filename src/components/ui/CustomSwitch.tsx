"use client";
import { useState } from "react";

interface CustomSwitchProps {
  className?: string;
  onToggle?: (enabled: boolean) => void;
  defaultEnabled?: boolean;
}

const CustomSwitch = ({
  onToggle,
  className,
  defaultEnabled,
}: CustomSwitchProps) => {
  const [enabled, setEnabled] = useState(defaultEnabled ?? false);

  return (
    <div
      className={`relative flex h-[22px] w-[36px] cursor-pointer items-center rounded-full shadow-inner transition-all duration-200 ${enabled ? "bg-blue-500" : "bg-primary-9"} ${className ?? ""}`}
      onClick={() => {
        onToggle?.(!enabled);
        setEnabled(!enabled);
      }}
    >
      <div
        className={`absolute h-[19px] w-[19px] rounded-full border-[0.8px] bg-white transition-all duration-200 ${
          enabled
            ? "translate-x-[15.5px] border-[#59ABF2]"
            : "translate-x-[1.5px] border-[#DFDFDF]"
        }`}
      ></div>
    </div>
  );
};

export { CustomSwitch };
