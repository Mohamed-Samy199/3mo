"use client";

import { RefObject, useEffect, useRef, useState } from "react";

export function useScrubVideo(
  videoRef: RefObject<HTMLVideoElement | null>,
  enabled = true,
  // false: الماوس يمين يتقدم بالفيديو؛ true يحافظ على الاتجاه العكسي للفيديوهات الأخرى.
  invertDirection = true,
  paused = false,
) {
  const [isReady, setIsReady] = useState(false);
  const [mode, setMode] = useState<"scrub" | "autoplay" | "static">("scrub");
  const targetClientX = useRef<number | null>(null);
  const smoothedTime = useRef(0);
  const rafId = useRef<number | null>(null);
  const pausedRef = useRef(paused);
  const readyRef = useRef(false);
  const playRequestRef = useRef(0);
  pausedRef.current = paused;

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(reduced ? "static" : coarse ? "autoplay" : "scrub");
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!enabled) {
      playRequestRef.current += 1;
      video.pause();
      targetClientX.current = null;
      readyRef.current = false;
      setIsReady(false);
      return;
    }

    if (!readyRef.current) setIsReady(false);

    const handleMetadata = () => {
      // A mode change retains the existing frame while paused, but preserves the
      // original initialization/reset behavior for normal, unpaused use.
      if (!pausedRef.current) {
        video.currentTime = 0;
        smoothedTime.current = 0;
      }
      video.pause();
      readyRef.current = true;
      setIsReady(true);
    };

    if (video.readyState >= 2) handleMetadata();
    else video.addEventListener("loadeddata", handleMetadata);
    return () => video.removeEventListener("loadeddata", handleMetadata);
  }, [enabled, mode, videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !enabled || !isReady || paused) {
      playRequestRef.current += 1;
      video?.pause();
      return;
    }

    if (mode !== "autoplay") {
      playRequestRef.current += 1;
      video.pause();
      return;
    }

    video.loop = true;
    const request = ++playRequestRef.current;
    try {
      video
        .play()
        .then(() => {
          if (request !== playRequestRef.current && !pausedRef.current && readyRef.current) return;
          if (
            request !== playRequestRef.current ||
            pausedRef.current ||
            !enabled
          ) {
            video.pause();
          }
        })
        .catch(() => undefined);
    } catch {
      // Autoplay is best-effort; the loaded frame remains available.
    }

    return () => {
      playRequestRef.current += 1;
    };
  }, [enabled, isReady, mode, paused, videoRef]);

  useEffect(() => {
    if (mode !== "scrub" || !enabled || paused) return;
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
      if (pausedRef.current) return;
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
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };
  }, [enabled, invertDirection, mode, paused, videoRef]);

  return { isReady, mode };
}
