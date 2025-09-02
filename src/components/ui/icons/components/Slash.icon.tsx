import type { IconProps } from "../Icon";

export const SlashIcon = ({ width = 6, height = 14, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 6 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.5 -0.00390625L2.45312 14.0039H0.890625L3.94531 -0.00390625H5.5Z"
        fill="currentColor"
      />
    </svg>
  );
};
