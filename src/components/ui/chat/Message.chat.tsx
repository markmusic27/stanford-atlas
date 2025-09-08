"use client";

import { useEffect, useRef, useState } from "react";
import type { MessageItem } from "~/lib/chat.utils";

interface MessageProps {
  message: MessageItem;
}

const Message = ({ message }: MessageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const check = () => {
      setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    };

    check();

    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [message.payload.content]);

  return (
    <div className="flex w-full justify-end">
      <div
        ref={containerRef}
        className="bg-primary-5 relative max-h-[37dvh] max-w-[75%] overflow-clip rounded-[16px] px-[24px] py-[16px]"
      >
        <p className="text-primary-text text-[16px] leading-relaxed whitespace-pre-wrap">
          {message.payload.content}
        </p>
        {isOverflowing ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[60px]"
            style={{
              background:
                "linear-gradient(to top, var(--color-primary-5) 0%, var(--color-primary-5) 20%, transparent 100%)",
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Message;
