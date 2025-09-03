"use client";

import { useEffect, useRef, useState } from "react";

interface CustomTextAreaProps {
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  onUpdate?: (value: string) => Promise<void> | void;
}

const CustomTextArea = ({
  name,
  placeholder,
  defaultValue = "",
  className,
  onUpdate,
}: CustomTextAreaProps) => {
  const [value, setValue] = useState(defaultValue);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setValue(next);
    if (onUpdate) void onUpdate(next);
  };

  return (
    <textarea
      ref={textareaRef}
      name={name}
      rows={1}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`bg-primary-1 border-primary-9 resize-none overflow-hidden rounded-[12px] border-[1px] px-[18px] pt-[14px] pb-[16px] text-green-600 outline-none placeholder:text-red-500 ${className ?? ""}`}
    />
  );
};

export default CustomTextArea;
