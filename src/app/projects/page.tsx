import type { Metadata } from "next";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { collectionPageStructuredData, createPageMetadata, jsonLd } from "@/lib/seo";
import { projects } from "@/lib/projects";

export const metadata: Metadata = createPageMetadata({
  title: "Selected projects from 3Mo studio",
  description:
    "Explore 3Mo identities, campaigns, web experiences, content, and digital systems brought together by the 3Mo method.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <LanguageProvider locale="en" page="projects">
      <a
        href="#projects-grid"
        className="sr-only z-[200] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:bg-[#102511] focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-[#f3f0e7] focus:outline-none"
      >
        Skip to projects
      </a>
      <ProjectsGallery />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(collectionPageStructuredData(projects.map((project) => project.name), "en")),
        }}
      />
    </LanguageProvider>
  );
}
