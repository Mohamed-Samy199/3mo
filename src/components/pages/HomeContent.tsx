"use client";

import SceneSequence from "@/components/SceneSequence";
import PersistentSiteChrome from "@/components/ui/PersistentSiteChrome";
import ServicesIntro from "@/components/sections/ServicesIntro";
import ServicesIntro2 from "@/components/sections/ServicesIntro2";
import WorkSystemSection from "@/components/sections/WorkSystemSection";
import ContactSection from "@/components/sections/ContactSection";
import ProjectsShowcaseSection from "@/components/sections/ProjectsShowcaseSection";
import { jsonLd, organizationStructuredData } from "@/lib/seo";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function HomeContent() {
  const { t, locale } = useI18n();
  return (
    <>
      <a href="#main-content" className="sr-only z-[200] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-[#102511] focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-[#f3f0e7] focus:outline-none">{t("Skip to content")}</a>
      <PersistentSiteChrome />
      <main id="main-content" className="relative">
        <h1 className="sr-only">{t("3Mo — Creative technology, branding and digital experiences")}</h1>
        <SceneSequence />
        <ServicesIntro />
        <WorkSystemSection />
        <ServicesIntro2 />
        <ProjectsShowcaseSection />
        <ContactSection />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationStructuredData(locale)) }} />
    </>
  );
}
