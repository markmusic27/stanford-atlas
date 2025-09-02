"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef } from "react";

interface CursorShimmerProps {
  children: ReactNode;
  className?: string;
  /** 0.0 to 1.0 — how bright the shimmer appears */
  strength?: number;
  /** Radius of the shimmer in pixels */
  radius?: number;
  /** Disable the shimmer effect entirely */
  disabled?: boolean;
  /** CSS color for the shimmer (e.g., #fff, rgb(...), hsl(...)) */
  color?: string;
}

/**
 * CursorShimmer wraps content and renders a cursor-tracked radial white shimmer overlay.
 * Uses CSS variables and rAF to keep updates smooth without forcing React re-renders on pointer move.
 */
const CursorShimmer = ({
  children,
  className,
  strength = 0.18,
  radius = 140,
  disabled = false,
  color = "white",
}: CursorShimmerProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const pendingPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const overlay = overlayRef.current;
    if (!container || !overlay) return;

    if (disabled) {
      overlay.style.opacity = "0";
      return;
    }

    // Keep shimmer color and initial alpha in sync with props
    overlay.style.setProperty("--color", color);

    const handlePointerEnter = () => {
      overlay.style.opacity = String(Math.max(0, Math.min(1, strength)));
    };

    const handlePointerLeave = () => {
      overlay.style.opacity = "0";
    };

    const flushPosition = () => {
      rafIdRef.current = null;
      const pending = pendingPositionRef.current;
      if (!pending) return;
      pendingPositionRef.current = null;
      overlay.style.setProperty("--x", `${pending.x}px`);
      overlay.style.setProperty("--y", `${pending.y}px`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pendingPositionRef.current = { x, y };
      rafIdRef.current ??= window.requestAnimationFrame(flushPosition);
    };

    container.addEventListener("pointerenter", handlePointerEnter);
    container.addEventListener("pointerleave", handlePointerLeave);
    container.addEventListener("pointermove", handlePointerMove);

    return () => {
      container.removeEventListener("pointerenter", handlePointerEnter);
      container.removeEventListener("pointerleave", handlePointerLeave);
      container.removeEventListener("pointermove", handlePointerMove);
      if (rafIdRef.current != null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [disabled, strength, color]);

  const containerClasses = [
    "relative",
    "isolate",
    "overflow-visible",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const overlayStyle: CSSProperties & Record<string, string> = {
    // CSS custom props for gradient
    ["--x"]: "50%",
    ["--y"]: "50%",
    ["--color"]: color,
    ["--r"]: `${Math.max(0, radius)}px`,
    // Visuals
    background:
      "radial-gradient(circle at var(--x) var(--y), var(--color) 0%, transparent var(--r))",
    opacity: "0",
  };

  return (
    <div ref={containerRef} className={containerClasses}>
      {children}
      {disabled ? null : (
        <div
          ref={overlayRef}
          className="pointer-events-none absolute inset-0 z-10 mix-blend-normal transition-opacity duration-150 ease-out will-change-[background,opacity]"
          style={overlayStyle}
        />
      )}
    </div>
  );
};

export default CursorShimmer;
