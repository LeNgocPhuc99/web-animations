import { useEffect, useRef, useState, type ReactNode } from "react";

import type { WebAnimationAPITab } from "./data";

type WAAPIAnimation = Animation & {
  currentTime: number | null;
};

const useWebAnimationApiSection = () => {
  const [activeTab, setActiveTab] = useState<WebAnimationAPITab>(
    "element.animate()",
  );

  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const box3Ref = useRef<HTMLDivElement | null>(null);
  const box4Ref = useRef<HTMLDivElement | null>(null);
  const box5Ref = useRef<HTMLDivElement | null>(null);
  const ctrlBoxRef = useRef<HTMLDivElement | null>(null);
  const ctrlStateRef = useRef<HTMLSpanElement | null>(null);
  const ctrlTimeRef = useRef<HTMLSpanElement | null>(null);
  const ctrlSliderRef = useRef<HTMLInputElement | null>(null);

  const controlAnimRef = useRef<WAAPIAnimation | null>(null);
  const controlFrameRef = useRef<number | null>(null);

  const syncControlState = (state: string) => {
    if (ctrlStateRef.current) {
      ctrlStateRef.current.textContent = state;
    }
  };

  const syncControlTime = () => {
    const anim = controlAnimRef.current;
    if (!anim) {
      return;
    }

    const currentTime = Math.round(anim.currentTime || 0);
    if (ctrlTimeRef.current) {
      ctrlTimeRef.current.textContent = `${currentTime}ms`;
    }
    if (ctrlSliderRef.current) {
      ctrlSliderRef.current.value = `${((anim.currentTime || 0) / 2000) * 1000}`;
    }
  };

  const syncControlFrame = () => {
    syncControlTime();

    if (controlAnimRef.current?.playState === "running") {
      controlFrameRef.current = window.requestAnimationFrame(syncControlFrame);
    }
  };

  const stopControlFrame = () => {
    if (controlFrameRef.current !== null) {
      window.cancelAnimationFrame(controlFrameRef.current);
      controlFrameRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopControlFrame();
      controlAnimRef.current?.cancel();
      controlAnimRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (controlAnimRef.current) {
      controlAnimRef.current.pause();
      stopControlFrame();
      syncControlState("paused");
    }
  }, [activeTab]);

  const animateBoxes = () => {
    const boxes = [
      {
        ref: box1Ref.current,
        keys: [
          { opacity: 0, transform: "scale(0.5)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        opts: {
          duration: 600,
          easing: "cubic-bezier(0.34,1.56,0.64,1)",
          fill: "both" as const,
        },
      },
      {
        ref: box2Ref.current,
        keys: [
          { transform: "translateX(-80px)", opacity: 0 },
          { transform: "translateX(0)", opacity: 1 },
        ],
        opts: {
          duration: 700,
          easing: "cubic-bezier(0.22,1,0.36,1)",
          fill: "both" as const,
          delay: 100,
        },
      },
      {
        ref: box3Ref.current,
        keys: [{ backgroundColor: "#1c1c34" }, { backgroundColor: "#f472b6" }],
        opts: {
          duration: 800,
          easing: "ease-in-out",
          fill: "forwards" as const,
          iterations: 2,
          direction: "alternate" as const,
          delay: 200,
        },
      },
      {
        ref: box4Ref.current,
        keys: [
          { transform: "rotate(0deg)translateX(0)" },
          { transform: "rotate(360deg)translateX(0)" },
        ],
        opts: {
          duration: 1000,
          easing: "cubic-bezier(0.34,1.56,0.64,1)",
          fill: "both" as const,
          delay: 300,
        },
      },
    ];

    boxes.forEach(({ ref, keys, opts }) => {
      if (ref) {
        ref.animate(keys, opts);
      }
    });
  };

  const runKeyframeEffect = () => {
    const el = box5Ref.current;
    if (!el) {
      return;
    }

    const effect = new KeyframeEffect(
      el,
      [
        { transform: "scale(0) rotate(-180deg)", opacity: 0 },
        { transform: "scale(1.2) rotate(10deg)", opacity: 1, offset: 0.7 },
        { transform: "scale(1) rotate(0deg)", opacity: 1 },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(0.34,1.56,0.64,1)",
        fill: "both",
      },
    );
    const anim = new Animation(effect, document.timeline);
    anim.play();
  };

  const initControl = () => {
    const el = ctrlBoxRef.current;
    if (!el) {
      return;
    }

    stopControlFrame();

    controlAnimRef.current?.cancel();
    controlAnimRef.current = el.animate(
      [
        { transform: "translateX(0) rotate(0deg)" },
        { transform: "translateX(240px) rotate(360deg)" },
      ],
      {
        duration: 2000,
        easing: "cubic-bezier(0.37,0,0.63,1)",
        fill: "both",
        iterations: Infinity,
      },
    ) as WAAPIAnimation;

    controlAnimRef.current.pause();
    syncControlState("paused");
    syncControlTime();

    controlAnimRef.current.addEventListener("finish", () => {
      syncControlState("finished");
    });
  };

  const playControl = () => {
    if (!controlAnimRef.current) {
      initControl();
    }

    if (!controlAnimRef.current) {
      return;
    }

    stopControlFrame();
    controlAnimRef.current.play();
    syncControlState("running");
    syncControlFrame();
  };

  const pauseControl = () => {
    controlAnimRef.current?.pause();
    syncControlState("paused");
    syncControlTime();
  };

  const reverseControl = () => {
    controlAnimRef.current?.reverse();
    syncControlState("reversing");
    stopControlFrame();
    syncControlFrame();
  };

  const finishControl = () => {
    controlAnimRef.current?.finish();
    stopControlFrame();
    syncControlState("finished");
    syncControlTime();
  };

  const seekControl = (value: number) => {
    const anim = controlAnimRef.current;
    if (!anim) {
      return;
    }

    anim.currentTime = (value / 1000) * 2000;
    anim.pause();
    stopControlFrame();
    syncControlState("paused");
    syncControlTime();
  };

  const actions: Record<WebAnimationAPITab, ReactNode> = {
    "element.animate()": (
      <button className="btn btn-adv" onClick={animateBoxes}>
        ▶ Play
      </button>
    ),
    KeyframeEffect: (
      <button className="btn btn-adv" onClick={runKeyframeEffect}>
        ▶ Play
      </button>
    ),
    "playback control": (
      <div className="flex flex-wrap gap-2">
        <button className="btn btn-adv" onClick={initControl}>
          init
        </button>
        <button className="btn" onClick={playControl}>
          play
        </button>
        <button className="btn" onClick={pauseControl}>
          pause
        </button>
        <button className="btn" onClick={reverseControl}>
          reverse
        </button>
        <button className="btn" onClick={finishControl}>
          finish
        </button>
      </div>
    ),
    "vs CSS vs GSAP": undefined,
  };

  return {
    activeTab,
    actions,
    setActiveTab,
    box1Ref,
    box2Ref,
    box3Ref,
    box4Ref,
    box5Ref,
    ctrlBoxRef,
    ctrlSliderRef,
    ctrlStateRef,
    ctrlTimeRef,
    initControl,
    playControl,
    pauseControl,
    reverseControl,
    finishControl,
    seekControl,
  };
};

export default useWebAnimationApiSection;
