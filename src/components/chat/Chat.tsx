"use client";

import { useEffect, useState } from "react";
import Message from "../ui/message/Message";
import { FOOTER_HEIGHT } from "~/lib/constants";
import BlockRenderer from "../ui/BlockRenderer";
import { parseBlocks, type Block } from "~/lib/blocks";

const Chat = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    let isMounted = true;
    fetch("/temp/example_response.json")
      .then((res) => res.text())
      .then((text) => {
        const result = parseBlocks(JSON.parse(text) as unknown);

        const newBlocks: Block[] = result.success
          ? result.data
          : [{ type: "markdown", markdown: "Invalid block structure." }];
        if (isMounted) setBlocks(newBlocks);
      })
      .catch(() => {
        if (isMounted)
          setBlocks([
            { type: "markdown", markdown: "Invalid block structure." },
          ]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[44px] px-[16px] pt-[32px] md:pt-[48px]">
        <Message
          message={{
            type: "message",
            payload: {
              content: `Find a 4 unit robotics course from 11 to 3pm on Thursdays`,
            },
            createdAt: new Date(),
            id: "1",
          }}
        />
        <BlockRenderer blocks={blocks} />
        <div className={`w-[10px]`} style={{ height: FOOTER_HEIGHT * 2 }} />
      </div>
    </div>
  );
};

export default Chat;
