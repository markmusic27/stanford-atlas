"use client";

import { usePageTransitionStore } from "~/store/pageTransition.store";
import Peripherals from "../peripherals/Peripherals";
import SearchBar from "../search-bar/SearchBar";
import Logo from "../ui/Logo";
import { TRANSITION_DURATION } from "~/lib/constants";
import { useFadeIn } from "~/hooks/useFadeIn";
import { useEffect, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";
import Footer from "../footer/Footer";
import AnimatedCollapsable from "../ui/AnimatedCollapsable";
import Chat from "../chat/Chat";
import { useViewportWidth } from "~/hooks/useViewportWidth";
import { useChatStore } from "~/store/chat.store";
import { useStreamContent } from "~/hooks/useStreamContent";

const ClientHomePage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(
    undefined,
  );

  const [searchHeight, setSearchHeight] = useState<number | undefined>(
    undefined,
  );
  const searchRef = useRef<HTMLDivElement>(null);
  const vw = useViewportWidth();
  const { isStreaming } = useChatStore();
  const { stream, stop } = useStreamContent();

  const handleOnSubmit = async (query: string) => {
    if (isStreaming) return;
    setIsChatOpen(true);

    const trimmed = query.trim();
    if (!trimmed) return;

    // Intentionally fire-and-forget; stream manages its own errors/state
    void stream(trimmed);
  };

  useEffect(() => {
    let rafId: number | null = null;
    const updateSize = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (searchRef.current) {
          const next = searchRef.current.offsetHeight;
          setSearchHeight((prev) => (prev === next ? prev : next));
        }
      });
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // Observe search container height changes (e.g., textarea growth) to keep bottom alignment accurate
  useEffect(() => {
    const el = searchRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      const next = el.offsetHeight;
      setSearchHeight((prev) => (prev === next ? prev : next));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Animate Logo collapse/expand while also removing it from layout when collapsed

  useEffect(() => {
    let rafId: number | null = null;
    const updateWindowHeight = () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const next = window.innerHeight;
        setWindowHeight((prev) => (prev === next ? prev : next));
      });
    };

    // Set initial height
    updateWindowHeight();

    // Add event listener
    window.addEventListener("resize", updateWindowHeight);

    // Cleanup event listener on unmount
    return () => {
      if (rafId != null) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateWindowHeight);
    };
  }, []);

  const computeSpacing = () => {
    if (windowHeight === undefined || searchHeight === undefined) {
      return 0;
    }

    if (isChatOpen) {
      const bottomGap = vw != null && vw > 630 ? 60 : 40;
      return Math.max(0, windowHeight - searchHeight - bottomGap);
    }

    const scale = 2;
    return (windowHeight - searchHeight) / (scale + 1);
  };

  const spacing = useMemo(
    () => computeSpacing(),
    [windowHeight, searchHeight, isChatOpen, vw],
  );

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
        className="transition-[opacity] delay-350 duration-300 ease-in-out"
        style={{ opacity: isChatOpen ? 1 : 0 }}
      >
        <Chat />
      </div>

      {/* Search Container */}
      <motion.div
        ref={searchRef}
        className={`relative z-2 mx-auto flex w-full max-w-[800px] flex-col px-[16px] will-change-transform`}
        initial={false}
        animate={{ y: spacing }}
        transition={{ duration: 0.3, ease: [0, 0, 0.1, 1] }}
      >
        <AnimatedCollapsable isOpen={!isChatOpen}>
          <Logo />
          <div className="h-[10dvh] max-h-[95px] min-h-[40px]" />
        </AnimatedCollapsable>

        <SearchBar
          onSubmit={handleOnSubmit}
          onStop={stop}
          isChatOpen={isChatOpen}
        />
        <AnimatedCollapsable isOpen={!isChatOpen}>
          <div className="h-[36px]" />
          <Peripherals />
        </AnimatedCollapsable>
      </motion.div>

      <Footer className="z-1" isChatOpen={isChatOpen} />
    </main>
  );
};

export default ClientHomePage;
