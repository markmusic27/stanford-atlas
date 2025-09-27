"use client";

interface MessageProps {
  message: string;
}

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex w-full justify-end">
      <div className="bg-primary-5 relative max-w-[75%] rounded-[24px] px-[24px] py-[16px]">
        <p className="text-primary-text text-[16px] leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Message;
