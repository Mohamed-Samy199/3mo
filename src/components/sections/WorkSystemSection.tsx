"use client";

import { type CSSProperties, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ServiceDetailPanel, { type ServiceId } from "./ServiceDetailPanel";
import CursorScrubMascot from "./CursorScrubMascot";
import { useI18n } from "@/components/i18n/LanguageProvider";

type MethodBackgroundPalette = {
  top: string;
  mid: string;
  bottom: string;
  glow: string;
};

const INITIAL_METHOD_PALETTE: MethodBackgroundPalette = {
  top: "#dfd5c9",
  mid: "#e4dad1",
  bottom: "#e6ddd4",
  glow: "rgba(229,228,216,.42)",
};

const services: {
  id: ServiceId;
  number: string;
  name: string;
  promise: string;
  icon: string;
  accent: string;
  position: string;
}[] = [
  {
    id: "marketing",
    number: "01",
    name: "Marketing",
    promise: "FIND THE SIGNAL",
    icon: "✳",
    accent: "bg-[#71bc70]",
    position: "md:left-[5%] md:top-[54%] md:-rotate-6",
  },
  {
    id: "branding",
    number: "02",
    name: "Branding",
    promise: "SHAPE THE STORY",
    icon: "◉",
    accent: "bg-[#b8a5d8]",
    position: "md:right-[7%] md:top-[27%] md:rotate-6",
  },
  {
    id: "programming",
    number: "03",
    name: "Programming",
    promise: "BUILD IT TO MOVE",
    icon: "{ }",
    accent: "bg-[#89c9d4]",
    position: "md:left-[18%] md:bottom-[8%] md:rotate-6",
  },
  {
    id: "content",
    number: "04",
    name: "Content",
    promise: "MAKE IT RESONATE",
    icon: "▤",
    accent: "bg-[#e7bc71]",
    position: "md:right-[16%] md:bottom-[7%] md:-rotate-6",
  },
];

export default function WorkSystemSection() {
  const { t, href } = useI18n();
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId | null>(null);
  const [mascotVideoReady, setMascotVideoReady] = useState(false);
  const [methodPalette, setMethodPalette] = useState(INITIAL_METHOD_PALETTE);
  const selectedService = services.find(
    (service) => service.id === selectedServiceId,
  );

  const methodBackgroundStyle = {
    "--method-bg-top": methodPalette.top,
    "--method-bg-mid": methodPalette.mid,
    "--method-bg-bottom": methodPalette.bottom,
    "--method-bg-glow": methodPalette.glow,
  } as CSSProperties;

  return (
    <section
      id="method"
      aria-labelledby="method-title"
      className="method-section relative isolate min-h-[100svh] overflow-hidden text-[#102511]"
      style={methodBackgroundStyle}
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[1920px] flex-col px-6 pb-6 pt-6 sm:px-10 sm:pb-8 sm:pt-8 md:px-[clamp(40px,4.5vw,84px)]">
        <div className="relative flex flex-1 flex-col md:block">
          <div className="method-copy relative z-20 mt-4 max-w-[560px] md:absolute md:left-[3.5%] md:top-[12%] md:mt-0 md:w-[39%]">
            <p className="mb-5 font-sans text-[11px] uppercase tracking-[0.18em] text-[#58844d] sm:text-[10px]">
              {t("THE 3MO METHOD")}
            </p>
            <h2
              id="method-title"
              className="text-[clamp(48px,6vw,92px)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              {t("From idea")}
              <br />
              <span className="text-[#718168]">{t("to impact")}</span>
              <span className="text-[#71bc70]">.</span>
            </h2>
            <p className="mt-6 max-w-[350px] text-sm leading-[1.55] text-[#102511]/65 sm:text-[15px]">
              {t("Three founders bring strategy, creativity, and technology together—combining marketing, branding, programming, and content to turn a good idea into real impact.")}
            </p>
            <Link
              href={href("/contact")}
              className="mt-6 inline-flex min-h-11 items-center gap-3 border-b border-[#315c36]/50 pb-2 font-sans text-[11px] uppercase tracking-[0.13em] text-[#102511] transition-colors hover:border-[#315c36] hover:text-[#315c36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70]"
            >
              {t("Start a conversation")} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="relative z-10 mx-auto mt-1 flex h-[min(82vw,360px)] w-[min(82vw,360px)] max-w-[410px] items-center justify-center md:absolute md:left-[54%] md:top-[51%] md:mt-0 md:h-[min(40vw,74svh,620px)] md:w-[min(40vw,74svh,620px)] md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="method-mascot-visual absolute inset-0">
              <Image
                src="/mascot/3mo-mascot-poster.webp"
                alt=""
                aria-hidden="true"
                width={960}
                height={960}
                sizes="(max-width: 767px) 86vw, 40vw"
                className={`absolute z-10 h-full w-full object-contain transition-opacity duration-500 ${
                  mascotVideoReady ? "opacity-0" : "opacity-100"
                }`}
              />
              <CursorScrubMascot
                onReadyChange={setMascotVideoReady}
                onBackgroundSample={setMethodPalette}
              />
            </div>
            <div
              aria-live="polite"
              className="absolute right-[1%] top-[12%] z-20 hidden -rotate-2 items-center gap-2 border border-[#315c36]/20 bg-[#f8f7f0]/85 px-3 py-2 font-sans text-[11px] uppercase tracking-[0.12em] text-[#315c36] shadow-[0_6px_24px_rgba(16,37,17,.04)] backdrop-blur-sm md:flex"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#71bc70]" />
              {selectedService
                ? `${t(selectedService.name)} — ${t("IN THE 3MO METHOD")}`
                : t("THREE - TWO / DONE")}
            </div>
          </div>

          <div
            role="group"
            aria-label={t("Explore the four 3Mo service disciplines")}
            className="relative z-30 mt-1 grid grid-cols-2 gap-3 pb-7 sm:gap-4 md:absolute md:inset-0 md:mt-0 md:block md:pb-0"
          >
            {services.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-expanded={isSelected}
                  aria-controls="service-detail-panel"
                  onClick={() => setSelectedServiceId(service.id)}
                  className={`group relative flex h-[132px] flex-col justify-between border px-4 py-3 text-start shadow-[0_12px_36px_rgba(16,37,17,.07)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:rotate-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70] sm:h-[148px] sm:px-5 sm:py-4 md:absolute md:h-[150px] md:w-[174px] md:px-4 md:py-4 ${service.position} ${
                    isSelected
                      ? "border-[#315c36]/60 bg-[#e7f0df]/95"
                      : "border-[#102511]/15 bg-[#fbfaf5]/85 hover:border-[#315c36]/45 hover:bg-white/95"
                  }`}
                >
                  <span className="flex w-full items-center justify-between font-sans text-[11px] tracking-[0.12em] text-[#102511]/65">
                    {service.number}
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-full ${service.accent}`}
                      />
                      <span aria-hidden="true" className="text-sm leading-none">
                        {service.icon}
                      </span>
                    </span>
                  </span>
                  <span className="text-[16px] font-semibold leading-tight tracking-[-0.035em] sm:text-lg">
                    {t(service.name)}
                  </span>
                  <span className="flex items-end justify-between gap-2 font-sans text-[11px] tracking-[0.1em] text-[#102511]/60 sm:text-[11px]">
                    {t(service.promise)}
                    <span aria-hidden="true" className="text-sm leading-none text-[#102511]">
                      ↗
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <ServiceDetailPanel
        serviceId={selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
      />
    </section>
  );
}
