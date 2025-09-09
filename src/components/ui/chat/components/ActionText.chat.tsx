import { ACTIVITY_TIMELINE_SPACING } from "~/lib/constants";

interface ActionTextProps {
  text: string;
  i: number;
}

const ActionText = ({ text, i }: ActionTextProps) => {
  return (
    <p
      className="text-secondary-text-2 text-[14px] font-[400]"
      style={{ marginTop: i == 0 ? "0px" : `${ACTIVITY_TIMELINE_SPACING}px` }}
    >
      {text}
    </p>
  );
};

export default ActionText;
