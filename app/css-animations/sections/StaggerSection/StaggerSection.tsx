import { useEffect, useRef, useState } from "react";

import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { staggerBars, staggerWords } from "~/css-animations/data";

import LessonSection from "../LessonSection";

import { staggerPanelCode } from "./data";

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
        code={staggerPanelCode}
        action={
          <button className={ui.button} onClick={playStagger} type="button">
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
                  className={`w-8 origin-bottom rounded-t bg-primary duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
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
