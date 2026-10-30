import { Pause, Play, RotateCcw } from "lucide-react";
import { useI18n } from "@/components/i18n/LanguageProvider";

type ScenePlaybackControlsProps = {
  scene: 1 | 2 | 3 | 4;
  playing: boolean;
  disabled: boolean;
  onToggle: () => void;
  onReplay: () => void;
};

const sceneLabels = {
  1: "SCENE 01 / ORIGIN",
  2: "SCENE 02 / SIGNAL",
  3: "SCENE 03 / FIELD KIT",
  4: "SCENE 04 / CLOSING FRAME",
};
const sceneCaptions = {
  1: "FOLLOW THE SIGNAL",
  2: "A signal from 3Mo",
  3: "OPEN THE POSSIBILITY",
  4: "FOLLOWING THE SIGNAL",
};

export default function ScenePlaybackControls({ scene, playing, disabled, onToggle, onReplay }: ScenePlaybackControlsProps) {
  const { t, isRTL } = useI18n();
  const buttonClass = `inline-flex min-h-11 items-center gap-2 rounded-full border px-3 text-[11px] font-medium backdrop-blur-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 ${scene === 2 ? "border-white/20 hover:bg-white/10" : "border-[#102511]/20 hover:bg-[#102511]/5"}`;
  return (
    <footer className={`scene-playback-bar ${scene === 2 ? "text-[#f3f3ed]" : "text-[#102511]"}`} dir="ltr">
      <div className="scene-playback-buttons" dir={isRTL ? "rtl" : "ltr"} role="group" aria-label={t("3Mo studio introduction")}>
        <button
          type="button"
          data-playback="toggle"
          onClick={onToggle}
          disabled={disabled}
          aria-label={t(playing ? "Pause scene" : "Play scene")}
          className={buttonClass}
        >
          {playing ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          {t(playing ? "PAUSE" : "PLAY")}
        </button>
        <button
          type="button"
          data-playback="replay"
          onClick={onReplay}
          disabled={disabled}
          aria-label={t("Replay scene")}
          className={buttonClass}
        >
          <RotateCcw size={14} aria-hidden="true" />
          {t("REPLAY")}
        </button>
      </div>
      <div className="scene-playback-meta" dir={isRTL ? "rtl" : "ltr"}>
        <span className="hidden opacity-60 min-[681px]:block">{t(sceneCaptions[scene])}</span>
        <span className="block opacity-70">{t(sceneLabels[scene])}</span>
      </div>
    </footer>
  );
}
