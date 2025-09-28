import type { IconProps } from "../Icon";

export const PauseIcon = ({
  width = 12,
  height = 12,
  className,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.5"
        y="0.5"
        width="11"
        height="11"
        rx="1.5"
        fill="currentColor"
      />
    </svg>
  );
};
