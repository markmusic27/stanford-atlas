"use client";

import { usePageTransitionStore } from "~/store/page-transition.store";
import Peripherals from "../peripherals/Peripherals";
import SearchBar from "../search-bar/SearchBar";
import Logo from "../ui/Logo";
import { TRANSITION_DURATION } from "~/lib/constants";
import { useFadeIn } from "~/hooks/useFadeIn";
import { useEffect, useState, useRef } from "react";

const ClientHomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined,
  );

  const [searchHeight, setSearchHeight] = useState<number | undefined>(
    undefined,
  );
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSize = () => {
      if (searchRef.current) {
        setSearchHeight(searchRef.current.offsetHeight);
      }
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };

    // Set initial height
    updateWindowHeight();

    // Add event listener
    window.addEventListener("resize", updateWindowHeight);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);

  const computeSpacing = () => {
    const scale = 2;
    if (windowHeight === undefined || searchHeight === undefined) {
      console.log("H or h is undefined");
      return 0;
    }

    if (isChatOpen) {
      return 300;
    }

    return (windowHeight - searchHeight) / (scale + 1);
  };

  // Transition state
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
      <div
        ref={searchRef}
        className={`relative z-10 mx-auto flex w-full max-w-[800px] flex-col px-[8px] md:px-[16px]`}
        style={{
          top: computeSpacing(),
        }}
      >
        <Logo />
        <div className="h-[10dvh] max-h-[95px] min-h-[40px]" />
        <SearchBar
          onSubmit={(query) => {
            console.log(query);
          }}
          isChatOpen={isChatOpen}
        />
        <div className="h-[32px]" />
        <Peripherals />
      </div>

      <p className="text-secondary-text-6 absolute bottom-[36px] left-1/2 -translate-x-1/2 text-center text-[14px]">
        Courses last updated yesterday @ 11:59 PM
      </p>
    </main>
  );
};

export default ClientHomePage;
