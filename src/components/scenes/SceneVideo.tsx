import { useEffect, useRef } from "react";

type SceneVideoProps = {
  src: string;
  poster: string;
  className?: string;
  onComplete: () => void;
};

/** A decorative finite clip: failed/blocked playback never traps the introduction. */
export default function SceneVideo({ src, poster, className, onComplete }: SceneVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const completeRef = useRef(onComplete);
  completeRef.current = onComplete;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const timer = setTimeout(() => completeRef.current(), 5000);
      return () => clearTimeout(timer);
    }
    let timeout: ReturnType<typeof setTimeout> | undefined;
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      if (timeout) clearTimeout(timeout);
      completeRef.current();
    };
    const fallback = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(finish, 8000);
    };
    video.addEventListener("ended", finish);
    video.addEventListener("error", fallback);
    fallback();
    video.play().then(() => {
      if (timeout) clearTimeout(timeout);
      // Also recover from a stalled connection after playback begins.
      const duration = Number.isFinite(video.duration) ? video.duration : 20;
      timeout = setTimeout(finish, (duration + 10) * 1000);
    }).catch(fallback);
    return () => {
      finished = true;
      if (timeout) clearTimeout(timeout);
      video.pause();
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", fallback);
    };
  }, [src]);

  return <video ref={videoRef} className={className} src={src} poster={poster} muted playsInline preload="metadata" aria-hidden="true" />;
}
