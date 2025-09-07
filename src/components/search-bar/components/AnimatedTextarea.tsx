"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedTextareaProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
  className?: string;
  isChatOpen?: boolean;
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
  name,
  className = "",
  isChatOpen = false,
}: AnimatedTextareaProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationDurationMs = 550; // keep in sync with CSS duration
  const intervalMs = 4000;
  const timeoutRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);

  // When chat is open, show a single static placeholder and disable animation
  const placeholders = isChatOpen
    ? ["Ask another question..."]
    : placeholderTexts;

  useEffect(() => {
    // Clear any existing timers when dependencies change
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);

    // Disable animation when chat is open or when there is only one placeholder
    if (isChatOpen || placeholders.length <= 1) {
      setIsAnimating(false);
      return;
    }

    const startAnimation = () => {
      setIsAnimating(true);
      // After the animation finishes, commit the next index and reset
      timeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
        setIsAnimating(false);
      }, animationDurationMs);
    };

    intervalRef.current = window.setInterval(startAnimation, intervalMs);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, [isChatOpen, animationDurationMs, intervalMs, placeholders.length]);

  const nextIndex = (currentIndex + 1) % placeholders.length;
  const currentText = placeholders[currentIndex];
  const upcomingText = placeholders[nextIndex];

  return (
    <div className={`relative w-full ${className}`}>
      {/* Animated placeholder overlay - visible only when empty */}
      {value.length === 0 && !isChatOpen && (
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
        name={name}
        placeholder={isChatOpen ? "Ask another question..." : undefined}
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
            // Only submit if there is non-empty content
            if (value.trim().length > 0) {
              const form = (e.currentTarget as HTMLTextAreaElement).form;
              form?.requestSubmit();
            }
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
