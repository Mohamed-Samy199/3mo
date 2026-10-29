import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { siteConfig } from "@/config/site";
import SceneVideo from "@/components/scenes/SceneVideo";

type FieldKitSceneProps = { onComplete: () => void };

export default function FieldKitScene({ onComplete }: FieldKitSceneProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const eyebrow = root.querySelector(".field-kit-eyebrow");
    const title = root.querySelector(".field-kit-title");
    const description = root.querySelector(".field-kit-description");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timeline = gsap.timeline();
    gsap.set([eyebrow, title, description], { autoAlpha: 0, y: 18 });
    timeline
      .to(
        eyebrow,
        { autoAlpha: 1, y: 0, duration: 0.45, ease: "power3.out" },
        0.35,
      )
      .to(title, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.5)
      .to(
        description,
        { autoAlpha: 1, y: 0, duration: 0.5, ease: "power3.out" },
        0.75,
      );
    return () => {
      timeline.kill();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate h-full w-full overflow-hidden bg-[#EDE4D2] font-sans text-[#203a22]"
    >
      <SceneVideo
        className="absolute inset-0 z-0 h-full w-full object-cover object-center"
        src={siteConfig.fieldKitVideoPath} poster="/videos/scene-03-poster.webp"
        onComplete={onComplete}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#f3f0e7]/20 via-transparent to-[#f3f0e7]/5" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-[#f3f0e7]/20 via-transparent to-[#f3f0e7]/10" />
      <section
        className="absolute left-[clamp(22px,8.5vw,136px)] top-[24%] z-10 max-w-[260px] max-[680px]:left-5 max-[680px]:top-[22%] max-[680px]:max-w-[180px]"
        aria-label="3Mo signal kit introduction"
      >
        <span className="field-kit-eyebrow mb-4 block font-sans text-[10px] uppercase tracking-[.1em] text-[#3e9d51] max-[680px]:mb-2 max-[680px]:text-[11px]">
          THE SIGNAL KIT
        </span>
        <h2 className="field-kit-title m-0 whitespace-nowrap text-[clamp(32px,4.2vw,66px)] font-semibold leading-[1.02] tracking-[-0.035em] text-[#203a22] max-[680px]:text-[10vw]">
          Ideas need
          <br />
          <span className="whitespace-nowrap font-sans font-medium tracking-[-0.035em]">
            the right tools.
          </span>
        </h2>
        <p className="field-kit-description mt-6 font-sans text-[11px] uppercase tracking-[.08em] text-[#203a22]/60 max-[680px]:mt-4 max-[680px]:text-[11px]">
          STRATEGY / DESIGN / TECHNOLOGY
        </p>
      </section>
      <footer className="absolute inset-x-0 bottom-7 z-10 flex justify-between px-[clamp(22px,4.3vw,68px)] font-sans text-[11px] tracking-[.06em] text-[#203a22]/55 max-[680px]:bottom-5 max-[680px]:px-5 max-[680px]:text-[11px]">
        <span>OPEN THE POSSIBILITY</span>
        <span>SCENE 03 / FIELD KIT</span>
      </footer>
    </section>
  );
}
