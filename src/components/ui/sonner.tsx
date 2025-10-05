"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--color-primary-1)",
          "--normal-text": "var(--color-primary-text)",
          "--normal-border": "var(--color-primary-9)",
          "--border-radius": "16px",
        } as React.CSSProperties
      }
      toastOptions={{
        style: {
          boxShadow: "0 6px 18px 0 rgba(0,0,0,0.04)",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
