"use client";

import { AnimatePresence, motion } from "framer-motion";

interface AnimatedCollapsableProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
  /** Duration in milliseconds */
  duration?: number;
}

const AnimatedCollapsable = ({
  isOpen,
  children,
  className = "",
  duration = 500,
}: AnimatedCollapsableProps) => {
  const seconds = Math.max(0, duration) / 1000;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="animated-collapsable"
          className={`overflow-hidden ${className}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: seconds, ease: [0.2, 0, 0, 1] }}
        >
          <motion.div layout transition={{ duration: seconds }}>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedCollapsable;
