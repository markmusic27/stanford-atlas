import { useViewportWidth } from "~/hooks/useViewportWidth";
import { FOOTER_HEIGHT } from "~/lib/constants";

interface FooterProps {
  className?: string;
  isChatOpen?: boolean;
}

const Footer = ({ className, isChatOpen }: FooterProps) => {
  const vw = useViewportWidth();
  return (
    <div
      className={`footer-gradient absolute bottom-0 left-1/2 mx-auto flex -translate-x-1/2 flex-col ${className}`}
      style={{
        width: vw ? vw - 32 : "100%",
        height: FOOTER_HEIGHT,
      }}
    >
      <div className="flex-1" />
      <p className="text-secondary-text-6 w-full px-[16px] text-center text-[14px]">
        {"Atlas can make mistakes. Check important info."}
      </p>
      <div
        className={`${isChatOpen ? "h-[12px] sm:h-[25px]" : "h-[36px]"} transition-all duration-300`}
      />
    </div>
  );
};

export default Footer;
