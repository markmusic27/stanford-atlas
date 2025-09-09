import { useEffect, useState } from "react";

export const useViewportHeight = () => {
  const [vh, setVh] = useState<number | null>(null);
  useEffect(() => {
    const read = () =>
      setVh(window.visualViewport?.height ?? window.innerHeight);
    read();
    window.addEventListener("resize", read);
    window.visualViewport?.addEventListener("resize", read);
    return () => {
      window.removeEventListener("resize", read);
      window.visualViewport?.removeEventListener("resize", read);
    };
  }, []);
  return vh;
};
