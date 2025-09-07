"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCollapsableProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

const AnimatedCollapsable = ({
  isOpen,
  children,
  className = "",
  duration = 500,
}: AnimatedCollapsableProps) => {
  // Keep wrapper in the layout during animation; remove after collapse completes
  const [isWrapperVisible, setIsWrapperVisible] = useState<boolean>(isOpen);
  const [measuredHeight, setMeasuredHeight] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const openRaf1Ref = useRef<number | null>(null);
  const openRaf2Ref = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [isAnimatingOpen, setIsAnimatingOpen] = useState<boolean>(false);

  // Measure content height and respond to size changes
  useEffect(() => {
    setIsMounted(true);
    const node = contentRef.current;
    if (!node) return;

    const updateHeight = () => {
      // Use scrollHeight to capture full content height
      setMeasuredHeight(node.scrollHeight);
    };

    updateHeight();

    // Observe child size changes
    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver(() => updateHeight());
      ro.observe(node);
      resizeObserverRef.current = ro;
    } else {
      // Fallback: listen for window resize
      window.addEventListener("resize", updateHeight);
    }

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      } else {
        window.removeEventListener("resize", updateHeight);
      }
    };
  }, []);

  // Control visibility (hidden) with a timeout synced to duration
  useEffect(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (openRaf1Ref.current !== null) {
      cancelAnimationFrame(openRaf1Ref.current);
      openRaf1Ref.current = null;
    }
    if (openRaf2Ref.current !== null) {
      cancelAnimationFrame(openRaf2Ref.current);
      openRaf2Ref.current = null;
    }

    if (isOpen) {
      // Show wrapper and start from collapsed state for one frame
      setIsWrapperVisible(true);
      setIsAnimatingOpen(true);
      // Measure after becoming visible, then expand next frame
      openRaf1Ref.current = requestAnimationFrame(() => {
        const node = contentRef.current;
        if (node) {
          setMeasuredHeight(node.scrollHeight);
        }
        openRaf2Ref.current = requestAnimationFrame(() => {
          setIsAnimatingOpen(false);
        });
      });
    } else {
      // After collapse animation completes, remove from layout
      hideTimerRef.current = window.setTimeout(() => {
        setIsWrapperVisible(false);
        hideTimerRef.current = null;
      }, duration);
      // Ensure we are not in an open animation phase
      setIsAnimatingOpen(false);
    }

    return () => {
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };
  }, [isOpen, duration]);

  return (
    <div
      className={`${isWrapperVisible ? "" : "hidden"} overflow-hidden transition-[max-height,opacity] ${className}`}
      style={{
        maxHeight: isOpen ? (isAnimatingOpen ? 0 : measuredHeight || 0) : 0,
        opacity: isOpen ? (isAnimatingOpen ? 0 : 1) : 0,
        transitionDuration: isMounted ? `${duration}ms` : "0ms",
      }}
      aria-hidden={!isWrapperVisible}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default AnimatedCollapsable;
