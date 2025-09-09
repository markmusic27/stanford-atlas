import { motion } from "motion/react";
import Icon, { IconType } from "../../icons/Icon";
import type { ActivityTool } from "../ActivityTimeline";

const ActivityIcon = ({ type }: { type: ActivityTool }) => {
  return (
    //  Animate height from 6 to 21
    <motion.div
      className="flex h-[21px] flex-col justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {type === "thinking" ? (
        <div className="bg-primary-8 h-[6px] w-[6px] rounded-full" />
      ) : (
        <Icon
          className="text-primary-8 h-[14px] w-[14px]"
          type={IconType.Globe}
        />
      )}
    </motion.div>
  );
};

export default ActivityIcon;
