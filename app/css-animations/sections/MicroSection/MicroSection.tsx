import { useState } from "react";

import { ui } from "~/css-animations/classes";
import { createRipple } from "~/css-animations/interactions";
import { DemoCard, MagneticButton } from "~/css-animations/components";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./micro.css";

const MicroSection = () => {
  const [toggleOn, setToggleOn] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <LessonSection id="micro">
      <DemoCard
        code={`
          <span class="c">/* ripple: tạo element, animate, remove */</span><br>
          <span class="k">const</span> r = document.createElement(<span class="v">"span"</span>);<br>
          btn.appendChild(r); setTimeout(() => r.remove(), <span class="v">700</span>);
        `}
      >
        <div className={ui.demoArea}>
          <div className="flex flex-wrap items-center justify-center gap-7">
            <div className={ui.stack}>
              <MagneticButton />
              <span className={ui.caption}>magnetic hover</span>
            </div>
            <div className={ui.stack}>
              <button
                aria-label="Toggle demo"
                className={cn(
                  "border border-white/15 bg-[#1a1a24] transition",
                  "toggle relative h-7 w-13 cursor-pointer rounded-full",
                  toggleOn && "on",
                )}
                onClick={() => setToggleOn((value) => !value)}
                type="button"
              >
                <span
                  className={cn(
                    "toggle-knob absolute left-0.5 top-0.5 h-5.5 w-5.5 rounded-full bg-[#e8e8f0]",
                    "shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                  )}
                />
              </button>
              <span className={ui.caption}>spring toggle</span>
            </div>
            <div className={ui.stack}>
              <button
                aria-label="Like demo"
                className={cn(
                  "like-btn flex h-12 w-12 cursor-pointer items-center justify-center rounded-full",
                  "border border-white/15 bg-[#1a1a24] text-xl leading-none text-[#ee5b8d] transition hover:scale-110",
                  liked && "liked",
                )}
                onClick={() => setLiked((value) => !value)}
                type="button"
              >
                {liked ? "♥" : "♡"}
              </button>
              <span className={ui.caption}>like button</span>
            </div>
            <div className={ui.stack}>
              <input
                className={cn(
                  "w-50 rounded-lg border border-white/15 bg-[#1a1a24] px-3.5 py-2.5 text-sm text-[#e8e8f0]",
                  "outline-none transition focus:-translate-y-px focus:border-[#5b8dee] focus:shadow-[0_0_0_3px_rgba(91,141,238,0.2)]",
                )}
                placeholder="focus me..."
                type="text"
              />
              <span className={ui.caption}>focus lift</span>
            </div>
            <div className={ui.stack}>
              <button
                className={cn(
                  "px-6 py-2.5 font-mono text-[13px] text-[#5b8dee] transition hover:bg-[#5b8dee14]",
                  "relative cursor-pointer overflow-hidden rounded-lg border border-[#5b8dee] bg-transparent",
                )}
                onClick={createRipple}
                type="button"
              >
                ripple click
              </button>
              <span className={ui.caption}>material ripple</span>
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default MicroSection;
