interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  return (
    <div
      className={`footer-gradient absolute bottom-0 flex h-[160px] w-full flex-col ${className}`}
    >
      <div className="flex-1" />
      <p className="text-secondary-text-6 w-full px-[16px] text-center text-[14px]">
        Courses last updated yesterday @ 11:59 PM
      </p>
      <div className="h-[36px]" />
    </div>
  );
};

export default Footer;
