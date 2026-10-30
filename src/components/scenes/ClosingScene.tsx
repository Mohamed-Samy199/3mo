import { useRef } from "react";
import { siteConfig } from "@/config/site";
import { useScrubVideo } from "@/hooks/useScrubVideo";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function ClosingScene({ playing = true }: { playing?: boolean }) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { isReady } = useScrubVideo(videoRef, true, true, !playing);

  return (
    <section className="relative isolate h-full w-full overflow-hidden bg-[#EDE4DB] font-sans text-[#102511]">
      <video
        ref={videoRef}
        className={`absolute inset-0 z-0 h-full w-full object-cover object-center transition-opacity duration-700 ${isReady ? "opacity-100" : "opacity-0"}`}
        src={siteConfig.closingVideoPath}
        muted
        playsInline
        preload="metadata"
        poster="/videos/scene-04-poster.webp"
        aria-label={t("3Mo closing robot scene")}
      />
      <section
        className="absolute left-[clamp(22px,7vw,112px)] top-1/2 z-10 w-[clamp(180px,20vw,300px)] -translate-y-1/2 max-[680px]:left-5 max-[680px]:top-[24%] max-[680px]:w-[170px] max-[680px]:translate-y-0"
        aria-label={t("3Mo closing statement")}
      >
        <p className="mb-5 font-sans text-[11px] uppercase tracking-[.1em] text-[#58844d] max-[680px]:mb-3 max-[680px]:text-[11px]">
          {t("THE LAST FRAME")}
        </p>

        <p className="text-[clamp(22px,2.7vw,44px)] font-semibold leading-none tracking-[-0.035em]">
          {t("Make ideas")}
          <br />
          <span className="font-sans font-medium text-[#58844d]">
            {t("move.")}
          </span>
        </p>
        <p className="mt-7 max-w-[240px] text-[13px] leading-[1.45] text-[#102511]/65 max-[680px]:mt-4 max-[680px]:text-[10px]">
          {t("From the first signal to the final build, we create work that moves people.")}
        </p>
      </section>
      <section
        className="absolute right-[clamp(22px,7vw,112px)] top-1/2 z-10 w-[clamp(180px,18vw,280px)] -translate-y-1/2 text-right max-[680px]:right-5 max-[680px]:top-auto max-[680px]:bottom-[25%] max-[680px]:w-[170px] max-[680px]:translate-y-0"
        aria-label={t("3Mo closing identity")}
      >
        <p className="mb-4 font-sans text-[11px] uppercase tracking-[.1em] text-[#102511]/50 max-[680px]:mb-2 max-[680px]:text-[11px]">
          {t("3MO / CREATIVE TECHNOLOGY")}
        </p>
        <p className="text-[clamp(22px,2.7vw,44px)] font-semibold leading-none tracking-[-0.035em]">
          {t("Three minds.")}
          <br />
          <span className="font-sans font-medium text-[#58844d]">
            {t("One direction.")}
          </span>
        </p>
        <p className="mt-5 font-sans text-[11px] uppercase tracking-[.08em] text-[#102511]/50 max-[680px]:mt-3 max-[680px]:text-[11px]">
          {t("Strategy / Design / Technology")}
        </p>
      </section>
    </section>
  );
}
