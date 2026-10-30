import { useEffect, useRef } from "react";

type SceneVideoProps = {
  src: string;
  poster: string;
  className?: string;
  onComplete: () => void;
  playing?: boolean;
};

type PlaybackControls = {
  pause: () => void;
  resume: () => void;
};

/** A decorative finite clip: failed/blocked playback never traps the introduction. */
export default function SceneVideo({
  src,
  poster,
  className,
  onComplete,
  playing = true,
}: SceneVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const completeRef = useRef(onComplete);
  const playingRef = useRef(playing);
  const controlsRef = useRef<PlaybackControls | null>(null);
  completeRef.current = onComplete;
  playingRef.current = playing;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    let remainingMs: number | null = null;
    let deadline = 0;
    let finished = false;
    let playPending = false;
    let playRequest = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clearTimer = (preserveRemaining = false) => {
      if (timeout) {
        if (preserveRemaining) remainingMs = Math.max(0, deadline - performance.now());
        clearTimeout(timeout);
        timeout = undefined;
      }
    };

    const finish = () => {
      if (finished || !playingRef.current) return;
      finished = true;
      clearTimer();
      completeRef.current();
    };

    const schedule = (delayMs: number) => {
      clearTimer();
      remainingMs = delayMs;
      if (finished || !playingRef.current) return;
      deadline = performance.now() + delayMs;
      timeout = setTimeout(() => {
        timeout = undefined;
        remainingMs = 0;
        if (playingRef.current) finish();
      }, delayMs);
    };

    const fallback = () => schedule(8000);

    const resume = () => {
      if (finished || !playingRef.current) return;
      if (reduced) {
        video.pause();
        schedule(remainingMs ?? 5000);
        return;
      }

      if (!timeout) schedule(remainingMs ?? 8000);
      if (playPending || !video.paused) return;

      const request = ++playRequest;
      playPending = true;
      try {
        const promise = video.play();
        promise
          .then(() => {
            if (request !== playRequest && playingRef.current && !finished) return;
            playPending = false;
            if (
              request !== playRequest ||
              !playingRef.current ||
              finished
            ) {
              video.pause();
              return;
            }
            const duration = Number.isFinite(video.duration)
              ? video.duration
              : 20;
            schedule((Math.max(0, duration - video.currentTime) + 10) * 1000);
          })
          .catch(() => {
            playPending = false;
            if (request === playRequest && playingRef.current && !finished) {
              fallback();
            }
          });
      } catch {
        playPending = false;
        fallback();
      }
    };

    const pause = () => {
      playRequest += 1;
      playPending = false;
      clearTimer(true);
      video.pause();
    };

    const handleEnded = () => finish();
    const handleError = () => fallback();
    const handleStalled = () => fallback();

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    video.addEventListener("stalled", handleStalled);
    controlsRef.current = { pause, resume };

    if (playingRef.current) resume();
    else pause();

    return () => {
      finished = true;
      playRequest += 1;
      playPending = false;
      clearTimer();
      video.pause();
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
      video.removeEventListener("stalled", handleStalled);
      controlsRef.current = null;
    };
  }, [src]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (playing) controls.resume();
    else controls.pause();
  }, [playing]);

  return (
    <video
      ref={videoRef}
      className={className}
      src={src}
      poster={poster}
      muted
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
