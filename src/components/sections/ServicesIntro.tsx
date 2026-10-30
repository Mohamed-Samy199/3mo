"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useI18n } from "@/components/i18n/LanguageProvider";

const aboutLinks = [
  {
    label: "OUR APPROACH",
    href: "/contact?topic=about",
  },
  {
    label: "LET'S TALK",
    href: "/contact",
    arrow: true,
  },
];

export default function ServicesIntro() {
  const { t, href, isRTL } = useI18n();
  const sectionRef = useRef<HTMLElement | null>(null);
  const armRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const arm = armRef.current;
    if (!section || !arm) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      arm.dataset.inView = "reduced";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        arm.dataset.inView = entry.isIntersecting ? "true" : "false";
      },
      { threshold: 0.65 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-title"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#f3f0e7] text-[#102511]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_48%,rgba(164,239,145,.34),transparent_48%)]"
      />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1800px] items-center px-6 pb-[39svh] pt-28 sm:px-10 md:px-[clamp(48px,7vw,112px)] md:py-24">
        <div className="relative z-10 w-full max-w-[590px] md:w-[48%]">
          <p className="mb-6 flex items-center gap-3 font-sans text-[11px] font-medium uppercase tracking-[0.18em] text-[#58844d] sm:text-xs">
            <span>{t("ABOUT US")}</span>
            <span aria-hidden="true" className="h-px w-16 bg-[#71bc70]" />
          </p>

          <h2
            id="about-title"
            className="max-w-[620px] text-[clamp(42px,5.4vw,82px)] font-semibold leading-[0.94] tracking-[-0.035em]"
          >
            {t("A creative team.")}
            <br />
            <span className="font-sans font-medium text-[#315c36]">
              {t("Built to move you.")}
            </span>
          </h2>

          <p className="mt-7 max-w-[470px] text-[15px] leading-[1.55] text-[#102511]/70 sm:text-lg">
            {t("We bring strategy, creativity, and technology together to create meaningful digital experiences and help ambitious brands move forward.")}
          </p>

          <nav
            aria-label={t("Learn about 3Mo")}
            className="mt-8 flex flex-wrap gap-3"
          >
            {aboutLinks.map(({ label, href: linkHref, arrow }) => (
              <a
                key={label}
                href={href(linkHref)}
                className="inline-flex min-h-11 items-center gap-2 border border-[#315c36]/45 px-4 py-3 font-sans text-[11px] font-medium tracking-[0.12em] text-[#102511] transition-colors duration-200 hover:border-[#315c36] hover:bg-[#e5eddd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70] sm:px-5 sm:text-[10px]"
              >
                {t(label)}
                {arrow ? <span aria-hidden="true">→</span> : null}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-[-2%] z-[1] h-[43svh] w-[128%] sm:w-[115%] md:bottom-auto md:top-1/2 md:h-[86vh] md:w-[72%] md:-translate-y-1/2 ${isRTL ? "left-[-24%] sm:left-[-18%] md:left-[-11%]" : "right-[-24%] sm:right-[-18%] md:right-[-11%]"}`}
      >
        <div className={`h-full w-full ${isRTL ? "-scale-x-100" : ""}`}>
          <div
            ref={armRef}
            data-in-view="false"
            className="services-arm-motion h-full w-full"
          >
            <Image
              src="/mascot/arm-mascot.webp"
              alt=""
              width={1600}
              height={900}
              sizes="(max-width: 768px) 128vw, 72vw"
              className="h-full w-full object-contain object-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
