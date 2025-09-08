import Message from "../ui/chat/Message.chat";

const Chat = () => {
  return (
    <div className="absolute left-1/2 z-1 mx-auto flex h-full w-full max-w-[800px] -translate-x-1/2 flex-col px-[8px] pt-[32px] md:px-[16px] md:pt-[48px]">
      <Message message="Find a 4 unit robotics course from 11 to 3pm on Thursdays" />
    </div>
  );
};

export default Chat;
