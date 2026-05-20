import { ui } from "../../classes";

import { DemoCard } from "../../components";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import './transition.css'

const TransitionsSection = () => {
  return (
    <LessonSection id="transitions">
      <DemoCard
        code={`
          <span class="k">.box</span> {<br>
          &nbsp;&nbsp;<span class="p">transition</span>: <span class="v">border-radius 0.4s ease, background 0.4s ease</span>;<br>
          }<br>
          <span class="k">.box</span>:<span class="p">hover</span> { <span class="p">border-radius</span>: <span class="v">50%</span>; }
        `}
      >
        <div className={ui.demoArea}>
          <div className={ui.stack}>
            <div
              className={cn(
                "flex h-18 w-18 cursor-pointer items-center justify-center rounded-[10px] font-mono text-[11px]",
                "text-white bg-[#5b8dee] transition-all duration-500 ease-out hover:scale-120 hover:rounded-full hover:bg-[#ee5b8d]",
              )}
            >
              hover
            </div>
            <div className={ui.caption}>hover để xem</div>
          </div>
          <div className={ui.stack}>
            <div className="delay-row flex gap-2 max-sm:flex-wrap max-sm:justify-center">
              {["0s", ".08s", ".16s", ".24s", ".32s"].map((label) => (
                <div
                  className="t-box-delay flex h-14 w-14 items-center justify-center rounded-lg font-mono text-[10px] text-white"
                  key={label}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className={ui.caption}>hover row: stagger bằng delay</div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default TransitionsSection;
