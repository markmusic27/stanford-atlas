"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeColor() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    const color = resolvedTheme === "dark" ? "#111111" : "#F8F8F8";

    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", color);
    }
  }, [resolvedTheme, mounted]);

  return null;
}
