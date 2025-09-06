import Link from "next/link";
import CursorScale from "./CursorScale";

interface SaveButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const SaveButton = ({ text, className, onClick }: SaveButtonProps) => {
  return (
    <CursorScale hoverScale={1.02} maxTranslate={2} className={className}>
      <div
        className={`bg-primary-1 border-primary-9 text-secondary-text-2 cursor-pointer rounded-[16px] border-[1] px-[20px] py-[14px] text-[16px] shadow-[0_4px_10px_0_rgba(0,0,0,0.03)]`}
        onClick={onClick}
      >
        {text}
      </div>
    </CursorScale>
  );
};

export default SaveButton;
