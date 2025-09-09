import { useViewportHeight } from "~/hooks/useViewportHeigh";
import Message from "../ui/message/Message";
import { FOOTER_HEIGHT } from "~/lib/constants";
import Response from "../ui/response/Response";
import SingleCourseCard from "../ui/single-course-card/SingleCourseCard";
import { DUMMY_COURSE } from "~/lib/course.util";

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
        <SingleCourseCard course={DUMMY_COURSE} />
        <div className={`h-[${FOOTER_HEIGHT}px]`} />
      </div>
    </div>
  );
};

export default Chat;
