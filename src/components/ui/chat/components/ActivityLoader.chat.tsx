"use client";

import { motion, type Variants } from "motion/react";

const dotVariants: Variants = {
  pulse: {
    scale: [1, 1.3, 1],
    backgroundColor: [
      "var(--color-secondary-text-6)",
      "var(--color-secondary-text-5)",
      "var(--color-secondary-text-6)",
    ],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

interface DotProps {
  className?: string;
}

const Dot = ({ className = "" }: DotProps) => {
  return (
    <motion.div
      className={`h-[5px] w-[5px] rounded-full will-change-transform ${className}`}
      variants={dotVariants}
    />
  );
};

interface ActivityLoaderProps {
  className?: string;
}

const ActivityLoader = ({ className = "" }: ActivityLoaderProps) => {
  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className={`flex items-center justify-center gap-[5px] ${className}`}
    >
      <Dot />
      <Dot />
      <Dot />
    </motion.div>
  );
};

export default ActivityLoader;
