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
  const sizerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const updateHeight = () => {
    const el = textareaRef.current;
    const sizer = sizerRef.current;
    if (!el || !sizer) return;
    sizer.textContent = `${value.length > 0 ? value : (placeholder ?? "")}\n`;
    const nextHeight = sizer.offsetHeight;
    el.style.height = "auto";
    el.style.height = `${nextHeight}px`;
  };

  useEffect(() => {
    updateHeight();
  }, [value, placeholder]);

  useEffect(() => {
    const onResize = () => updateHeight();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    setValue(next);
    if (onUpdate) void onUpdate(next);
  };

  return (
    <div className="relative w-full min-w-0">
      <div
        ref={sizerRef}
        className="invisible absolute top-0 left-0 w-full px-[18px] pt-[14px] pb-[16px] break-words whitespace-pre-wrap"
      />
      <textarea
        ref={textareaRef}
        name={name}
        rows={1}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={`bg-primary-1 caret-text-cursor border-primary-9 placeholder:text-secondary-text-4 text-primary-text block w-full resize-none overflow-hidden rounded-[12px] border-[1px] px-[18px] pt-[14px] pb-[16px] outline-none ${className ?? ""}`}
      />
    </div>
  );
};

export default CustomTextArea;
