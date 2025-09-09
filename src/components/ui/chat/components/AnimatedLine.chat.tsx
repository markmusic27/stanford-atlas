import { ACTIVITY_TIMELINE_SPACING } from "~/lib/constants";

const AnimatedLine = () => {
  return (
    <div
      className={`flex ${"h-[" + ACTIVITY_TIMELINE_SPACING + "px]"} flex-col justify-center`}
    >
      <div
        className="bg-primary-7 w-[2px] rounded-full"
        style={{
          height: "16px",
        }}
      />
    </div>
  );
};

export default AnimatedLine;
