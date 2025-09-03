import CursorScale from "../CursorScale";
import CursorShimmer from "../CursorShimmer";

interface CardProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: () => void;
  className?: string;
}

const Card = ({ title, description, onToggle, className }: CardProps) => {
  return (
    <CursorScale hoverScale={1.01} maxTranslate={3}>
      <CursorShimmer strength={0.6} radius={150}>
        <div
          className={`bg-primary-4 flex flex-row justify-between rounded-[16px] px-[18px] py-[20px] ${className}`}
        >
          <div className="flex max-w-[440px] flex-1 flex-col gap-[6px]">
            <p className="text-primary-text cursor-default text-[16px]">
              {title}
            </p>
            <p className="text-secondary-text-2 cursor-default text-[14px]">
              {description}
            </p>
          </div>
        </div>
      </CursorShimmer>
    </CursorScale>
  );
};

export default Card;
