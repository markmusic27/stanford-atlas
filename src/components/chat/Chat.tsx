"use client";

import { FOOTER_HEIGHT } from "~/lib/constants";
import { useChatStore } from "~/store/chat.store";
import BlockRenderer from "../ui/BlockRenderer";
import Message from "../ui/message/Message";
import type { Block, ChatHistory } from "~/app/api/stream-content/schemas";
const Chat = () => {
  const { chatHistory } = useChatStore();

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

  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[44px] px-[16px] pt-[32px] md:pt-[48px]">
        {generateGroups(chatHistory).map((group, i) =>
          group.type === "query" ? (
            <Message key={i} message={group.payload} />
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
