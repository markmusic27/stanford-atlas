"use client";

import { useEffect, useRef, useState } from "react";
import type { MessageItem } from "~/lib/chat.utils";
import Icon, { IconType } from "../icons/Icon";

interface MessageProps {
  message: MessageItem;
}

const Message = ({ message }: MessageProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

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
        className={`bg-primary-5 relative ${isExpanded ? "max-h-none" : "max-h-[37dvh]"} max-w-[75%] overflow-clip rounded-[16px] px-[24px] py-[16px]`}
      >
        <p className="text-primary-text z-0 text-[16px] leading-relaxed whitespace-pre-wrap">
          {message.payload.content}
        </p>
        {isOverflowing && !isExpanded ? (
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-[60px]"
            style={{
              background:
                "linear-gradient(to top, var(--color-primary-5) 0%, var(--color-primary-5) 20%, transparent 100%)",
            }}
          >
            <div
              className="bg-primary-7 pointer-events-auto absolute right-[12px] bottom-[12px] h-[25px] w-[25px] cursor-pointer rounded-full hover:scale-[1.1]"
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              <Icon
                type={IconType.Chevron}
                className={`text-secondary-text-1 pb-[3px] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Message;
