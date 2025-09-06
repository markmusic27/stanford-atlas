"use client";

import Icon, { IconType } from "../ui/icons/Icon";
import CursorShimmer from "../ui/CursorShimmer";
import { useEffect, useState } from "react";
import SearchButton, { SearchButtonState } from "./components/SearchButton";
import AnimatedTextarea from "./components/AnimatedTextarea";
import { usePageTransitionStore } from "~/store/page-transition.store";
import { useRouter } from "next/navigation";
import { TRANSITION_DURATION } from "~/lib/constants";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  isChatOpen: boolean;
}

const SearchBar = ({ onSubmit, isChatOpen }: SearchBarProps) => {
  const enqueue = usePageTransitionStore((state) => state.enqueue);
  const dequeue = usePageTransitionStore((state) => state.dequeue);
  const router = useRouter();

  useEffect(() => {
    dequeue();
  }, [dequeue]);
  const [query, setQuery] = useState("");
  const iconClassName =
    query.trim().length > 0
      ? "text-primary-text transition-all duration-300"
      : "text-secondary-text-4 transition-all duration-300";

  return (
    <form
      action={() => onSubmit(query)}
      className="bg-primary-1 border-primary-9 w-full flex-col gap-[28px] rounded-[24px] border-[1px] pt-[20px] pr-[14px] pb-[14px] pl-[18px] shadow-[0_15px_40px_0_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-row items-start justify-center gap-[10px]">
        <div className="pt-[5px]">
          <Icon
            type={IconType.MagnifyingGlass}
            width={14}
            height={14}
            className={iconClassName}
          />
        </div>
        <AnimatedTextarea value={query} onChange={setQuery} name="query" />
      </div>
      {/* Spacer */}
      <div className="h-[28px] w-full" />
      <div className="flex w-full flex-row items-center justify-between">
        <CursorShimmer strength={0.5} radius={90}>
          <div
            onClick={async () => {
              enqueue();
              await new Promise((resolve) =>
                setTimeout(resolve, TRANSITION_DURATION),
              );
              router.push("/personalize");
              await new Promise((resolve) => setTimeout(resolve, 50));
              dequeue();
            }}
            className="flex origin-center transform-gpu cursor-pointer flex-row items-center justify-center gap-[10px] transition-all duration-300 hover:scale-101"
          >
            <Icon
              type={IconType.Plus}
              width={12}
              height={12}
              className="text-secondary-text-5 block"
            />
            <p className="text-secondary-text-5 text-[15px] leading-none">
              Add your major, interests, etc.
            </p>
          </div>
        </CursorShimmer>

        <SearchButton
          state={
            query.trim().length > 0
              ? SearchButtonState.Active
              : SearchButtonState.Default
          }
        />
      </div>
    </form>
  );
};

export default SearchBar;
