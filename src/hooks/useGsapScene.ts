"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useGsapScene(
  rootRef: React.RefObject<HTMLElement | null>,
  onFinished?: () => void,
  replayKey = 0,
) {
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const finishedRef = useRef(onFinished);
  finishedRef.current = onFinished;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const context = gsap.context(() => {
      const query = (selector: string) => root.querySelector(selector)!;
      const controls = root.querySelectorAll(".window-control");
      const video = root.querySelector("video");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        video?.pause();
        gsap.set([query(".kicker"), query(".hero-copy"), query(".laptop")], { autoAlpha: 1 });
        timelineRef.current = gsap.timeline({ onComplete: () => finishedRef.current?.() }).to({}, { duration: 5 });
        return;
      }
      const timeline = gsap.timeline({ onComplete: () => finishedRef.current?.() });
      timelineRef.current = timeline;
      gsap.set([query(".kicker"), query(".hero-copy"), query(".laptop")], { autoAlpha: 0 });
      gsap.set(query(".laptop"), { y: 90, rotateX: 12, rotateY: -20, rotateZ: -6, scale: 0.78 });
      gsap.set(controls, { scale: 0 });
      gsap.set(query(".laptop-screen"), { clipPath: "inset(100% 0% 0% 0%)" });
      timeline
        .to(query(".kicker"), { autoAlpha: 1, duration: 0.45, ease: "power2.out" }, 0.15)
        .to(query(".hero-copy"), { autoAlpha: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3)
        .to(query(".laptop"), { autoAlpha: 1, y: 0, rotateX: 8, rotateY: -10, rotateZ: -2, scale: 1, duration: 1.55, ease: "power3.out" }, 0.15)
        .to(query(".laptop-screen"), { clipPath: "inset(0% 0% 0% 0%)", duration: 0.85, ease: "power3.inOut" }, 1.05)
        .to(controls, { scale: 1, duration: 0.25, stagger: 0.08, ease: "back.out(2)" }, 1.5)
        .to(query(".laptop"), { y: -9, duration: 1.9, ease: "sine.inOut", repeat: 1, yoyo: true }, 3.1)
        .to(query(".hero-copy"), { autoAlpha: 0, y: -16, duration: 0.48, ease: "power2.in" }, 7.55)
        .to(query(".kicker"), { autoAlpha: 0, duration: 0.35 }, 7.55)
        .to(query(".laptop"), { autoAlpha: 0, y: 35, scale: 0.93, duration: 0.7, ease: "power2.in" }, 7.7);
    }, root);
    return () => {
      context.revert();
      timelineRef.current = null;
    };
  }, [rootRef, replayKey]);

  return { timelineRef };
}
