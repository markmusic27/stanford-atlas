"use client";

import Icon, { IconType } from "../icons/Icon";
import CursorShimmer from "../CursorShimmer";
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const iconClassName =
    query.trim().length > 0
      ? "text-primary-text transition-all duration-300"
      : "text-secondary-text-4 transition-all duration-300";

  return (
    <div className="bg-primary-1 border-primary-9 mx-[8px] w-full max-w-[774px] flex-col gap-[28px] rounded-lg border-[1px] pt-[20px] pr-[14px] pb-[14px] pl-[18px] shadow-[0_15px_40px_0_rgba(0,0,0,0.06)]">
      <div className="flex flex-row items-center justify-center gap-[10px]">
        <Icon
          type={IconType.MagnifyingGlass}
          width={14}
          height={14}
          className={iconClassName}
        />
        <input
          type="text"
          placeholder="Find a 4 unit robotics course from 11 to 3pm on Thursdays"
          className="text-primary-text placeholder-secondary-text-4 caret-text-cursor w-full text-[16px] outline-none"
          autoComplete="off"
          aria-label="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

        <div className="h-[28px] w-[28px] bg-amber-600" />
      </div>
    </div>
  );
};

export default SearchBar;
