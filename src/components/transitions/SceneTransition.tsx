import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useI18n } from "@/components/i18n/LanguageProvider";

type SceneTransitionProps = {
  transitionKey: number;
  onCovered: () => void;
  onFinished: () => void;
};

export default function SceneTransition({ transitionKey, onCovered, onFinished }: SceneTransitionProps) {
  const { t } = useI18n();
  const layerRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const layer = layerRef.current;
    if (transitionKey === 0 || !layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onCovered();
      onFinished();
      return;
    }
    const context = gsap.context(() => {
      gsap.timeline({ onComplete: onFinished })
        .set(layer, { yPercent: 100, autoAlpha: 1 })
        .to(layer, { yPercent: 0, duration: 0.72, ease: "power3.inOut" })
        .call(onCovered)
        .to(layer, { yPercent: 100, duration: 0.58, ease: "power3.inOut" }, "+=0.12")
        .set(layer, { autoAlpha: 0 });
    }, layer);
    return () => context.revert();
  }, [transitionKey, onCovered, onFinished]);

  return (
    <div ref={layerRef} aria-hidden="true" className="pointer-events-none absolute inset-0 z-[100] opacity-0" style={{ background: "linear-gradient(135deg, #0d2412 0%, #1c5123 48%, #a4ef91 100%)" }}>
      <div className="absolute bottom-8 left-8 font-sans text-xs uppercase tracking-[.12em] text-[#eaffdf]/75">{t("3MO / SIGNAL SHIFT")}</div>
    </div>
  );
}
