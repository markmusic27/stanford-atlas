import Icon, { IconType } from "../../ui/icons/Icon";

enum SearchButtonState {
  Default,
  Generating,
  Active,
}

interface SearchButtonProps {
  state: SearchButtonState;
  onStop?: () => void;
}

const SearchButton = ({ state, onStop }: SearchButtonProps) => {
  const baseIconClasses = "transition-all duration-150";
  const iconColorClass =
    state === SearchButtonState.Default ? "text-primary-8" : "text-primary-1";
  const backgroundClass =
    state === SearchButtonState.Default
      ? "bg-primary-6 dark:bg-[#373737]"
      : "bg-primary-accent hover:scale-103";

  const disabled = state === SearchButtonState.Default;

  return (
    <button
      type={state === SearchButtonState.Generating ? "button" : "submit"}
      disabled={disabled}
      className={`${backgroundClass} flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full transition-all duration-300`}
      onClick={() => {
        if (state === SearchButtonState.Generating) {
          onStop?.();
        }
      }}
    >
      <Icon
        type={
          state == SearchButtonState.Generating
            ? IconType.Pause
            : IconType.ArrowUp
        }
        width={state == SearchButtonState.Generating ? 11 : 14}
        height={state == SearchButtonState.Generating ? 11 : 14}
        className={`${baseIconClasses} ${iconColorClass}`}
      />
    </button>
  );
};

export default SearchButton;
export { SearchButtonState };
