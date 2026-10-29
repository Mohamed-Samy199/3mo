import Link from "next/link";
import type { Metadata } from "next";
import PersistentSiteChrome from "@/components/ui/PersistentSiteChrome";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page not found — 3Mo",
  description:
    "The 3Mo page you requested could not be found. Return to the home page to continue exploring the studio.",
  indexable: false,
});

export default function NotFound() {
  return (
    <>
      <PersistentSiteChrome />
      <main className="flex min-h-screen items-center bg-[#102511] px-6 py-24 text-[#f3f0e7] sm:px-10 lg:px-20">
        <div className="max-w-2xl">
          <p className="mb-6 font-sans text-[10px] uppercase tracking-[0.18em] text-[#a4ef91]">
            404 / Signal lost
          </p>
          <h1 className="text-[clamp(52px,9vw,128px)] font-semibold leading-[0.86] tracking-[-0.035em]">
            This page isn&apos;t here.
          </h1>
          <p className="mt-8 max-w-md text-base leading-relaxed text-[#f3f0e7]/70">
            The link may have moved. Find your way back to the 3Mo starting point.
          </p>
          <Link
            href="/"
            className="mt-10 inline-flex min-h-11 items-center gap-4 bg-[#a4ef91] px-5 py-3 font-sans text-[10px] uppercase tracking-[0.15em] text-[#102511] transition-colors hover:bg-[#f3f0e7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4ef91]"
          >
            Back to home <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </main>
    </>
  );
}
