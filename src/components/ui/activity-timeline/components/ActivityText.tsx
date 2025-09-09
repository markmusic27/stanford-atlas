import { motion } from "motion/react";
import { ACTIVITY_TIMELINE_SPACING } from "~/lib/constants";

interface ActivityTextProps {
  text: string;
  i: number;
}

const ActivityText = ({ text, i }: ActivityTextProps) => {
  return (
    <motion.p
      className="text-secondary-text-2 text-[14px] font-[400]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      style={{ marginTop: i == 0 ? "0px" : `${ACTIVITY_TIMELINE_SPACING}px` }}
    >
      {text}
    </motion.p>
  );
};

export default ActivityText;
