import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
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
    <LanguageProvider locale="en" page="contact">
      <a
        href="#main-content"
        className="sr-only z-[200] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-[#102511] focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-[#f3f0e7] focus:outline-none"
      >
        Skip to content
      </a>
      <PersistentSiteChrome />
      <main id="main-content" className="min-h-screen bg-[#f3f0e7] pt-24 text-[#102511] sm:pt-28">
        <h1 className="sr-only">Start a project with 3Mo</h1>
        <p className="sr-only">
          Tell us about your next brand, campaign, web experience, or digital system.
        </p>
        <ContactSection />
      </main>
    </LanguageProvider>
  );
}
