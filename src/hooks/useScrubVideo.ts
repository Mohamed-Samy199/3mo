"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export function useScrubVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled = true,
  // false: الماوس يمين يتقدم بالفيديو؛ true يحافظ على الاتجاه العكسي للفيديوهات الأخرى.
  invertDirection = true,
) {
  const [isReady, setIsReady] = useState(false);
  const [mode, setMode] = useState<"scrub" | "autoplay" | "static">("scrub");
  const targetClientX = useRef<number | null>(null);
  const smoothedTime = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduced ? "static" : coarse ? "autoplay" : "scrub");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsReady(false);
    if (!enabled) {
      video.pause();
      targetClientX.current = null;
      return;
    }

    const handleMetadata = () => {
      video.currentTime = 0;
      smoothedTime.current = 0;
      if (mode === "autoplay") {
        video.loop = true;
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
      setIsReady(true);
    };

    if (video.readyState >= 2) handleMetadata();
    else video.addEventListener("loadeddata", handleMetadata);
    return () => video.removeEventListener("loadeddata", handleMetadata);
  }, [enabled, mode, videoRef]);

  useEffect(() => {
    if (mode !== "scrub" || !enabled) return;
    const video = videoRef.current;
    if (!video) return;

    const handleMouseMove = (event: MouseEvent) => {
      targetClientX.current = event.clientX;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const catchUpRate = 4.5;
    const deadZone = 0.004;
    let lastFrameAt = performance.now();

    const tick = (now: number) => {
      const deltaSeconds = Math.min((now - lastFrameAt) / 1000, 0.1);
      lastFrameAt = now;
      if (video.duration > 0 && targetClientX.current !== null) {
        const rawRatio = Math.min(
          1,
          Math.max(0, targetClientX.current / window.innerWidth),
        );
        const ratio = invertDirection ? 1 - rawRatio : rawRatio;
        const targetTime = ratio * video.duration;
        const lerpFactor = 1 - Math.exp(-catchUpRate * deltaSeconds);
        smoothedTime.current +=
          (targetTime - smoothedTime.current) * lerpFactor;
        if (Math.abs(video.currentTime - smoothedTime.current) > deadZone) {
          video.currentTime = smoothedTime.current;
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [enabled, invertDirection, mode, videoRef]);

  return { isReady, mode };
}
