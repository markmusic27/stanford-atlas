"use client";

import { useEffect, useRef, useState } from "react";

interface CustomTextareaProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  name?: string;
  onUpdate?: (value: string) => Promise<void> | void;
}

const CustomTextarea = ({
  placeholder,
  defaultValue = "",
  className,
  name,
  onUpdate,
}: CustomTextareaProps) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setValue(next);
    if (onUpdate) void onUpdate(next);
  };

  return (
    <div
      className={`bg-primary-1 border-primary-9 rounded-[12px] border-[1px] px-[18px] py-[16px] ${className ?? ""}`}
    >
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        className="text-primary-text placeholder-secondary-text-4 caret-text-cursor minimal-scrollbar max-h-[40vh] min-h-[24px] w-full resize-none bg-transparent text-[16px] outline-none"
        placeholder={placeholder}
      />
    </div>
  );
};

export default CustomTextarea;
