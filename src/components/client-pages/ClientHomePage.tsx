"use client";

import { usePageTransitionStore } from "~/store/page-transition.store";
import Peripherals from "../peripherals/Peripherals";
import SearchBar from "../search-bar/SearchBar";
import Logo from "../ui/Logo";
import { TRANSITION_DURATION } from "~/lib/constants";
import { useFadeIn } from "~/hooks/useFadeIn";

const ClientHomePage = () => {
  const { opacity, transition } = useFadeIn(TRANSITION_DURATION);
  const queuedTransition = usePageTransitionStore(
    (state) => state.queuedTransition,
  );

  // Override opacity to 0 when queuedTransition is true
  const currentOpacity = queuedTransition ? 0 : opacity;

  return (
    <main
      className={`relative h-[100dvh] w-full transition-all duration-[${TRANSITION_DURATION}]`}
      style={{ opacity: currentOpacity, transition }}
    >
      {/* Chat Window */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[800px] flex-col px-[8px] md:px-[16px]">
        <div className="flex-1" />
        <Logo />
        <div className="h-[10dvh] max-h-[95px] min-h-[40px]" />
        <SearchBar
          onSubmit={(query) => {
            console.log(query);
          }}
        />
        <div className="h-[32px]" />
        <Peripherals />
        <div className="flex-2" />
      </div>
      <p className="text-secondary-text-6 absolute bottom-[36px] left-1/2 -translate-x-1/2 text-center text-[14px]">
        Courses last updated yesterday @ 11:59 PM
      </p>
    </main>
  );
};

export default ClientHomePage;
