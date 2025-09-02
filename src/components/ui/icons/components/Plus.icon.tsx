import type { IconProps } from "../Icon";

export const PlusIcon = ({ width = 12, height = 12, className }: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.816229 6.81623H5.18377V11.1838C5.18377 11.6277 5.54893 12 6 12C6.45107 12 6.81623 11.6277 6.81623 11.1838V6.81623H11.1838C11.6277 6.81623 12 6.45107 12 6C12 5.54893 11.6277 5.18377 11.1838 5.18377H6.81623V0.816229C6.81623 0.372315 6.45107 0 6 0C5.54893 0 5.18377 0.372315 5.18377 0.816229V5.18377H0.816229C0.372315 5.18377 0 5.54893 0 6C0 6.45107 0.372315 6.81623 0.816229 6.81623Z"
        fill="currentColor"
      />
    </svg>
  );
};
