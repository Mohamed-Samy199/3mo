import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import SceneVideo from "@/components/scenes/SceneVideo";
import { useI18n } from "@/components/i18n/LanguageProvider";

type LogoSignalSceneProps = { onComplete: () => void; playing?: boolean };

export default function LogoSignalScene({ onComplete, playing = true }: LogoSignalSceneProps) {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const copy = root.querySelector(".signal-copy") as HTMLElement;
    const eyebrow = root.querySelector(".signal-eyebrow") as HTMLElement;
    const headline = root.querySelector(".signal-headline") as HTMLElement;
    const description = root.querySelector(".signal-description") as HTMLElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeline = gsap.timeline();
    timelineRef.current = timeline;
    gsap.set([eyebrow, headline, description], { autoAlpha: 0, y: 18 });
    gsap.set(copy, { autoAlpha: 1 });
    timeline
      .to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.35)
      .to(headline, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.55)
      .to(description, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out" }, 0.9);
    return () => { timeline.kill(); timelineRef.current = null; };
  }, []);

  useLayoutEffect(() => {
    if (playing) timelineRef.current?.resume();
    else timelineRef.current?.pause();
  }, [playing]);

  return (
    <section ref={rootRef} className="signal-scene relative isolate h-full w-full overflow-hidden bg-[#f3f0e7] font-sans text-[#203a22]">
      <SceneVideo playing={playing} className="absolute inset-0 z-0 h-full w-full object-cover" src={siteConfig.openingVideoPath} poster="/videos/scene-01-poster.webp" onComplete={onComplete} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#f3f0e7]/10 via-transparent to-[#f3f0e7]/10" />
      <div className="pointer-events-none absolute inset-0 z-[2] opacity-[.035] mix-blend-multiply [background-image:url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.92%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.5%27/%3E%3C/svg%3E')]" />
      <section className="signal-copy absolute left-[51%] top-[42%] z-10 -translate-y-1/2 max-[680px]:left-5 max-[680px]:right-5 max-[680px]:top-auto max-[680px]:bottom-[22%] max-[680px]:translate-y-0 max-[680px]:rounded-xl max-[680px]:bg-[#f3f0e7]/90 max-[680px]:p-5" aria-label={t("3Mo introduction")}>
        <span className="signal-eyebrow mb-5 block font-sans text-[clamp(8px,.75vw,12px)] font-medium tracking-[.08em] text-[#5daa5a] max-[680px]:mb-2 max-[680px]:text-[11px]">{t("WE ARE 3MO")}</span>
        <h2 className="signal-headline m-0 text-[clamp(32px,4.4vw,68px)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#203a22] max-[680px]:text-[clamp(36px,9vw,54px)]">{t("Three minds.")}<br /><span className="font-sans font-medium tracking-[-0.035em]">{t("One direction.")}</span></h2>
        <p className="signal-description mt-7 text-[clamp(11px,1.2vw,17px)] leading-[1.35] text-[#233c25]/65 max-[680px]:mt-3 max-[680px]:text-sm">{t("Creative technology")}<br />{t("for ideas in motion.")}</p>
      </section>
    </section>
  );
}
