"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { projects, projectCategories, type ProjectCategory } from "@/lib/projects";
import { useI18n } from "@/components/i18n/LanguageProvider";
import PersistentSiteChrome from "@/components/ui/PersistentSiteChrome";

const categories = ["All", ...projectCategories] as const;
type Category = "All" | ProjectCategory;

export default function ProjectsGallery() {
  const { t, href } = useI18n();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const filteredProjects = useMemo(
    () => activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory),
    [activeCategory],
  );

  const countFor = (category: Category) => category === "All"
    ? projects.length
    : projects.filter((project) => project.category === category).length;

  return (
    <main className="min-h-screen bg-[#f3f0e7] text-[#102511]">
      <PersistentSiteChrome />
      <section className="mx-auto grid max-w-[1500px] gap-12 px-5 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36 lg:grid-cols-[1.35fr_.65fr] lg:items-end lg:px-14 lg:pb-20 lg:pt-40">
        <div>
          <p className="mb-6 flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#58844d] sm:text-[10px]">
            <span className="h-2 w-2 rounded-full bg-[#71bc70]" />
            {t("3Mo / Selected work")}
          </p>
          <h1 className="max-w-[900px] text-[clamp(56px,9.4vw,142px)] font-semibold leading-[1.02] tracking-[-0.035em]">
            {t("Ideas, made")}
            <br />
            <span className="font-sans font-medium text-[#718168]">{t("tangible.")}</span>
          </h1>
          <p className="mt-8 max-w-[570px] text-[15px] leading-[1.6] text-[#102511]/65 sm:text-base">
            {t("A growing collection of identities, campaigns, web experiences, and digital systems—brought together by the 3Mo method.")}
          </p>
        </div>

        <div className="grid grid-cols-2 border-y border-[#102511]/15 py-5 lg:mb-2 lg:ml-auto lg:w-full lg:max-w-[370px]">
          <div className="pr-5">
            <span className="block font-sans text-4xl tracking-[-0.035em] sm:text-5xl">06</span>
            <span className="mt-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[#102511]/50 sm:text-[11px]">{t("Selected projects")}</span>
          </div>
          <div className="border-l border-[#102511]/15 pl-5">
            <span className="block font-sans text-4xl tracking-[-0.035em] sm:text-5xl">04</span>
            <span className="mt-2 block font-sans text-[11px] uppercase tracking-[0.14em] text-[#102511]/50 sm:text-[11px]">{t("Creative disciplines")}</span>
          </div>
        </div>
      </section>

      <section id="projects-grid" aria-label={t("Project gallery")} className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-14 lg:pb-32">
        <div className="mb-8 flex flex-col gap-5 border-b border-[#102511]/15 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-[#102511]/45">{t("Browse by discipline")}</p>
            <p aria-live="polite" className="mt-2 text-sm text-[#102511]/65">
              {t("Showing")} <span className="font-semibold text-[#102511]">{filteredProjects.length.toString().padStart(2, "0")}</span> {t("of 06 projects")}
            </p>
          </div>
          <div role="group" aria-label={t("Filter projects by discipline")} className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`inline-flex min-h-11 items-center gap-2 border px-3 py-2 font-sans text-[11px] uppercase tracking-[0.1em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#315c36] sm:text-[11px] ${
                    isActive
                      ? "border-[#102511] bg-[#102511] text-[#f3f0e7]"
                      : "border-[#102511]/15 text-[#102511]/65 hover:border-[#315c36]/60 hover:text-[#315c36]"
                  }`}
                >
                  {t(category)}
                  <span className={isActive ? "text-[#a4ef91]" : "text-[#102511]/40"}>
                    {countFor(category).toString().padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-10 md:grid-cols-12 md:gap-y-16">
          {filteredProjects.map((project) => (
            <article id={`project-${project.id}`} key={project.id} className={`group ${project.layout}`}>
              <div className={`relative isolate aspect-[1.25/1] overflow-hidden ${project.imageTone} sm:aspect-[1.4/1]`}>
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(164,239,145,.18),transparent_70%)]" />
                <Image
                  src={project.image}
                  alt={t(project.alt)}
                  fill
                  sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 60vw"
                  className="object-contain p-3 transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                />
                <span className="absolute left-4 top-4 z-10 bg-[#f3f0e7]/90 px-2.5 py-1.5 font-sans text-[11px] tracking-[0.12em] text-[#102511]/70 backdrop-blur-sm sm:left-5 sm:top-5">
                  {project.id} / 06
                </span>
                <span className="absolute right-4 top-4 z-10 border border-[#102511]/15 bg-[#71bc70] px-2.5 py-1.5 font-sans text-[11px] uppercase tracking-[0.1em] text-[#102511] sm:right-5 sm:top-5">
                  {t(project.category)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 pt-4 sm:pt-5">
                <div>
                  <h2 className="text-[clamp(23px,3vw,38px)] font-medium leading-none tracking-[-0.035em] transition-colors group-hover:text-[#315c36]">
                    {project.name}
                  </h2>
                  <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.12em] text-[#102511]/50 sm:text-[11px]">
                    {t(project.context)}
                  </p>
                </div>
                <p className="pt-1 text-right font-sans text-[11px] uppercase tracking-[0.1em] text-[#315c36] sm:text-[11px]">
                  {t(project.discipline)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-5 mb-8 bg-[#102511] px-6 py-9 text-[#f3f0e7] sm:mx-8 sm:px-10 sm:py-12 lg:mx-auto lg:mb-12 lg:w-[calc(100%-7rem)] lg:max-w-[1360px] lg:px-14 lg:py-16">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 font-sans text-[11px] uppercase tracking-[0.16em] text-[#a4ef91]">{t("Have a good idea?")}</p>
            <h2 className="max-w-[700px] text-[clamp(36px,6vw,76px)] font-medium leading-[1.02] tracking-[-0.035em]">
              {t("Let's make it")}
              <span className="font-sans text-[#a4ef91]">{t(" real.")}</span>
            </h2>
          </div>
          <Link
            href={href("/contact/")}
            className="inline-flex min-h-12 shrink-0 items-center justify-between gap-8 border border-white/25 px-4 py-3 font-sans text-[11px] uppercase tracking-[0.13em] transition-colors hover:border-[#a4ef91] hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a4ef91]"
          >
            {t("Start a conversation")} <span aria-hidden="true" className="text-[#a4ef91]">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
