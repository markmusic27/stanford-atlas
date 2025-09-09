import { TextShimmer } from "../TextShimmer";

interface Steps {
  text: string;
  tool: "thinking" | "searching";
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
      <div className="flex-row gap-[8px]">
        {/* Icons */}
        <div></div>
        {/* Text */}
        <div></div>
      </div>
    </div>
  );
};

export default ActivityTimeline;
