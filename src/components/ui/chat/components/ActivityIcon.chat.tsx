import { motion } from "motion/react";
import Icon, { IconType } from "../../icons/Icon";
import type { ActivityTool } from "../ActivityTimeline.chat";

const ActivityIcon = ({ type }: { type: ActivityTool }) => {
  return type === "thinking" ? (
    <div
      style={{
        marginTop: (21 - 6) / 2,
        marginBottom: (21 - 6) / 2,
      }}
    >
      <div className="bg-primary-8 h-[6px] w-[6px] rounded-full" />
    </div>
  ) : (
    <div
      style={{
        marginTop: (21 - 14) / 2,
        marginBottom: (21 - 14) / 2,
      }}
    >
      <Icon
        className="text-primary-8 h-[14px] w-[14px]"
        type={IconType.Globe}
      />
    </div>
  );
};

export default ActivityIcon;
