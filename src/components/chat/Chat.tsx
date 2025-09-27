"use client";

import Message from "../ui/message/Message";
import { FOOTER_HEIGHT } from "~/lib/constants";
import BlockRenderer from "../ui/BlockRenderer";
import { useChatStore } from "~/store/chat.store";
import type { Block } from "~/lib/blocks";

const Chat = () => {
  const { content } = useChatStore();

  function generateGroups(blocks: Block[]): Block[][] {
    const groups: Block[][] = [];
    let current: Block[] = [];
    let currentIsMessage: boolean | undefined;

    for (const block of blocks) {
      const isMessage = block.type === "message";

      if (currentIsMessage === undefined || isMessage === currentIsMessage) {
        // same bucket (both message or both non-message)
        current.push(block);
        currentIsMessage = isMessage;
      } else {
        // bucket changed → flush and start new
        groups.push(current);
        current = [block];
        currentIsMessage = isMessage;
      }
    }

    if (current.length) groups.push(current); // flush last group
    return groups;
  }

  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[44px] px-[16px] pt-[32px] md:pt-[48px]">
        {generateGroups(content).map((list, i) => {
          // MESSAGE
          const type = list[0]!.type;

          if (type === "message") {
            return <Message message={list[0]!.content} key={i} />;
          }

          return <BlockRenderer blocks={list} key={i} />;
        })}
        <div className={`w-[10px]`} style={{ height: FOOTER_HEIGHT * 2 }} />
      </div>
    </div>
  );
};

export default Chat;
