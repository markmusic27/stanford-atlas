"use client";

import { FOOTER_HEIGHT } from "~/lib/constants";
import { useChatStore } from "~/store/chat.store";
import CourseCard from "../ui/course-grid/components/CourseCard";
const Chat = () => {
  const { chatHistory } = useChatStore();
  return (
    <div className="absolute h-full w-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-[800px] flex-col gap-[44px] px-[16px] pt-[32px] md:pt-[48px]">
        {/* <CourseCard courseId={105750} classId={7511} /> */}
        {JSON.stringify(chatHistory)}
        <div className={`w-[10px]`} style={{ height: FOOTER_HEIGHT * 2 }} />
      </div>
    </div>
  );
};

export default Chat;
