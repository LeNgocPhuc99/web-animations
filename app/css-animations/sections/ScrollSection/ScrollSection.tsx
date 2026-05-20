import { ui } from "~/css-animations/classes";
import { DemoCard } from "~/css-animations/components";
import { scrollConcepts } from "~/css-animations/data";
import { useScrollReveal } from "~/css-animations/interactions";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./scroll.css";

const ScrollSection = () => {
  const { itemRefs, rootRef, visibleItems } = useScrollReveal(
    scrollConcepts.length,
  );

  return (
    <LessonSection id="scroll">
      <DemoCard
        code={`
          <span class="k">const</span> obs = <span class="k">new</span> <span class="p">IntersectionObserver</span>((entries) => {<br>
          &nbsp;&nbsp;entries.forEach(e => e.target.classList.toggle(<span class="v">"visible"</span>, e.isIntersecting));<br>
          }, { <span class="p">threshold</span>: <span class="v">0.25</span>, <span class="p">root</span>: scrollContainer });
        `}
      >
        <div className={`${ui.demoArea} p-0`}>
          <div
            className="h-80 w-full overflow-y-auto rounded-md bg-[#1a1a24]"
            ref={rootRef}
          >
            <div className="p-8">
              <div className="flex h-18 items-center justify-center">
                <div className={ui.caption}>Cuộn xuống trong khung này</div>
              </div>
              {scrollConcepts.map(([title, copy], index) => (
                <article
                  className={cn(
                    "scroll-item mb-6 translate-x-6 rounded-md border-l-2 border-[#5b8dee] bg-[#111118]",
                    "px-5 py-4 opacity-0 transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                    visibleItems.has(index) && "visible",
                  )}
                  key={title}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                >
                  <h3 className="mb-1 text-[15px] font-bold text-[#e8e8f0]">
                    {title}
                  </h3>
                  <p className="m-0 text-[13px] text-[#85859a]">{copy}</p>
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
