import Icon, { IconType } from "../../icons/Icon";

enum SearchButtonState {
  Default,
  Generating,
  Active,
}

interface SearchButtonProps {
  state: SearchButtonState;
  onClick: () => void;
}

const SearchButton = ({ state, onClick }: SearchButtonProps) => {
  const baseIconClasses = "transition-all duration-150";
  const iconColorClass =
    state === SearchButtonState.Default ? "text-primary-8" : "text-primary-1";
  const backgroundClass =
    state === SearchButtonState.Default
      ? "bg-primary-6"
      : "bg-primary-accent hover:scale-103";

  return (
    <div
      className={`${backgroundClass} flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full transition-all duration-300`}
      onClick={onClick}
    >
      <Icon
        type={IconType.ArrowUp}
        width={14}
        height={14}
        className={`${baseIconClasses} ${iconColorClass}`}
      />
    </div>
  );
};

export default SearchButton;
export { SearchButtonState };
