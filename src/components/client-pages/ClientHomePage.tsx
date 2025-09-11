"use client";

import { usePageTransitionStore } from "~/store/page-transition.store";
import Peripherals from "../peripherals/Peripherals";
import SearchBar from "../search-bar/SearchBar";
import Logo from "../ui/Logo";
import { BAR_HEIGHT, SPACING, TRANSITION_DURATION } from "~/lib/constants";
import { useFadeIn } from "~/hooks/useFadeIn";
import { useEffect, useState, useRef } from "react";
import Footer from "../footer/Footer";
import AnimatedCollapsable from "../ui/AnimatedCollapsable";
import { CustomSwitch } from "../ui/CustomSwitch";
import Chat from "../chat/Chat";
import { useViewportWidth } from "~/hooks/useViewportWidth";

const ClientHomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined,
  );

  const [searchHeight, setSearchHeight] = useState<number | undefined>(
    undefined,
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const vw = useViewportWidth();

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

  // Animate Logo collapse/expand while also removing it from layout when collapsed

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
      return 0;
    }

    if (isChatOpen) {
      let minimizer = 0;

      if (vw && vw < 630) {
        minimizer = 16;
      }
      return windowHeight - (BAR_HEIGHT + SPACING) + minimizer;
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
      {/* Chat Container */}
      <div
        className="transition-[opacity] duration-300"
        style={{ opacity: isChatOpen ? 1 : 0 }}
      >
        <Chat />
      </div>

      {/* Search Container */}
      <div
        ref={searchRef}
        className={`relative z-2 mx-auto flex w-full max-w-[800px] flex-col px-[16px] transition-[top] duration-500 ease-in-out`}
        style={{
          top: computeSpacing(),
        }}
      >
        <AnimatedCollapsable isOpen={!isChatOpen}>
          <Logo />
          <div className="h-[10dvh] max-h-[95px] min-h-[40px]" />
        </AnimatedCollapsable>

        <SearchBar
          onSubmit={(query) => {
            console.log(query);
          }}
          isChatOpen={isChatOpen}
        />
        <AnimatedCollapsable isOpen={!isChatOpen}>
          <div className="h-[36px]" />
          <Peripherals />
        </AnimatedCollapsable>
      </div>

      <Footer className="z-1" isChatOpen={isChatOpen} />
    </main>
  );
};

export default ClientHomePage;
