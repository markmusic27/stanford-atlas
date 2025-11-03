"use client";

import { motion } from "framer-motion";
import { signInWithGoogle } from "~/utils/auth/signIn";

export const SignInPrompt = () => {
  const handleSignIn = () => {
    void signInWithGoogle("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex w-full items-center justify-center"
    >
      <div className="bg-primary-1 border-primary-9 flex w-full max-w-[400px] items-center justify-between gap-[8px] rounded-[16px] border-[1px] px-[16px] py-[20px]">
        <div className="flex flex-col gap-1">
          <h3 className="text-primary-text text-[14px] leading-tight font-[500]">
            Sign In to Continue
          </h3>
          <p className="text-secondary-text-2 text-[14px] leading-tight">
            Continue planning your academic journey.
          </p>
        </div>
        <button
          onClick={handleSignIn}
          className="bg-primary-accent text-primary-1 cursor-pointer rounded-[6px] px-[6px] py-[4px] text-[14px] font-[450] whitespace-nowrap transition-colors duration-200 hover:scale-101"
        >
          Sign In
        </button>
      </div>
    </motion.div>
  );
};
