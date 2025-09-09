import type { ActivityTool } from "../ActivityTimeline.chat";

const ActivityIcon = ({ type }: { type: ActivityTool }) => {
  return (
    //  Animate height from 6 to 21
    <div className="flex h-[21px] flex-col justify-center">
      <div className="bg-primary-8 h-[6px] w-[6px] rounded-full" />
    </div>
  );
};

export default ActivityIcon;
