import type { Metadata } from "next";
import { Manrope, Newsreader, Noto_Sans_Devanagari } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap"
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vidhisatya.com"),
  title: {
    default: "Vidhi Satya | Premium Business Advisory",
    template: "%s | Vidhi Satya"
  },
  description:
    "Vidhi Satya is a strategic advisory partner for individuals, corporates, and government institutions.",
  openGraph: {
    title: "Vidhi Satya",
    description: "Premium business advisory with practical, ethical execution.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} ${newsreader.variable} ${notoDevanagari.variable} font-[family-name:var(--font-manrope)]`}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
