import { useEffect, useState } from "react";

export const useFadeIn = (duration = 300) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Start the fade-in animation immediately when the component mounts
    const timer = setTimeout(() => {
      setOpacity(1);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return {
    opacity,
    transition: `opacity ${duration}ms ease-in-out`,
  };
};
