import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { scrollConcepts } from "~/css-animations/data";
import { useScrollReveal } from "~/css-animations/interactions";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import { scrollPanelCode } from "./data";

import "./scroll.css";

const ScrollSection = () => {
  const { itemRefs, rootRef, visibleItems } = useScrollReveal(
    scrollConcepts.length,
  );

  return (
    <LessonSection id="scroll">
      <DemoCard code={scrollPanelCode}>
        <div className={`${ui.demoArea} p-0`}>
          <div
            className="h-80 w-full overflow-y-auto rounded-md bg-bg-surface"
            ref={rootRef}
          >
            <div className="p-8">
              <div className="flex h-18 items-center justify-center">
                <div className={ui.caption}>Cuộn xuống trong khung này</div>
              </div>
              {scrollConcepts.map(([title, copy], index) => (
                <article
                  className={cn(
                    "scroll-item mb-6 translate-x-6 rounded-md border-l-2 border-primary bg-bg-subtle",
                    "px-5 py-4 opacity-0 transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    visibleItems.has(index) && "visible",
                  )}
                  key={title}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                >
                  <h3 className="mb-1 text-md font-bold text-text-base">
                    {title}
                  </h3>
                  <p className="m-0 text-xs text-text-base/60">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
};

export default ScrollSection;
