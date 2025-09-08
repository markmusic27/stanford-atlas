interface FooterProps {
  className?: string;
  isChatOpen?: boolean;
  children?: React.ReactNode;
}

const Footer = ({ className, children, isChatOpen }: FooterProps) => {
  return (
    <div
      className={`footer-gradient absolute bottom-0 flex h-[160px] w-full flex-col ${className}`}
    >
      {children}
      <div className="flex-1" />
      <p className="text-secondary-text-6 w-full px-[16px] text-center text-[14px]">
        {isChatOpen
          ? "Atlas can make mistakes. Check important info."
          : "Courses last updated yesterday @ 11:59 PM"}
      </p>
      <div
        className={`${isChatOpen ? "h-[25px]" : "h-[36px]"} transition-all duration-300`}
      />
    </div>
  );
};

export default Footer;
