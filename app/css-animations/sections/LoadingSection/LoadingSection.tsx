import { ui } from "~/css-animations/classes";
import { DemoCard } from "~/css-animations/components";
import { useProgress } from "~/css-animations/interactions";

import LessonSection from "../LessonSection";

import "./loading.css";

const LoadingSection = () => {
  const progress = useProgress();

  return (
    <LessonSection id="loading">
      <DemoCard
        code={`
          <span class="k">.skel</span> { <span class="p">position</span>: relative; <span class="p">overflow</span>: hidden; }<br>
          <span class="k">.skel::after</span> {<br>
          &nbsp;&nbsp;<span class="p">content</span>: ""; <span class="p">position</span>: absolute; <span class="p">inset</span>: 0;<br>
          &nbsp;&nbsp;<span class="p">transform</span>: translateX(-100%);<br>
          &nbsp;&nbsp;<span class="p">background</span>: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);<br>
          &nbsp;&nbsp;<span class="p">animation</span>: <span class="v">shimmer 1.6s infinite</span>;<br>
          &nbsp;&nbsp;<span class="p">will-change</span>: transform;<br>
          }<br>
          <span class="k">@keyframes</span> shimmer { <span class="v">to</span> { <span class="p">transform</span>: translateX(100%); } }
        `}
      >
        <div className={ui.demoArea}>
          <div className="flex flex-wrap items-center justify-center gap-9">
            <div className={ui.stack}>
              <div className="loading-spin h-10 w-10 rounded-full border-[3px] border-[#1a1a24] border-t-[#5b8dee]" />
              <span className={ui.caption}>spinner</span>
            </div>
            <div className={ui.stack}>
              <div className="flex gap-1.5">
                <div className="loading-dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
                <div className="loading-dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
                <div className="loading-dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
              </div>
              <span className={ui.caption}>typing dots</span>
            </div>
            <div className={ui.stack}>
              <div className="flex w-50 flex-col gap-2">
                <div className="loading-skel h-4 w-full rounded" />
                <div className="loading-skel h-3 w-3/4 rounded" />
                <div className="loading-skel h-3 w-full rounded" />
                <div className="loading-skel h-3 w-1/2 rounded" />
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
