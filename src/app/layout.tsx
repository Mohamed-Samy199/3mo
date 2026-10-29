import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { createPageMetadata } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = createPageMetadata({
  title: "3Mo — Creative technology for ideas in motion",
  description:
    "3Mo is a creative technology studio shaping brands, digital experiences, and systems for ideas in motion.",
  path: "/",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={dmSans.variable}>{children}</body>
    </html>
  );
}
