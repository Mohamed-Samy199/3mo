"use client";

import { useCallback, useRef, useState } from "react";
import FieldKitScene from "@/components/scenes/FieldKitScene";
import HeroScene from "@/components/scenes/HeroScene";
import LogoSignalScene from "@/components/scenes/LogoSignalScene";
import ClosingScene from "@/components/scenes/ClosingScene";
import SceneTransition from "@/components/transitions/SceneTransition";
import { useI18n } from "@/components/i18n/LanguageProvider";

type SceneIndex = 1 | 2 | 3 | 4;

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

export default function SceneSequence() {
  const { isRTL, t } = useI18n();
  const [scene, setScene] = useState<SceneIndex>(1);
  const [transitionKey, setTransitionKey] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const pendingSceneRef = useRef<SceneIndex | null>(null);
  const transitioningRef = useRef(false);

  const startTransition = useCallback((nextScene: SceneIndex) => {
    if (transitioningRef.current || nextScene === scene) return;
    transitioningRef.current = true;
    pendingSceneRef.current = nextScene;
    setTransitioning(true);
    setTransitionKey((value) => value + 1);
  }, [scene]);

  const revealNextScene = useCallback(() => {
    if (pendingSceneRef.current === null) return;
    setScene(pendingSceneRef.current);
    pendingSceneRef.current = null;
  }, []);

  const finishTransition = useCallback(() => {
    transitioningRef.current = false;
    setTransitioning(false);
  }, []);

  const completeScene = useCallback(() => {
    if (scene < 4) startTransition((scene + 1) as SceneIndex);
  }, [scene, startTransition]);

  return (
    <div className="scene-shell relative isolate w-full overflow-hidden" dir={isRTL ? "rtl" : "ltr"} aria-label={t("3Mo studio introduction")} data-scene={scene}>
      <div key={scene} className="h-full w-full">
        {scene === 1 && <LogoSignalScene onComplete={completeScene} />}
        {scene === 2 && <HeroScene onComplete={completeScene} />}
        {scene === 3 && <FieldKitScene onComplete={completeScene} />}
        {scene === 4 && <ClosingScene />}
      </div>
      {scene < 4 && (
        <button
          type="button"
          disabled={transitioning}
          onClick={() => startTransition(4)}
          className="scene-intro-control absolute bottom-16 right-5 z-40 min-h-11 rounded-full border border-[#102511]/20 bg-[#f3f0e7]/95 px-4 text-xs font-medium text-[#102511] shadow-sm disabled:opacity-50 sm:right-8"
          aria-label={t("Skip to the final introduction scene")}
        >
          {t("Skip intro")}
        </button>
      )}
      <footer className={`absolute inset-x-5 bottom-5 z-20 flex justify-between text-[11px] sm:inset-x-8 ${scene === 2 ? "text-white/60" : "text-[#102511]/60"}`}>
        <span className="hidden sm:block">{t(sceneCaptions[scene])}</span>
        <span>{t(sceneLabels[scene])}</span>
      </footer>
      <SceneTransition transitionKey={transitionKey} onCovered={revealNextScene} onFinished={finishTransition} />
    </div>
  );
}
