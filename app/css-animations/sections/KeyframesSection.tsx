import { useState } from "react";

import { ui } from "../classes";

import { DemoCard } from "../components";

import LessonSection from "./LessonSection";

import { cn } from "~/lib/utils";

const KeyframesSection = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <LessonSection id="keyframes">
      <DemoCard
        code={`
          <span class="c">/* @keyframes định nghĩa các bước */</span><br>
          <span class="k">@keyframes</span> <span class="p">bounce</span> {<br>
          &nbsp;&nbsp;<span class="v">from</span> { <span class="p">transform</span>: translateY(0); }<br>
          &nbsp;&nbsp;<span class="v">to</span>&nbsp;&nbsp; { <span class="p">transform</span>: translateY(-50px); }<br>
          }<br>
          <span class="k">.el</span> { <span class="p">animation</span>: <span class="v">bounce 1s ease infinite alternate</span>; }
        `}
        action={
          <button
            className={ui.button}
            onClick={() => setPlaying((value) => !value)}
            type="button"
          >
            Play / Pause
          </button>
        }
      >
        <div className={`${ui.demoArea} min-h-45 gap-10`}>
          <div className={ui.stack}>
            <div className="flex h-20 items-end">
              <div
                className={cn(
                  "kf-orb h-15 w-15 rounded-full bg-[#5b8dee]",
                  playing && "playing",
                )}
              />
            </div>
            <div className={ui.caption}>bounce + color</div>
          </div>
          <div className={ui.stack}>
            <div
              className={cn(
                "kf-spin h-12 w-12 rounded-full border-[3px] border-white/15 border-t-[#5beeb4]",
                playing && "playing",
              )}
            />
            <div className={ui.caption}>spin linear</div>
          </div>
          <div className={ui.stack}>
            <div
              className={cn(
                "kf-flash rounded-lg border border-white/15 bg-[#1a1a24] px-6 py-2.5 font-mono text-[13px] text-[#e8e8f0]",
                playing && "playing",
              )}
            >
              flash
            </div>
            <div className={ui.caption}>color flash</div>
          </div>
          <div className={ui.stack}>
            <div
              className={cn(
                "kf-shake inline-block rounded-lg border border-white/15 px-3.5 py-2.5 font-mono text-lg text-[#eec85b]",
                playing && "playing",
              )}
            >
              shake
            </div>
            <div className={ui.caption}>shake</div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default KeyframesSection;
