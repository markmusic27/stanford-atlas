"use client";

import { FOOTER_HEIGHT } from "~/lib/constants";
const Chat = () => {
  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[44px] px-[16px] pt-[32px] md:pt-[48px]">
        {/* {generateGroups(content).map((list, i) => {
          // MESSAGE
          const type = list[0]!.type;

          if (type === "message") {
            return <Message message={list[0]!.content} key={i} />;
          }

          return <BlockRenderer blocks={list} key={i} />;
        })} */}
        <div className={`w-[10px]`} style={{ height: FOOTER_HEIGHT * 2 }} />
      </div>
    </div>
  );
};

export default Chat;
