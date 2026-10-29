"use client";

import { useCallback, useRef, useState } from "react";
import FieldKitScene from "@/components/scenes/FieldKitScene";
import HeroScene from "@/components/scenes/HeroScene";
import LogoSignalScene from "@/components/scenes/LogoSignalScene";
import ClosingScene from "@/components/scenes/ClosingScene";
import SceneTransition from "@/components/transitions/SceneTransition";

type SceneIndex = 1 | 2 | 3 | 4;

export default function SceneSequence() {
  const [scene, setScene] = useState<SceneIndex>(1);
  const [transitionKey, setTransitionKey] = useState(0);
  const pendingSceneRef = useRef<SceneIndex | null>(null);
  const transitioningRef = useRef(false);

  const startTransition = useCallback((nextScene: SceneIndex) => {
    if (transitioningRef.current || nextScene === scene) return;
    transitioningRef.current = true;
    pendingSceneRef.current = nextScene;
    setTransitionKey((value) => value + 1);
  }, [scene]);

  const revealNextScene = useCallback(() => {
    if (pendingSceneRef.current === null) return;
    setScene(pendingSceneRef.current);
    pendingSceneRef.current = null;
  }, []);

  const finishTransition = useCallback(() => {
    transitioningRef.current = false;
  }, []);

  const completeScene = useCallback(() => {
    if (scene < 4) startTransition((scene + 1) as SceneIndex);
  }, [scene, startTransition]);

  return (
    <div className="scene-shell relative isolate w-full overflow-hidden" aria-label="3Mo studio introduction">
      <div key={scene} className="h-full w-full">
        {scene === 1 && <LogoSignalScene onComplete={completeScene} />}
        {scene === 2 && <HeroScene onComplete={completeScene} />}
        {scene === 3 && <FieldKitScene onComplete={completeScene} />}
        {scene === 4 && <ClosingScene />}
      </div>
      <button
        type="button"
        onClick={() => startTransition(scene === 4 ? 1 : 4)}
        className="absolute bottom-14 right-5 z-40 min-h-11 rounded-full border border-[#102511]/20 bg-[#f3f0e7]/95 px-4 text-xs font-medium text-[#102511] shadow-sm sm:bottom-16 sm:right-8"
        aria-label={scene === 4 ? "Replay the four-scene introduction" : "Skip to the final introduction scene"}
      >
        {scene === 4 ? "Replay intro" : "Skip intro"}
      </button>
      <SceneTransition transitionKey={transitionKey} onCovered={revealNextScene} onFinished={finishTransition} />
    </div>
  );
}
