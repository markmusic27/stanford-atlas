import { ACTIVITY_TIMELINE_SPACING } from "~/lib/constants";
import type { ActivityTool } from "../ActivityTimeline.chat";

interface ActivityLineProps {
  pre: ActivityTool;
  post: ActivityTool;
}

const ActivityLine = ({ pre, post }: ActivityLineProps) => {
  const handleHeight = () => {
    let base = ACTIVITY_TIMELINE_SPACING - 2;
    if (pre === "searching") {
      base -= 3;
    }
    if (post === "searching") {
      base -= 3;
    }

    return base;
  };

  const handleMargin = () => {
    let top = 1;
    let bottom = 1;

    if (pre === "searching") {
      top += 3;
    }
    if (post === "searching") {
      bottom += 3;
    }

    return { top, bottom };
  };

  return (
    <div
      className="bg-primary-7 w-[2px] rounded-full"
      style={{
        marginTop: handleMargin().top,
        marginBottom: handleMargin().bottom,
        height: handleHeight(),
      }}
    />
  );
};

export default ActivityLine;
