import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { gBox, gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { cn } from "~/lib/utils";

import {
  staggerTabs,
  staggerBars,
  panelTabsCode,
  type StaggerTab,
} from "./data";

import GSAPSection from "../GSAPSection";

import "./stagger.css";

gsap.registerPlugin(useGSAP);

const StaggerSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<StaggerTab>("stagger cơ bản");

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const runBasicStagger = contextSafe(() => {
    gsap.killTweensOf("#stagBarsBasic .stag-bar");
    gsap.killTweensOf("#stagDots .stag-dot");

    gsap.fromTo(
      "#stagBarsBasic .stag-bar",
      { scaleY: 0, opacity: 0, transformOrigin: "bottom" },
      {
        scaleY: 1,
        opacity: 1,
        duration: 0.6,
        ease: "back.out(1.5)",
        stagger: 0.07,
      },
    );

    gsap.fromTo(
      "#stagDots .stag-dot",
      { opacity: 0, y: 20, scale: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: 0.1,
        delay: 0.2,
      },
    );
  });

  const runStaggerObject = contextSafe(() => {
    gsap.killTweensOf("#stagEach .stag-dot");
    gsap.killTweensOf("#stagAmount .stag-dot");

    gsap.fromTo(
      "#stagEach .stag-dot",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { each: 0.12, ease: "power2.in" },
      },
    );

    gsap.fromTo(
      "#stagAmount .stag-dot",
      { opacity: 0, scale: 0 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(2)",
        delay: 0.1,
        stagger: { amount: 0.5, ease: "power2.in" },
      },
    );
  });

  const runStaggerFrom = contextSafe(
    (from: "start" | "end" | "center" | number) => {
      gsap.killTweensOf("#stagFromGrid .stag-from-box");
      gsap.fromTo(
        "#stagFromGrid .stag-from-box",
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "back.out(1.5)",
          stagger: { each: 0.05, from },
        },
      );
    },
  );

  const actions = (() => {
    switch (activeTab) {
      case "stagger cơ bản":
        return (
          <button
            className="btn btn-green"
            type="button"
            onClick={runBasicStagger}
          >
            ▶ Play
          </button>
        );
      case "stagger object":
        return (
          <button
            className="btn btn-green"
            type="button"
            onClick={runStaggerObject}
          >
            ▶ Play
          </button>
        );
      case "from: center / end":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <button
              className="btn btn-green"
              type="button"
              onClick={() => runStaggerFrom("start")}
            >
              start
            </button>
            <button
              className="btn btn-blue"
              type="button"
              onClick={() => runStaggerFrom("end")}
            >
              end
            </button>
            <button
              className="btn btn-pink"
              type="button"
              onClick={() => runStaggerFrom("center")}
            >
              center
            </button>
            <button
              className="btn btn-yellow"
              type="button"
              onClick={() => runStaggerFrom(7)}
            >
              index 7
            </button>
          </div>
        );
    }
  })();

  return (
    <GSAPSection id="stagger">
      <DemoCard code={panelTabsCode[activeTab]} action={actions}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as StaggerTab)}
        >
          <TabList>
            {staggerTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="stagger cơ bản">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-6 items-stretch py-6 px-8",
                )}
              >
                <p className={gsapDemoLabel}>bar chart stagger</p>
                <div
                  id="stagBarsBasic"
                  className="flex gap-2 items-end px-4 py-0"
                >
                  {staggerBars.map((height, index) => (
                    <div
                      key={`${height}-${index}`}
                      className="stag-bar"
                      style={{ height: height }}
                    />
                  ))}
                </div>
                <p className={gsapDemoLabel}>fade up stagger</p>
                <div id="stagDots" className="stag-dots">
                  {Array.from({ length: 5 }, (_, index) => (
                    <div key={`stag-dot-${index}`} className="stag-dot" />
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="stagger object">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-4 items-stretch px-8 py-6",
                )}
              >
                <p className={gsapDemoLabel}>each vs amount</p>
                <div className="flex gap-8 flex-wrap">
                  <div>
                    <p className={cn(gsapDemoLabel, "mb-2")}>
                      each: 0.1 — delay giữa các item
                    </p>
                    <div id="stagEach" className="flex gap-1.5">
                      {Array.from({ length: 5 }, (_, index) => (
                        <div
                          key={`stagger-each-${index}`}
                          className={cn("stag-dot")}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "var(--color-primary)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className={cn(gsapDemoLabel, "mb-2")}>
                      amount: 0.5 — tổng thời gian stagger
                    </p>
                    <div id="stagAmount" className="flex gap-1.5">
                      {Array.from({ length: 5 }, (_, index) => (
                        <div
                          key={`stagger-amount-${index}`}
                          className={cn("stag-dot")}
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "var(--color-secondary)",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="from: center / end">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-4 items-stretch px-8 py-6",
                )}
              >
                <div id="stagFromGrid" className="grid grid-cols-5 gap-2">
                  {Array.from({ length: 15 }, (_, index) => (
                    <div
                      key={`stagger-from-${index}`}
                      className="stag-from-box"
                    />
                  ))}
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default StaggerSection;
