import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

const featuredProjects = projects.slice(0, 3);

export default function ProjectsShowcaseSection() {
  return (
    <section
      id="our-work"
      aria-labelledby="our-work-title"
      className="relative isolate min-h-[100svh] overflow-hidden bg-[#f3f0e7] text-[#102511]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 top-0 h-[340px] w-[460px] bg-[radial-gradient(ellipse,rgba(164,239,145,.22),transparent_70%)]" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1920px] flex-col px-5 py-7 sm:px-8 sm:py-9 lg:px-[clamp(48px,6vw,104px)] lg:py-10">
        <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-[1fr_auto] sm:gap-8">
          <div className="relative z-10">
            <p className="mb-3 font-sans text-[11px] uppercase tracking-[0.18em] text-[#58844d] sm:text-[10px]">
              OUR WORK
            </p>
            <h2
              id="our-work-title"
              className="text-[clamp(42px,6.2vw,82px)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              Ideas. Made.
              <br />
              <span className="text-[#102511]">Real impact.</span>
            </h2>
            <p className="mt-4 max-w-[530px] text-[13px] leading-[1.55] text-[#102511]/65 sm:text-sm">
              Strategy, creativity, and technology—brought together by three minds to move good ideas into the real world.
            </p>
          </div>

          <div className="relative hidden h-[150px] w-[270px] items-center justify-center sm:flex lg:h-[185px] lg:w-[330px]">
            <div aria-hidden="true" className="absolute left-[17%] top-[22%] h-2 w-2 rounded-full bg-[#71bc70]" />
            <div aria-hidden="true" className="absolute right-[12%] top-[12%] h-1.5 w-1.5 rounded-full bg-[#a4ef91]" />
            <div aria-hidden="true" className="absolute bottom-[14%] right-[22%] h-2 w-2 rounded-full bg-[#71bc70]/60" />
            <Image
              src="/projects/logo.webp"
              alt="3Mo mark"
              width={205}
              height={112}
              className="h-auto w-[460px] object-contain"
            />
          </div>
        </div>

        <div className="mt-6 grid flex-1 grid-cols-1 gap-4 border-t border-[#102511]/12 pt-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects#project-${project.id}`}
              aria-label={`View ${project.name} in all projects`}
              className="group block min-w-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315c36]"
            >
              <article className="h-full overflow-hidden border border-[#102511]/12 bg-[#f3f0e7] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_34px_rgba(16,37,17,.1)] motion-reduce:transition-none">
                <div className={`relative aspect-[1.7/1] overflow-hidden ${project.imageTone}`}>
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035] motion-reduce:transition-none"
                  />
                  <span className="absolute left-3 top-3 bg-[#f3f0e7]/90 px-2 py-1 font-sans text-[11px] tracking-[0.12em] text-[#102511]/70 backdrop-blur-sm">
                    {project.id}
                  </span>
                  <span className="absolute right-3 top-3 rounded-full bg-[#71bc70] px-2.5 py-1 font-sans text-[11px] uppercase tracking-[0.09em] text-[#102511]">
                    {project.category}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 px-3.5 py-3 sm:px-4">
                  <div className="min-w-0">
                    <h3 className="truncate text-[18px] font-semibold leading-tight tracking-[-0.035em] transition-colors group-hover:text-[#315c36]">
                      {project.name}
                    </h3>
                    <p className="mt-1 truncate font-sans text-[11px] uppercase tracking-[0.11em] text-[#102511]/50 sm:text-[11px]">
                      {project.discipline} <span className="px-1 text-[#71bc70]">/</span> {project.context}
                    </p>
                  </div>
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#102511] text-sm text-[#f3f0e7] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 border border-[#102511]/20 bg-[#71bc70] px-4 py-4 text-[#102511] sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-sm font-semibold tracking-[-0.035em]">Want to see more of our work?</p>
            <p className="mt-0.5 text-[11px] text-[#102511]/75">Explore the full collection across all our disciplines.</p>
          </div>
          <Link
            href="/projects"
            className="inline-flex min-h-11 items-center justify-center gap-5 self-start rounded-full bg-[#102511] px-4 py-2 font-sans text-[11px] uppercase tracking-[0.1em] text-[#f3f0e7] transition-colors hover:bg-[#315c36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#71bc70] sm:self-auto"
          >
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
