import "~/styles/globals.css";
import NextTopLoader from "nextjs-toploader";
import { type Metadata, type Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "~/components/ui/sonner";
import UserStoreHydrator from "~/components/auth/UserStoreHydrator";
import { ThemeProvider } from "next-themes";
import { ThemeColor } from "~/components/ThemeColor";

export const viewport: Viewport = {
  themeColor: "#F8F8F8",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Stanford Atlas",
  description:
    "Smarter Stanford course planning with real data and personalized advice.",
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
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="font-default bg-primary-2">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeColor />
          <UserStoreHydrator />
          <NextTopLoader zIndex={1000} showSpinner={false} />
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
