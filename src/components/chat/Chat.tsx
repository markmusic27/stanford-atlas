"use client";

import { FOOTER_HEIGHT } from "~/lib/constants";
import { useChatStore } from "~/store/chat.store";
const Chat = () => {
  const { history } = useChatStore();
  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[44px] px-[16px] pt-[32px] md:pt-[48px]">
        <p>{JSON.stringify(history)}</p>
        <div className={`w-[10px]`} style={{ height: FOOTER_HEIGHT * 2 }} />
      </div>
    </div>
  );
};

export default Chat;
