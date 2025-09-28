"use client";

import Icon, { IconType } from "../ui/icons/Icon";
import CursorShimmer from "../ui/CursorShimmer";
import { useEffect, useState } from "react";
import SearchButton, { SearchButtonState } from "./components/SearchButton";
import AnimatedTextarea from "./components/AnimatedTextarea";
import { usePageTransitionStore } from "~/store/pageTransition.store";
import { useRouter } from "next/navigation";
import { TRANSITION_DURATION } from "~/lib/constants";
import AnimatedCollapsable from "../ui/AnimatedCollapsable";
import { useChatStore } from "~/store/chat.store";

interface SearchBarProps {
  onSubmit: (query: string) => void;
  isChatOpen: boolean;
}

const SearchBar = ({ onSubmit, isChatOpen }: SearchBarProps) => {
  const enqueue = usePageTransitionStore((state) => state.enqueue);
  const dequeue = usePageTransitionStore((state) => state.dequeue);
  const router = useRouter();
  const { isStreaming } = useChatStore();

  useEffect(() => {
    dequeue();
  }, [dequeue]);

  // Framer Motion will handle mount/unmount animations for the shimmer row
  const [query, setQuery] = useState("");
  const iconClassName =
    query.trim().length > 0
      ? "text-primary-text transition-all duration-300"
      : "text-secondary-text-4 transition-all duration-300";

  return (
    <form
      action={() => {
        onSubmit(query);

        if (!isStreaming) {
          setQuery("");
        }
      }}
      className={`bg-primary-1 border-primary-9 flex w-full flex-row rounded-[24px] border-[1px] shadow-[0_15px_40px_0_rgba(0,0,0,0.06)]`}
      style={{
        transition: "padding 300ms ease-in-out",
        paddingTop: isChatOpen ? "12px" : "20px",
        paddingRight: isChatOpen ? "14px" : "14px",
        paddingBottom: isChatOpen ? "8px" : "14px",
        paddingLeft: isChatOpen ? "20px" : "18px",
      }}
    >
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-row items-start justify-center">
          <div
            className={`mr-[10px] pt-[5px] ${isChatOpen ? "hidden" : "block"}`}
          >
            <Icon
              type={IconType.MagnifyingGlass}
              width={14}
              height={14}
              className={iconClassName}
            />
          </div>
          <AnimatedTextarea
            value={query}
            onChange={setQuery}
            name="query"
            isChatOpen={isChatOpen}
          />
        </div>
        <AnimatedCollapsable isOpen={!isChatOpen} duration={300}>
          <div className="h-[34px]" />
          <CursorShimmer
            strength={0.5}
            radius={90}
            className="w-fit self-start pb-[6px]"
          >
            <div
              onClick={async () => {
                enqueue();
                await new Promise((resolve) =>
                  setTimeout(resolve, TRANSITION_DURATION),
                );
                router.push("/personalize");
                await new Promise((resolve) =>
                  setTimeout(resolve, 3 * TRANSITION_DURATION),
                );
                dequeue();
              }}
              className="flex origin-center transform-gpu cursor-pointer flex-row items-center justify-start gap-[10px] transition-all duration-300 hover:scale-101"
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
        </AnimatedCollapsable>
      </div>
      <div
        className={`flex flex-none items-end ${isChatOpen ? "pb-[4px] pl-[10px]" : "pb-[0px] pl-[0px]"}`}
      >
        <SearchButton
          state={
            isStreaming
              ? SearchButtonState.Generating
              : query.trim().length > 0
                ? SearchButtonState.Active
                : SearchButtonState.Default
          }
        />
      </div>
    </form>
  );
};

export default SearchBar;
