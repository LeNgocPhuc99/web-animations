import { useState } from "react";

import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { createRipple } from "~/css-animations/interactions";
import { MagneticButton } from "~/css-animations/components";

import CSSLessonSection from "../CSSLessonSection";

import { cn } from "~/lib/utils";

import { microPanelCode } from "./data";
import "./micro.css";

const MicroSection = () => {
  const [toggleOn, setToggleOn] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <CSSLessonSection id="micro">
      <DemoCard code={microPanelCode}>
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
                    "toggle-knob absolute left-0.5 top-0.5 h-5.5 w-5.5 rounded-full bg-bg-foreground",
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
                  "border border-white/15 bg-bg-surface text-xl leading-none text-secondary transition hover:scale-110",
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
                  "w-50 rounded-lg border border-white/15 bg-bg-surface px-3.5 py-2.5 text-sm text-text-base",
                  "outline-none transition focus:-translate-y-px focus:border-primary focus:shadow-[0_0_0_3px_rgba(91,141,238,0.2)]",
                )}
                placeholder="focus me..."
                type="text"
              />
              <span className={ui.caption}>focus lift</span>
            </div>
            <div className={ui.stack}>
              <button
                className={cn(
                  "px-6 py-2.5 font-mono text-[13px] text-primary transition hover:bg-bg-surface",
                  "relative cursor-pointer overflow-hidden rounded-lg border border-primary bg-transparent",
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
    </CSSLessonSection>
  );
};

export default MicroSection;
