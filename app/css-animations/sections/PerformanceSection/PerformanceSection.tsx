import { useState } from "react";

import { ui } from "~/css-animations/classes";
import { DemoCard } from "~/css-animations/components";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./performance.css";

const PerformanceSection = () => {
  const [running, setRunning] = useState(false);

  return (
    <LessonSection id="performance">
      <DemoCard
        code={`
          <span class="c">/* Avoid */</span> <span class="p">left</span>: <span class="v">100%</span><br>
          <span class="c">/* Prefer */</span> <span class="p">transform</span>: <span class="v">translateX(300px)</span>
        `}
        action={
          <button
            className={ui.button}
            onClick={() => setRunning((value) => !value)}
            type="button"
          >
            Start / Stop
          </button>
        }
      >
        <div className={ui.demoArea}>
          <div className="grid w-full gap-3.5">
            <div className="font-mono text-[11px] text-[#85859a]">
              Avoid: animate <code>left</code> vì dễ trigger layout reflow
            </div>
            <div className="perf-track relative h-20 overflow-hidden rounded-md bg-[#1a1a24]">
              <div
                className={cn(
                  "bad absolute left-0 top-1/2 -mt-8 flex h-16 w-16 items-center justify-center",
                  "rounded-lg border border-[#e24b4a] bg-[#e24b4a44] font-mono text-[10px] text-white",
                  running && "moving",
                )}
              >
                left
                <span className="absolute -right-2 -top-2 rounded-full bg-[#e24b4a] px-1.5 py-0.5 font-mono text-[9px] text-white">
                  CPU
                </span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-[#85859a]">
              Prefer: animate <code>transform</code> để browser composite tốt
              hơn
            </div>
            <div className="perf-track relative h-20 overflow-hidden rounded-md bg-[#1a1a24]">
              <div
                className={cn(
                  "good relative top-1/2 -mt-8 flex h-16 w-16 items-center justify-center",
                  "rounded-lg border border-[#5b8dee] bg-[#5b8dee44] font-mono text-[10px] text-white",
                  running && "moving",
                )}
              >
                transform
                <span className="absolute -right-2 -top-2 rounded-full bg-[#5beeb4] px-1.5 py-0.5 font-mono text-[9px] text-black">
                  GPU
                </span>
              </div>
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default PerformanceSection;
