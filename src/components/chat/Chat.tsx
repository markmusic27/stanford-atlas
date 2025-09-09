import { useViewportHeight } from "~/hooks/useViewportHeigh";
import Message from "../ui/chat/Message.chat";
import { BAR_HEIGHT, FOOTER_HEIGHT, SPACING } from "~/lib/constants";
import ActivityTimeline, { type Steps } from "../ui/chat/ActivityTimeline.chat";
import { useState } from "react";

// Simple button component for testing
const Button = ({
  children,
  onClick,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  [key: string]: any;
}) => (
  <button
    onClick={onClick}
    className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
    {...props}
  >
    {children}
  </button>
);

const Chat = () => {
  const [steps, setSteps] = useState<Steps[]>([
    { text: "Searching for robotics courses", tool: "thinking" },
    { text: "Searching for robotics courses", tool: "searching" },
  ]);
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
        <ActivityTimeline steps={steps} />
        <div className={`h-[${FOOTER_HEIGHT}px]`} />
        <Button
          onClick={() =>
            setSteps([
              ...steps,
              { text: "Searching for potential candidates", tool: "thinking" },
            ])
          }
        >
          Add Step
        </Button>
      </div>
    </div>
  );
};

export default Chat;
