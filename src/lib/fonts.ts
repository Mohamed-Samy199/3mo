import { DM_Sans, Noto_Sans_Arabic } from "next/font/google";

export const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const arabicSans = Noto_Sans_Arabic({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic-sans",
  display: "swap",
});

export const fontVariables = `${dmSans.variable} ${arabicSans.variable}`;
