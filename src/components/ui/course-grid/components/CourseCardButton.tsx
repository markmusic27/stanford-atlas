import CursorScale from "../../CursorScale";

interface CourseCardButtonProps {
  text: string;
  onClick?: () => void;
}

const CourseCardButton = ({ text, onClick }: CourseCardButtonProps) => {
  return (
    <CursorScale hoverScale={1.005} maxTranslate={1}>
      <div
        className="text-primary-text border-primary-7 w-full cursor-pointer items-center justify-center rounded-[14px] border-[1px] px-[10px] py-[12px] text-center text-[14px] font-[400] transition-shadow duration-300 hover:shadow-[0_2px_4px_0_rgba(0,0,0,0.05)]"
        onClick={onClick}
      >
        {text}
      </div>
    </CursorScale>
  );
};

export default CourseCardButton;
