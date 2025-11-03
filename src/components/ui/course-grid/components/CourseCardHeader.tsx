interface CourseCardHeaderProps {
  subjectCode: string;
  termLabel: string;
}

const CourseCardHeader = ({
  subjectCode,
  termLabel,
}: CourseCardHeaderProps) => {
  return (
    <div className="bg-primary-2 dark:bg-primary-4 relative flex flex-row items-center justify-between px-[16px] pt-[20px] pb-[14px]">
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 left-0 h-[1px] w-full"
        width="100%"
        height="1"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100%"
          y2="0.5"
          stroke="var(--color-primary-10)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 3"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <p className="text-primary-text font-mono text-[16px] font-[400]">
        {subjectCode}
      </p>
      <p className="text-secondary-text-3 font-mono text-[16px] font-[400]">
        {termLabel}
      </p>
    </div>
  );
};

export default CourseCardHeader;
