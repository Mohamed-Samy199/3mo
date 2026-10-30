import type { GetStaticProps } from "next";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import LocalizedPageHead from "@/components/i18n/LocalizedPageHead";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { collectionPageStructuredData, jsonLd } from "@/lib/seo";
import { projects } from "@/lib/projects";

export default function ArabicProjectsPage() {
  return (
    <LanguageProvider locale="ar" page="projects">
      <LocalizedPageHead
        locale="ar"
        path="/ar/projects/"
        title="مشاريع مختارة من استوديو 3Mo"
        description="استكشف هويات 3Mo وحملاته وتجارب الويب والمحتوى والأنظمة الرقمية التي تجمعها طريقتنا."
      />
      <a
        href="#projects-grid"
        className="sr-only z-[200] focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:bg-[#102511] focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-[#f3f0e7] focus:outline-none"
      >
        انتقل إلى المشاريع
      </a>
      <ProjectsGallery />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(collectionPageStructuredData(projects.map((project) => project.name), "ar")),
        }}
      />
    </LanguageProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
