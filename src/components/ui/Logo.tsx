interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <img
      src="/brand/logo.svg"
      alt="logo"
      className={`mx-auto h-[40px] transition-all duration-300 hover:scale-[1.01] ${className}`}
    />
  );
};

export default Logo;
