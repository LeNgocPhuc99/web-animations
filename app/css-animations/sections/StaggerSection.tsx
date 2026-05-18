import { useEffect, useRef, useState } from "react";

import { ui } from "../classes";
import { staggerBars, staggerWords } from "../data";

import { DemoCard } from "../components";

import LessonSection from "./LessonSection";

const StaggerSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const playTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (playTimerRef.current) {
        window.clearTimeout(playTimerRef.current);
      }
    };
  }, []);

  const playStagger = () => {
    if (playTimerRef.current) {
      window.clearTimeout(playTimerRef.current);
    }

    setIsResetting(true);
    setIsRevealed(false);

    playTimerRef.current = window.setTimeout(() => {
      setIsResetting(false);
      setIsRevealed(true);
    }, 50);
  };

  return (
    <LessonSection id="stagger">
      <DemoCard
        code={`
          <span class="c">/* CSS: delay tăng theo index */</span><br>
          <span class="k">.bar</span>:nth-child(n) { <span class="p">transition-delay</span>: <span class="v">calc(n * 0.06s)</span>; }<br>
          <span class="c">/* GSAP: */</span> gsap.to(".bar", { <span class="p">stagger</span>: <span class="v">0.06</span>, scaleY: <span class="v">1</span> });
        `}
        action={
          <button
            className={ui.button}
            onClick={playStagger}
            type="button"
          >
            Play
          </button>
        }
      >
        <div className={`${ui.demoArea} flex-col gap-6`}>
          <div className={ui.stack}>
            <div className={ui.caption}>bar chart stagger</div>
            <div className="flex items-end gap-2">
              {staggerBars.map((height, index) => (
                <div
                  className={`w-8 origin-bottom rounded-t bg-[#5b8dee] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                    isResetting ? "transition-none" : "transition"
                  }`}
                  key={`${height}-${index}`}
                  style={{
                    height,
                    opacity: isRevealed ? 1 : 0,
                    transform: isRevealed ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: `${index * 0.06}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 text-2xl font-bold">
            {staggerWords.map((word, index) => (
              <span
                className={`inline-block duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  isResetting ? "transition-none" : "transition"
                }`}
                key={word}
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 0.08 + 0.6}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default StaggerSection;
