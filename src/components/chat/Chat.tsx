"use client";

import { useEffect, useRef } from "react";
import { FOOTER_HEIGHT } from "~/lib/constants";
import { useChatStore } from "~/store/chat.store";
import BlockRenderer from "../ui/BlockRenderer";
import Message from "../ui/message/Message";
import type { Block, ChatHistory } from "~/app/api/stream-content/schemas";
import ActivityTimeline from "../ui/activity-timeline/ActivityTimeline";
function collapseConsecutiveDuplicates<T>(items: T[]): T[] {
  if (items.length === 0) return [];
  const result: T[] = [items[0]!];
  for (let i = 1; i < items.length; i++) {
    if (items[i] !== items[i - 1]) {
      result.push(items[i]!);
    }
  }
  return result;
}
const Chat = () => {
  const { chatHistory, chainOfThought } = useChatStore();
  const isStreaming = useChatStore((s) => s.isStreaming);

  // Scroll to bottom on submit/start streaming
  const scrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!isStreaming) return;
    const el = scrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => {
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    });
    return () => cancelAnimationFrame(id);
  }, [isStreaming, chatHistory.length]);

  function generateGroups(history: ChatHistory[]) {
    type Group =
      | { type: "query"; payload: string }
      | { type: "response"; payload: Block[] };

    const groups: Group[] = [];
    let lastType: "query" | "response" | null = null;
    let bufferQuery = "";
    let bufferBlocks: Block[] = [];

    for (const entry of history) {
      if (entry.type === "query") {
        if (lastType === "response" && bufferBlocks.length) {
          groups.push({ type: "response", payload: bufferBlocks });
          bufferBlocks = [];
        }
        bufferQuery = bufferQuery
          ? `${bufferQuery}\n\n${entry.payload}`
          : entry.payload;
        lastType = "query";
      } else {
        if (lastType === "query" && bufferQuery) {
          groups.push({ type: "query", payload: bufferQuery });
          bufferQuery = "";
        }
        bufferBlocks = bufferBlocks.concat(entry.payload);
        lastType = "response";
      }
    }

    if (lastType === "query" && bufferQuery) {
      groups.push({ type: "query", payload: bufferQuery });
    }
    if (lastType === "response" && bufferBlocks.length) {
      groups.push({ type: "response", payload: bufferBlocks });
    }

    return groups;
  }

  const groups = generateGroups(chatHistory);
  const lastGroup = groups.length ? groups[groups.length - 1] : undefined;
  const showTimeline = isStreaming && lastGroup?.type === "query";
  const timelineChain = collapseConsecutiveDuplicates(chainOfThought);

  return (
    <div ref={scrollRef} className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[20px] px-[16px] pt-[32px] md:pt-[48px]">
        {groups.map((group, i) =>
          group.type === "query" ? (
            <div key={i} className={i != 0 ? "mt-[16px]" : ""}>
              <Message key={i} message={group.payload} />
              {showTimeline && i === groups.length - 1 ? (
                <div className="mt-[12px]">
                  <ActivityTimeline
                    steps={timelineChain.map((value, index) => {
                      let text = "";
                      switch (value) {
                        case "reasoning":
                          text = "Reasoning";
                          break;
                        case "search-courses":
                          text = "Searching course catalog";
                          break;
                        case "get-course":
                          text = "Fetching course details";
                          break;
                        default:
                          text = "Reasoning";
                          break;
                      }

                      return {
                        text: text,
                        tool: value == "reasoning" ? "reasoning" : "searching",
                        loading: index == timelineChain.length - 1,
                      };
                    })}
                    loading={chainOfThought.length == 0}
                  />
                </div>
              ) : null}
            </div>
          ) : (
            <BlockRenderer key={i} blocks={group.payload} />
          ),
        )}

        <div className={`w-[10px]`} style={{ height: FOOTER_HEIGHT * 2 }} />
      </div>
    </div>
  );
};

export default Chat;
