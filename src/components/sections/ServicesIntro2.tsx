"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const services = [
  {
    title: "Marketing & Ads",
    image: "/services/marketing.webp",
    alt: "3D social campaign, megaphone and analytics illustration",
  },
  {
    title: "Brand Identity",
    image: "/services/brand-identity.webp",
    alt: "Brand identity book, color palette and business cards illustration",
  },
  {
    title: "Web & E-commerce",
    image: "/services/web-commerce.webp",
    alt: "Laptop and phone displaying an online store",
  },
  {
    title: "Mobile Apps",
    image: "/services/mobile-apps.webp",
    alt: "Smartphone displaying a mobile application interface",
  },
  {
    title: "Custom Software",
    image: "/services/custom-software.webp",
    alt: "Software code window and settings illustration",
  },
  {
    title: "ERP & Integrations",
    image: "/services/erp-integrations.webp",
    alt: "Business analytics dashboard connected to cloud, database and integrations",
  },
];

export default function ServicesIntro2() {
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
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      aria-labelledby="services-title"
      className="relative isolate min-h-[100svh] w-full overflow-hidden bg-[#f3f0e7] text-[#102511]"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <svg
          className="h-full w-full opacity-45"
          viewBox="0 0 1600 1000"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M-40 188C205 181 340 135 430-20M-70 740C170 682 335 660 530 617M1210 1040C1315 840 1460 760 1680 748"
            stroke="#315c36"
            strokeOpacity=".18"
            strokeWidth="1.2"
          />
          <circle cx="354" cy="139" r="5" fill="#71bc70" fillOpacity=".65" />
          <circle cx="371" cy="664" r="5" fill="#71bc70" fillOpacity=".65" />
        </svg>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_76%_43%,rgba(164,239,145,.17),transparent_45%)]" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-[1920px] grid-cols-1 gap-7 px-5 py-6 sm:px-8 sm:py-8 md:px-10 lg:grid-cols-[minmax(300px,0.98fr)_minmax(0,2fr)] lg:gap-6 xl:gap-9 xl:px-[clamp(48px,4vw,80px)]">
        <div className="relative flex min-h-[610px] flex-col sm:min-h-[650px] lg:min-h-[calc(100svh-4rem)]">
          <div className="relative z-10 mt-10 max-w-[530px] sm:mt-14 lg:mt-[clamp(72px,12vh,142px)]">
            <p className="mb-6 flex items-center gap-4 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#58844d] sm:text-xs">
              <span aria-hidden="true" className="h-px w-8 bg-[#315c36]" />
              What we do
            </p>
            <h2
              id="services-title"
              className="max-w-[540px] text-[clamp(46px,5vw,78px)] font-semibold leading-[1.02] tracking-[-0.035em] lg:text-[clamp(48px,4.3vw,72px)]"
            >
              Ideas into
              <br />
              digital impact<span className="text-[#71bc70]">.</span>
            </h2>
            <p className="mt-6 max-w-[390px] text-[15px] leading-[1.55] text-[#102511]/65 sm:text-lg">
              Marketing and technology,
              <br className="hidden sm:block" /> built to move your business forward.
            </p>
            <Link
              href="/contact"
              className="group mt-8 inline-flex min-h-12 items-center gap-4 rounded-full border border-[#315c36]/80 px-5 py-3 font-sans text-[10px] font-medium uppercase tracking-[0.16em] text-[#102511] transition duration-200 hover:bg-[#102511] hover:text-[#f3f0e7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70] sm:px-6"
            >
              Let&apos;s talk
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[-26px] left-[-18vw] z-0 w-[min(96vw,510px)] sm:left-[-12vw] sm:w-[min(76vw,580px)] lg:bottom-[-18px] lg:left-[clamp(-115px,-7vw,-35px)] lg:w-[min(39vw,650px)]"
          >
            <div ref={armRef} data-in-view="false" className="services-intro2-arm-motion w-full">
              <Image
                src="/mascot/arm-mascot.webp"
                alt=""
                aria-hidden="true"
                width={1898}
                height={829}
                sizes="(max-width: 639px) 96vw, (max-width: 1023px) 76vw, 39vw"
                className="block h-auto w-full object-contain"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 content-center gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-[14px] xl:gap-4">
          {services.map((service) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-[14px] border border-[#102511]/20 bg-[#f8f7f0]/90 shadow-[0_8px_24px_rgba(16,37,17,.035)] transition duration-300 hover:-translate-y-1 hover:border-[#315c36]/45 hover:shadow-[0_16px_34px_rgba(16,37,17,.09)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(max-width: 639px) 46vw, (max-width: 1023px) 44vw, 22vw"
                  className="object-contain p-1 transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                />
              </div>
              <h3 className="px-3 pb-4 pt-1 text-[clamp(12px,1.2vw,18px)] font-semibold leading-tight tracking-[-0.035em] text-[#102511] sm:px-4 sm:pb-5 sm:text-base xl:px-5 xl:text-lg">
                {service.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
