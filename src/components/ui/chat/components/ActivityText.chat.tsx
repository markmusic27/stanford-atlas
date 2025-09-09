import { ACTIVITY_TIMELINE_SPACING } from "~/lib/constants";

interface ActivityTextProps {
  text: string;
  i: number;
}

const ActivityText = ({ text, i }: ActivityTextProps) => {
  return (
    <p
      className="text-secondary-text-2 text-[14px] font-[400]"
      style={{ marginTop: i == 0 ? "0px" : `${ACTIVITY_TIMELINE_SPACING}px` }}
    >
      {text}
    </p>
  );
};

export default ActivityText;
