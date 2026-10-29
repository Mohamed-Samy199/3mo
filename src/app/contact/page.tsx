import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import PersistentSiteChrome from "@/components/ui/PersistentSiteChrome";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Start a project with 3Mo studio",
  description:
    "Tell 3Mo about your next brand, campaign, web experience, or digital system and start a focused conversation.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PersistentSiteChrome />
      <main id="main-content" className="min-h-screen bg-[#f3f0e7] text-[#102511]">
        <h1 className="sr-only">Start a project with 3Mo</h1>
        <p className="sr-only">
          Tell us about your next brand, campaign, web experience, or digital system.
        </p>
        <ContactSection />
      </main>
    </>
  );
}
