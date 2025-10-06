import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import UserStoreHydrator from "~/components/auth/UserStoreHydrator";

export const metadata: Metadata = {
  title: "Stanford Atlas",
  description:
    "Smarter Stanford course planning with real data and personalized advice.",
  themeColor: "#F8F8F8",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL("https://stanfordatlas.com"),
  openGraph: {
    title: "Stanford Atlas",
    description:
      "Smarter Stanford course planning with real data and personalized advice.",
    url: "https://stanfordatlas.com",
    siteName: "Stanford Atlas",
    images: [
      {
        url: "/thumbnail.png",
        width: 1100,
        height: 630,
        alt: "Stanford Atlas course planning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stanford Atlas",
    description:
      "Smarter Stanford course planning with real data and personalized advice.",
    images: ["/thumbnail.png"],
  },
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
