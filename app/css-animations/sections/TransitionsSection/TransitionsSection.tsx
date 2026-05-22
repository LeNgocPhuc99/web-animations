import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";

import CSSLessonSection from "../CSSLessonSection";

import { cn } from "~/lib/utils";

import { transitionPanelCode } from "./data";

import "./transition.css";

const TransitionsSection = () => {
  return (
    <CSSLessonSection id="transitions">
      <DemoCard code={transitionPanelCode}>
        <div className={ui.demoArea}>
          <div className={ui.stack}>
            <div
              className={cn(
                "flex h-18 w-18 cursor-pointer items-center justify-center rounded-[10px] font-mono text-xs",
                "text-white bg-primary transition-all duration-500 ease-out hover:scale-120 hover:rounded-full hover:bg-secondary",
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
    </CSSLessonSection>
  );
};

export default TransitionsSection;
