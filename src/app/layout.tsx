import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import UserStoreHydrator from "~/components/auth/UserStoreHydrator";

export const metadata: Metadata = {
  title: "Stanford Atlas",
  description: "Add description here", // TODO: Add description here
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="font-default bg-primary-2">
        <UserStoreHydrator />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
