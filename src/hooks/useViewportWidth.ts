import { useEffect, useState } from "react";

export const useViewportWidth = () => {
  const [vw, setVw] = useState<number | null>(null);
  useEffect(() => {
    const read = () => setVw(window.visualViewport?.width ?? window.innerWidth);
    read();
    window.addEventListener("resize", read);
    window.visualViewport?.addEventListener("resize", read);
    return () => {
      window.removeEventListener("resize", read);
      window.visualViewport?.removeEventListener("resize", read);
    };
  }, []);
  return vw;
};
