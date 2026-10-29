import { useRef, useState } from "react";
import { ArrowUpRight, Pause, Play, RotateCcw } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useGsapScene } from "@/hooks/useGsapScene";
import Logo from "@/components/ui/Logo";

type HeroSceneProps = { onComplete?: () => void };

export default function HeroScene({ onComplete }: HeroSceneProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [playing, setPlaying] = useState(true);
  const [run, setRun] = useState(0);
  const { timelineRef } = useGsapScene(rootRef, onComplete, run);

  const togglePlaying = () => {
    const timeline = timelineRef.current;
    if (!timeline) return;
    if (playing) timeline.pause();
    else timeline.resume();
    const video = rootRef.current?.querySelector("video");
    if (playing) video?.pause();
    else video?.play().catch(() => undefined);
    setPlaying(!playing);
  };

  const restart = () => {
    setRun((value) => value + 1);
    setPlaying(true);
  };

  return (
    <section
      key={run}
      ref={rootRef}
      className="cinematic-shell relative isolate h-full w-full overflow-hidden bg-[radial-gradient(ellipse_at_68%_48%,#274928_0%,#132a16_30%,#0d170e_72%)] font-sans text-[#f3f3ed]"
    >
      <div className="ambient ambient--one pointer-events-none absolute -right-[10vw] -top-[28vw] z-0 h-[50vw] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(119,222,113,.34),transparent_66%)]" />
      <div className="ambient ambient--two pointer-events-none absolute -bottom-[28vw] -left-[5vw] z-0 h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(22,78,32,.66),transparent_68%)]" />
      <div className="grain pointer-events-none absolute inset-0 z-30 opacity-[.08] mix-blend-screen [background-image:url('data:image/svg+xml,%3Csvg viewBox=%270 0 180 180%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%27.92%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27 opacity=%27.5%27/%3E%3C/svg%3E')" />

      <section className="copy-block absolute left-[clamp(22px,8.5vw,136px)] top-[26%] z-[12] max-[680px]:left-5 max-[680px]:top-[17vh]">
        <p className="kicker mb-7 font-sans text-[10px] uppercase tracking-[.1em] text-[#a4ef91] max-[680px]:mb-5 max-[680px]:text-[11px]">
          A signal from 3Mo <span className="ml-3 text-[#f3f3ed]">↗</span>
        </p>
        <div className="hero-copy">
          <h2 className="text-[clamp(78px,11vw,174px)] font-semibold uppercase leading-[1.02] tracking-[-0.035em] max-[680px]:text-[20vw]">
            Make it
            <br />
            <span className="font-sans font-medium normal-case">move.</span>
          </h2>
          <p className="mt-9 ml-2 w-[260px] text-[13px] leading-[1.45] text-white/55 max-[680px]:mt-6 max-[680px]:w-[210px] max-[680px]:text-[11px]">
            Three minds shaping one clear direction.
          </p>
        </div>

      </section>



      <div className="stage absolute left-[40%] top-[49%] z-[6] h-[57vh] w-[min(50vw,750px)] -translate-x-[3%] -translate-y-[42%] [perspective:1500px] max-[900px]:left-[33%] max-[900px]:w-[67vw] max-[680px]:left-[8%] max-[680px]:top-[51%] max-[680px]:h-[43vh] max-[680px]:w-[105vw] max-[680px]:-translate-y-[35%] max-[680px]:scale-[.78]">
        <div className="laptop-shadow absolute bottom-[5%] left-[2%] right-[3%] h-[15%] rounded-[50%] bg-black/35 blur-2xl" />
        <div className="laptop absolute inset-0 transform-gpu opacity-0 [transform-style:preserve-3d]">
          <div className="laptop-lid absolute left-[10%] top-[1%] z-[2] h-[67%] w-[81%] rounded-[17px_17px_5px_5px] border-2 border-[#252b25] bg-gradient-to-br from-[#9aa29a] to-[#222922] p-2.5 shadow-2xl">
            <div className="laptop-screen relative h-full w-full overflow-hidden rounded-[8px_8px_2px_2px] bg-[#e7e9df] shadow-[inset_0_0_0_1px_rgba(0,0,0,.4)]">
              <div className="browser-bar relative z-10 flex h-6 items-center border-b border-black/10 bg-[#f4f5ef] px-2 text-[11px] text-[#9ca799]">
                <div className="browser-controls flex gap-1">
                  <span className="window-control h-1 w-1 rounded-full bg-[#b2c6a9]" />
                  <span className="window-control h-1 w-1 rounded-full bg-[#b2c6a9]" />
                  <span className="window-control h-1 w-1 rounded-full bg-[#b2c6a9]" />
                </div>
                <span className="browser-address flex-1 text-center font-sans">3mo.studio / your-video</span>
                <span className="browser-menu text-xs">≡</span>
              </div>
              <div className="screen-content relative h-[calc(100%-24px)] overflow-hidden bg-gradient-to-br from-[#f3f4ec] to-[#cfdcc8]">
                <video
                  className="hero-video absolute inset-0 z-[1] h-full w-full object-cover mix-blend-multiply"
                  src={siteConfig.heroVideoPath}
                  poster="/videos/scene-02-poster.webp"
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="3Mo project video"
                />
                <div className="screen-overlay absolute inset-x-6 top-4 z-[3] flex items-center gap-4 font-sans text-[11px] text-[#29442a]">
                  <Logo size="micro" />
                  <span>PROJECT / 003</span>
                  <span className="ml-auto rounded-full border border-[#1a3a1a]/30 px-2 py-1 text-[11px]">VIDEO SYSTEM</span>
                </div>
              </div>
            </div>
          </div>
          <div className="laptop-base absolute left-[4%] top-[65%] z-[1] h-[31%] w-[92%] rounded-[3px_3px_16px_16px] bg-gradient-to-b from-[#9aa39b] via-[#626d65] to-[#343e37] shadow-xl [transform:perspective(800px)_rotateX(58deg)]">
            <div className="keyboard absolute left-[15%] right-[15%] top-[12%] grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }, (_, index) => <div key={index} className="h-1 rounded-sm bg-[#2e3830]" />)}
            </div>
            <div className="trackpad absolute bottom-[9%] left-[39%] right-[39%] h-[27%] rounded-sm border border-[#1c281d]/25" />
          </div>
        </div>
      </div>

      <a href="#contact" className="cta-button absolute right-[clamp(22px,5vw,78px)] top-1/2 z-20 flex items-center gap-3 border border-white/40 bg-white/5 px-4 py-3 font-sans text-[11px] tracking-[.05em] max-[900px]:bottom-[16%] max-[900px]:top-auto max-[680px]:right-5 max-[680px]:bottom-[25%]">
        START A PROJECT <ArrowUpRight size={16} />
      </a>

      <footer className="bottom-ui absolute inset-x-[clamp(22px,4.3vw,68px)] bottom-7 z-20 flex items-center justify-between font-sans text-[11px] tracking-[.06em] text-white/45 max-[680px]:inset-x-5 max-[680px]:bottom-5 max-[680px]:text-[11px]">
        <div className="flex items-center gap-5 max-[680px]:gap-2">
          <button type="button" className="flex min-h-11 items-center gap-1.5 text-white/90" onClick={togglePlaying}>
            {playing ? <Pause size={14} /> : <Play size={14} />}
            {playing ? "PAUSE" : "PLAY"}
          </button>
          <button type="button" className="flex min-h-11 items-center gap-1.5 text-white/90" onClick={restart}>
            <RotateCcw size={14} /> REPLAY
          </button>
          <span className="whitespace-nowrap text-white/60 max-[680px]:text-[11px]">SCENE 02 / SIGNAL</span>
        </div>
      </footer>
    </section>
  );
}
