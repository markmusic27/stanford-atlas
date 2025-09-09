import { TextShimmer } from "../TextShimmer";
import ActivityIcon from "./components/ActivityIcon.chat";
import ActivityLine from "./components/ActivityLine.chat";
import ActivityText from "./components/ActivityText.chat";

export type ActivityTool = "thinking" | "searching";
export interface Steps {
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
        <div className="flex w-[14px] flex-col">
          {steps.map((step, i) => (
            <div className="flex flex-col items-center" key={i}>
              <ActivityIcon type={step.tool} />
              {i < steps.length - 1 ? (
                <ActivityLine pre={step.tool} post={steps[i + 1]!.tool} />
              ) : null}
            </div>
          ))}
        </div>
        {/* Text */}
        <div className="flex flex-col items-start">
          {steps.map((step, i) => (
            <ActivityText text={step.text} i={i} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
