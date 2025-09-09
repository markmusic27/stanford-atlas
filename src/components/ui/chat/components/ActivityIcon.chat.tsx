import Icon, { IconType } from "../../icons/Icon";
import type { ActivityTool } from "../ActivityTimeline.chat";

const ActivityIcon = ({ type }: { type: ActivityTool }) => {
  return (
    //  Animate height from 6 to 21
    <div className="flex h-[21px] flex-col justify-center">
      {type === "thinking" ? (
        <div className="bg-primary-8 h-[6px] w-[6px] rounded-full" />
      ) : (
        <Icon
          className="text-primary-8 h-[14px] w-[14px]"
          type={IconType.Globe}
        />
      )}
    </div>
  );
};

export default ActivityIcon;
