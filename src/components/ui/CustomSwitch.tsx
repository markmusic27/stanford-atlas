"use client";
import { useState } from "react";

const CustomSwitch = ({ className }: { className?: string }) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className={`relative flex h-[22px] w-[36px] cursor-pointer items-center rounded-full shadow-inner transition-all duration-200 ${enabled ? "bg-primary-9" : "bg-blue-500"} ${className ?? ""}`}
      onClick={() => setEnabled(!enabled)}
    >
      <div
        className={`absolute h-[19px] w-[19px] rounded-full border-[0.8px] bg-white transition-all duration-200 ${
          enabled
            ? "translate-x-[1.5px] border-[#DFDFDF]"
            : "translate-x-[15.5px] border-[#59ABF2]"
        }`}
      ></div>
    </div>
  );
};

export { CustomSwitch };
