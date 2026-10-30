import type { AppProps } from "next/app";
import "@/app/globals.css";
import { arabicSans, dmSans } from "@/lib/fonts";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${dmSans.variable} ${arabicSans.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
