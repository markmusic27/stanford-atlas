import { useViewportHeight } from "~/hooks/useViewportHeigh";
import Message from "../ui/chat/Message.chat";
import { BAR_HEIGHT, FOOTER_HEIGHT, SPACING } from "~/lib/constants";

const Chat = () => {
  return (
    <div className="absolute flex h-full w-full flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-[800px] pt-[32px] md:pt-[48px]">
        <Message
          message={{
            type: "message",
            payload: {
              content: `Help me find a 4-unit robotics course from tuesday to friday 4pm onwards `,
            },
            createdAt: new Date(),
            id: "1",
          }}
        />
        <div className={`h-[${FOOTER_HEIGHT}px]`} />
      </div>
    </div>
  );
};

export default Chat;
