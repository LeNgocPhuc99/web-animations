import { ui } from "../classes";
import { useProgress } from "../interactions";
import { DemoCard } from "../components";

import LessonSection from "./LessonSection";

const LoadingSection = () => {
  const progress = useProgress();

  return (
    <LessonSection id="loading">
      <DemoCard
        code={`
          <span class="k">@keyframes</span> shimmer {<br>
          &nbsp;&nbsp;<span class="v">from</span> { <span class="p">background-position</span>: <span class="v">200% 0</span>; }<br>
          &nbsp;&nbsp;<span class="v">to</span>&nbsp;&nbsp; { <span class="p">background-position</span>: <span class="v">-200% 0</span>; }<br>
          }
        `}
      >
        <div className={ui.demoArea}>
          <div className="flex flex-wrap items-center justify-center gap-9">
            <div className={ui.stack}>
              <div className="spinner h-10 w-10 rounded-full border-[3px] border-[#1a1a24] border-t-[#5b8dee]" />
              <span className={ui.caption}>spinner</span>
            </div>
            <div className={ui.stack}>
              <div className="flex gap-1.5">
                <div className="dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
                <div className="dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
                <div className="dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
              </div>
              <span className={ui.caption}>typing dots</span>
            </div>
            <div className={ui.stack}>
              <div className="flex w-50 flex-col gap-2">
                <div className="skel h-4 w-full rounded" />
                <div className="skel h-3 w-3/4 rounded" />
                <div className="skel h-3 w-full rounded" />
                <div className="skel h-3 w-1/2 rounded" />
              </div>
              <span className={ui.caption}>skeleton shimmer</span>
            </div>
            <div className={ui.stack}>
              <div className="w-50">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a1a24]">
                  <div
                    className="h-full rounded-full bg-[#5beeb4] transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress.value}%` }}
                  />
                </div>
                <div className="mt-1.5 text-center font-mono text-[11px] text-[#85859a]">
                  {Math.round(progress.value)}%
                </div>
              </div>
              <button
                className={ui.button}
                disabled={progress.running}
                onClick={progress.run}
                type="button"
              >
                Run
              </button>
              <span className={ui.caption}>progress bar</span>
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default LoadingSection;
