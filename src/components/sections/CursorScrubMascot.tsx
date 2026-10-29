import { useEffect, useRef, useState } from "react";
import { useScrubVideo } from "@/hooks/useScrubVideo";

type CursorScrubMascotProps = {
  onReadyChange: (ready: boolean) => void;
  onBackgroundSample?: (palette: {
    top: string;
    mid: string;
    bottom: string;
    glow: string;
  }) => void;
};

const VIDEO_SRC = "/videos/scene-06.mp4";
// 1 = الحجم الأصلي، 1.6 = أكبر 60%
const MASCOT_SCALE = 1.6;

export default function CursorScrubMascot({
  onReadyChange,
  onBackgroundSample,
}: CursorScrubMascotProps) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const { isReady } = useScrubVideo(videoRef, isNearViewport);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: "120px 0px", threshold: 0.05 },
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    onReadyChange(isReady);
  }, [isReady, onReadyChange]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !onBackgroundSample) return;

    const canvas = document.createElement("canvas");
    canvas.width = 9;
    canvas.height = 9;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) return;

    let frameRequest: number | null = null;

    const toHex = (red: number, green: number, blue: number) =>
      `#${[red, green, blue]
        .map((channel) => Math.round(channel).toString(16).padStart(2, "0"))
        .join("")}`;

    const toRgba = (red: number, green: number, blue: number) =>
      `rgba(${Math.round(red)},${Math.round(green)},${Math.round(blue)},.42)`;

    type SampledColor = [number, number, number];

    const sample = (points: Array<[number, number]>) => {
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let red = 0;
      let green = 0;
      let blue = 0;
      points.forEach(([x, y]) => {
        const offset = (y * canvas.width + x) * 4;
        red += pixels[offset];
        green += pixels[offset + 1];
        blue += pixels[offset + 2];
      });
      return [red / points.length, green / points.length, blue / points.length] as SampledColor;
    };

    const sampleFrame = () => {
      frameRequest = null;
      if (video.readyState < 2 || !video.videoWidth) {
        return;
      }

      try {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const top = sample([
          [0, 0],
          [8, 0],
        ]);
        const mid = sample([
          [0, 4],
          [1, 4],
          [7, 4],
          [8, 4],
        ]);
        const bottom = sample([
          [0, 8],
          [8, 8],
        ]);
        const glow = sample([
          [7, 3],
          [8, 3],
          [7, 4],
          [8, 4],
          [7, 5],
          [8, 5],
        ]);
        onBackgroundSample({
          top: toHex(...top),
          mid: toHex(...mid),
          bottom: toHex(...bottom),
          glow: toRgba(...glow),
        });
      } catch {
        // The fallback palette remains in place if the browser blocks canvas reads.
      }
    };

    const scheduleSample = () => {
      if (frameRequest === null) frameRequest = requestAnimationFrame(sampleFrame);
    };

    video.addEventListener("loadeddata", scheduleSample);
    video.addEventListener("seeked", scheduleSample);
    video.addEventListener("timeupdate", scheduleSample);
    scheduleSample();

    return () => {
      video.removeEventListener("loadeddata", scheduleSample);
      video.removeEventListener("seeked", scheduleSample);
      video.removeEventListener("timeupdate", scheduleSample);
      if (frameRequest !== null) cancelAnimationFrame(frameRequest);
    };
  }, [onBackgroundSample, videoRef]);

  return (
    <div
      ref={stageRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-20"
    >
      <video
        ref={videoRef}
        className="h-full w-full origin-center object-contain"
        style={{ transform: `scale(${MASCOT_SCALE})` }}
        src={isNearViewport ? VIDEO_SRC : undefined}
        poster="/mascot/3mo-mascot-poster.webp"
        muted
        playsInline
        preload={isNearViewport ? "auto" : "none"}
        aria-label="3Mo mascot animation controlled by cursor movement"
      />
    </div>
  );
}
