import CursorScale from "./CursorScale";
import { Loader } from "./shadcn-io/ai/loader";

interface SaveButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

const SaveButton = ({ text, className, onClick, loading }: SaveButtonProps) => {
  return (
    <CursorScale hoverScale={1.02} maxTranslate={2} className={className}>
      <div
        className={`bg-primary-1 border-primary-9 ${loading ? "cursor-default" : "cursor-pointer"} rounded-[16px] border-[1] px-[20px] py-[14px] shadow-[0_4px_10px_0_rgba(0,0,0,0.03)]`}
        onClick={() => {
          if (loading) return;
          onClick?.();
        }}
      >
        {loading ? (
          <Loader size={18} className="text-primary-accent mt-[6px]" />
        ) : (
          <p className="text-secondary-text-2 text-[16px]">{text}</p>
        )}
      </div>
    </CursorScale>
  );
};

export default SaveButton;
