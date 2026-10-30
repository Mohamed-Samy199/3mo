import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = createPageMetadata({
  title: "3Mo — Creative technology for ideas in motion",
  description:
    "3Mo is a creative technology studio shaping brands, digital experiences, and systems for ideas in motion.",
  path: "/",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" dir="ltr">
      <body className={fontVariables}>{children}</body>
    </html>
  );
}
