import { ACTIVITY_TIMELINE_SPACING } from "~/lib/constants";
import type { ActivityTool } from "../ActivityTimeline.chat";

interface ActivityLineProps {
  pre: ActivityTool;
  post: ActivityTool;
}

const ActivityLine = ({ pre, post }: ActivityLineProps) => {
  const spacing = 2;

  const handleHeight = () => {
    let base = ACTIVITY_TIMELINE_SPACING - spacing;
    if (pre === "searching") {
      base -= 3;
    }
    if (post === "searching") {
      base -= 3;
    }

    return base;
  };

  const handleMargin = () => {
    let top = spacing / 2;
    let bottom = spacing / 2;

    if (pre === "searching") {
      top += 3;
    }
    if (post === "searching") {
      bottom += 3;
    }

    return { top, bottom };
  };

  return (
    // Animate the height from 0 to handleHeight()!
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
