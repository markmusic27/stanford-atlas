import { TextShimmer } from "../TextShimmer";
import ActivityIcon from "./components/ActivityIcon.chat";
import ActivityLine from "./components/ActivityLine.chat";
import ActivityText from "./components/ActivityText.chat";

export type ActivityTool = "thinking" | "searching";
interface Steps {
  text: string;
  tool: ActivityTool;
}

const ActivityTimeline = ({ steps }: { steps: Steps[] }) => {
  return (
    <div className="flex flex-col gap-[20px]">
      <TextShimmer
        className="w-[65px] font-sans text-[14px] font-[400]"
        duration={1}
      >
        Thinking...
      </TextShimmer>
      <div className="flex flex-row gap-[8px]">
        {/* Icons */}
        <div className="flex w-[14px] flex-col items-center">
          <ActivityIcon type={"thinking"} />
          <ActivityLine pre={"thinking"} post={"thinking"} />
          <ActivityIcon type={"thinking"} />
          <ActivityLine pre={"thinking"} post={"searching"} />
          <ActivityIcon type={"searching"} />
          <ActivityLine pre={"searching"} post={"thinking"} />
          <ActivityIcon type={"thinking"} />
        </div>
        {/* Text */}
        <div className="flex flex-col items-start">
          <ActivityText text={steps[0]?.text ?? ""} i={0} />
          <ActivityText text={steps[1]?.text ?? ""} i={1} />
          <ActivityText text={steps[2]?.text ?? ""} i={2} />
          <ActivityText text={steps[2]?.text ?? ""} i={3} />
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
