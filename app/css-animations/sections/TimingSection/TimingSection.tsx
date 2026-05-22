import { useRef, useState } from "react";

import {
  laneClass,
  laneNameClass,
  laneBallClass,
  laneTrackClass,
} from "~/css-animations/classes";

import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { timings } from "~/css-animations/data";

import CSSLessonSection from "../CSSLessonSection";

import { timingPanelCode } from "./data";

import "./timing.css";

const TimingSection = () => {
  const ballRefs = useRef<Array<HTMLDivElement | null>>([]);
  const raceRunningRef = useRef(false);
  const [, setRaceRunning] = useState(false);

  const runRace = () => {
    if (raceRunningRef.current) return;

    raceRunningRef.current = true;
    setRaceRunning(true);
    const duration = 1.2;

    timings.forEach((timing, index) => {
      const ball = ballRefs.current[index];
      const track = ball?.parentElement;
      if (!ball || !track) return;

      const maxLeft = track.clientWidth - 36;
      ball.style.transition = "none";
      ball.style.left = "4px";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ball.style.transition = `left ${duration}s ${timing}`;
          ball.style.left = `${maxLeft}px`;
        });
      });
    });

    window.setTimeout(
      () => {
        raceRunningRef.current = false;
        setRaceRunning(false);
      },
      (duration + 0.5) * 1000,
    );
  };

  return (
    <CSSLessonSection id="timing">
      <DemoCard
        code={timingPanelCode}
        action={
          <button className={ui.button} onClick={runRace} type="button">
            Race
          </button>
        }
      >
        <div className={`${ui.demoArea} justify-start`}>
          <div className="flex w-full max-w-155 flex-col gap-2">
            {timings.map((name, index) => (
              <div className={laneClass} key={name}>
                <span className={laneNameClass}>
                  {index === 5 ? "spring" : name}
                </span>
                <div className={laneTrackClass}>
                  <div
                    className={laneBallClass}
                    ref={(node) => {
                      ballRefs.current[index] = node;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DemoCard>
    </CSSLessonSection>
  );
};

export default TimingSection;
