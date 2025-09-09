import type { IconProps } from "../Icon";

export const ChevronIcon = ({
  width = 12,
  height = 14,
  className,
}: IconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 9"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.298828 7.19824L6.9873 0.360352C7.21582 0.114258 7.48828 0 7.7959 0C8.10352 0 8.38477 0.123047 8.61328 0.360352L15.293 7.19824C15.4863 7.3916 15.5918 7.6377 15.5918 7.92773C15.5918 8.5166 15.1348 8.97363 14.5547 8.97363C14.2734 8.97363 14.001 8.86816 13.7988 8.65723L7.80469 2.49609L1.79297 8.65723C1.59961 8.85938 1.32715 8.97363 1.03711 8.97363C0.457031 8.97363 0 8.5166 0 7.92773C0 7.64648 0.105469 7.3916 0.298828 7.19824Z"
        fill="currentColor"
      />
    </svg>
  );
};
