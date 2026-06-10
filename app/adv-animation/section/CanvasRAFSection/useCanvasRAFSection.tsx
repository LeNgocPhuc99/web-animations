import { useEffect, useRef, useState } from "react";

import type { CanvasTab } from "./data";
import {
  createNoiseFieldController,
  createParticleSystemController,
  createRippleWaveController,
  type CanvasController,
} from "./canvasAnimations";

const useCanvasRAFSection = () => {
  const [activeTab, setActiveTab] = useState<CanvasTab>("particle system");

  const particleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleFpsRef = useRef<HTMLSpanElement | null>(null);
  const rippleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const noiseCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const particleControllerRef = useRef<(CanvasController & { burst: () => void }) | null>(null);
  const rippleControllerRef = useRef<CanvasController | null>(null);
  const noiseControllerRef = useRef<CanvasController | null>(null);

  useEffect(() => {
    return () => {
      particleControllerRef.current?.destroy();
      rippleControllerRef.current?.destroy();
      noiseControllerRef.current?.destroy();
    };
  }, []);

  useEffect(() => {
    particleControllerRef.current?.stop();
    rippleControllerRef.current?.stop();
    noiseControllerRef.current?.stop();
  }, [activeTab]);

  const getParticleController = () => {
    const canvas = particleCanvasRef.current;
    if (!canvas) {
      return null;
    }

    const current = particleControllerRef.current;
    if (current && current.canvas !== canvas) {
      current.destroy();
      particleControllerRef.current = null;
    }

    if (!particleControllerRef.current) {
      particleControllerRef.current = createParticleSystemController({
        canvas,
        fpsLabel: particleFpsRef.current,
      });
    }

    return particleControllerRef.current;
  };

  const getRippleController = () => {
    const canvas = rippleCanvasRef.current;
    if (!canvas) {
      return null;
    }

    const current = rippleControllerRef.current;
    if (current && current.canvas !== canvas) {
      current.destroy();
      rippleControllerRef.current = null;
    }

    if (!rippleControllerRef.current) {
      rippleControllerRef.current = createRippleWaveController({ canvas });
    }

    return rippleControllerRef.current;
  };

  const getNoiseController = () => {
    const canvas = noiseCanvasRef.current;
    if (!canvas) {
      return null;
    }

    const current = noiseControllerRef.current;
    if (current && current.canvas !== canvas) {
      current.destroy();
      noiseControllerRef.current = null;
    }

    if (!noiseControllerRef.current) {
      noiseControllerRef.current = createNoiseFieldController({ canvas });
    }

    return noiseControllerRef.current;
  };

  const toggleParticles = () => {
    getParticleController()?.toggle();
  };

  const burstParticles = () => {
    getParticleController()?.burst();
  };

  const toggleRipple = () => {
    getRippleController()?.toggle();
  };

  const toggleNoise = () => {
    getNoiseController()?.toggle();
  };

  return {
    activeTab,
    setActiveTab,
    particleCanvasRef,
    particleFpsRef,
    rippleCanvasRef,
    noiseCanvasRef,
    toggleParticles,
    burstParticles,
    toggleRipple,
    toggleNoise,
  };
};

export default useCanvasRAFSection;
