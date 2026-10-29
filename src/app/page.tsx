import SceneSequence from "@/components/SceneSequence";
import PersistentSiteChrome from "@/components/ui/PersistentSiteChrome";
import ServicesIntro from "@/components/sections/ServicesIntro";
import ServicesIntro2 from "@/components/sections/ServicesIntro2";
import WorkSystemSection from "@/components/sections/WorkSystemSection";
import ContactSection from "@/components/sections/ContactSection";
import ProjectsShowcaseSection from "@/components/sections/ProjectsShowcaseSection";
import { jsonLd, organizationStructuredData } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <PersistentSiteChrome />
      <main id="main-content" className="relative">
        <h1 className="sr-only">3Mo — Creative technology, branding and digital experiences</h1>
        <SceneSequence />
        <ServicesIntro />
        <WorkSystemSection />
        <ServicesIntro2 />
        <ProjectsShowcaseSection />
        <ContactSection />
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(organizationStructuredData()) }}
      />
    </>
  );
}
