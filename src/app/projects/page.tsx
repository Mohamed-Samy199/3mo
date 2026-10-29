import type { Metadata } from "next";
import ProjectsGallery from "@/components/sections/ProjectsGallery";
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
    <>
      <ProjectsGallery />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(collectionPageStructuredData(projects.map((project) => project.name))),
        }}
      />
    </>
  );
}
