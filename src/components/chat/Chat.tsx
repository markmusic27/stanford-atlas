import { useViewportHeight } from "~/hooks/useViewportHeigh";
import Message from "../ui/chat/Message.chat";
import { BAR_HEIGHT, FOOTER_HEIGHT, SPACING } from "~/lib/constants";
import ActivityTimeline from "../ui/chat/ActivityTimeline.chat";

const Chat = () => {
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
        <ActivityTimeline
          steps={[
            { text: "Searching for robotics courses", tool: "thinking" },
            { text: "Searching for course schedules", tool: "thinking" },
            { text: "Searching course catalog", tool: "searching" },
            { text: "Reviewing potential candidates", tool: "thinking" },
          ]}
        />
        <div className={`h-[${FOOTER_HEIGHT}px]`} />
      </div>
    </div>
  );
};

export default Chat;
