"use client";

import Icon, { IconType } from "../icons/Icon";
import CursorShimmer from "../CursorShimmer";
import { useState } from "react";
import SearchButton, { SearchButtonState } from "./components/SearchButton";
import AnimatedTextarea from "./components/AnimatedTextarea";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const iconClassName =
    query.trim().length > 0
      ? "text-primary-text transition-all duration-300"
      : "text-secondary-text-4 transition-all duration-300";

  const handleSubmit = (searchQuery: string) => {
    console.log("Search submitted:", searchQuery);
  };

  return (
    <div className="bg-primary-1 border-primary-9 mx-[16px] w-full max-w-[774px] flex-col gap-[28px] rounded-lg border-[1px] pt-[20px] pr-[14px] pb-[14px] pl-[18px] shadow-[0_15px_40px_0_rgba(0,0,0,0.06)]">
      <div className="flex flex-row items-start justify-center gap-[10px]">
        <div className="pt-[5px]">
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
          onSubmit={handleSubmit}
        />
      </div>
      {/* Spacer */}
      <div className="h-[28px] w-full" />
      <div className="flex w-full flex-row items-center justify-between">
        <CursorShimmer strength={0.5} radius={90}>
          <div className="flex origin-center transform-gpu cursor-pointer flex-row items-center justify-center gap-[10px] transition-all duration-300 hover:scale-101">
            <Icon
              type={IconType.Plus}
              width={12}
              height={12}
              className="text-secondary-text-5 block"
            />
            <p className="text-secondary-text-5 text-[15px] leading-none">
              Add your major, interests, etc
            </p>
          </div>
        </CursorShimmer>

        <SearchButton
          state={
            query.trim().length > 0
              ? SearchButtonState.Active
              : SearchButtonState.Default
          }
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default SearchBar;
