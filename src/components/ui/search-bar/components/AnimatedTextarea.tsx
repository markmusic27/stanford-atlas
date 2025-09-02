"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  className?: string;
}

const placeholderTexts = [
  // TODO: update placeholders to be shorter and more relevant
  "Find a 4 unit robotics course from 11 to 3pm on Thursdays",
  "Show me computer science classes with Professor Smith",
  "What are the prerequisites for CS 106A?",
  "Find biology labs that don't conflict with my schedule",
  "Search for courses with high ratings and low workload",
];

const AnimatedTextarea = ({
  value,
  onChange,
  onSubmit,
  className = "",
}: AnimatedTextareaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDurationMs = 550; // keep in sync with CSS duration
  const intervalMs = 4000;
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    const startAnimation = () => {
      setIsAnimating(true);
      // After the animation finishes, commit the next index and reset
      timeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholderTexts.length);
        setIsAnimating(false);
      }, animationDurationMs);
    };

    intervalRef.current = window.setInterval(startAnimation, intervalMs);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const nextIndex = (currentIndex + 1) % placeholderTexts.length;
  const currentText = placeholderTexts[currentIndex];
  const upcomingText = placeholderTexts[nextIndex];

  return (
    <div className={`relative w-full ${className}`}>
      {/* Animated placeholder overlay - visible only when empty */}
      {value.length === 0 && (
        <div
          className="pointer-events-none absolute top-0 left-0 w-full overflow-visible"
          aria-hidden
        >
          <div className="relative h-[24px]">
            <div
              className={`text-secondary-text-4 absolute inset-0 whitespace-pre-wrap ${
                isAnimating
                  ? "will-change-opacity -translate-y-4 opacity-0 transition-all duration-[400ms] will-change-transform"
                  : "translate-y-0 opacity-100 transition-none"
              }`}
            >
              {currentText}
            </div>
            <div
              className={`text-secondary-text-4 absolute inset-0 whitespace-pre-wrap ${
                isAnimating
                  ? "will-change-opacity translate-y-0 opacity-100 transition-all duration-[550ms] will-change-transform"
                  : "translate-y-4 opacity-0 transition-none"
              }`}
            >
              {upcomingText}
            </div>
          </div>
        </div>
      )}

      <textarea
        className={`text-primary-text placeholder-secondary-text-4 caret-text-cursor minimal-scrollbar max-h-[40vh] min-h-[24px] w-full resize-none bg-transparent text-[16px] outline-none`}
        autoComplete="off"
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={1}
        style={{
          height: "auto",
          minHeight: "24px",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit(value);
          }
        }}
        onInput={(e) => {
          const target = e.target as HTMLTextAreaElement;
          const maxHeight = window.innerHeight * 0.4;
          target.style.height = "auto";

          if (target.scrollHeight <= maxHeight) {
            // Content fits within max height - grow the textarea and hide overflow
            target.style.height = target.scrollHeight + "px";
            target.style.overflowY = "hidden";
          } else {
            // Content exceeds max height - set to max height and show scrollbar
            target.style.height = maxHeight + "px";
            target.style.overflowY = "auto";
          }
        }}
      />
    </div>
  );
};

export default AnimatedTextarea;
