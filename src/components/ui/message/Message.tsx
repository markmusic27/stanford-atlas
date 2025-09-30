"use client";

import { motion } from "framer-motion";

interface MessageProps {
  message: string;
}

const Message = ({ message }: MessageProps) => {
  return (
    <div className="flex w-full justify-end">
      <motion.div
        className="bg-primary-5 relative max-w-[75%] rounded-[24px] px-[24px] py-[10px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      >
        <p className="text-primary-text text-[16px] leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </motion.div>
    </div>
  );
};

export default Message;
