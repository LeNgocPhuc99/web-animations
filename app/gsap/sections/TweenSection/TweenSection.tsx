import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import GSAPSection from "../GSAPSection";

import { gBox, gsapLaneClass, gsapLaneNameClass } from "~/gsap/classes";
import { cn } from "~/lib/utils";

import { tweenTabs, tweenPanelCode, type TweenTab } from "./data";

import "./tween.css";

gsap.registerPlugin(useGSAP);

const TweenSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TweenTab>("gsap.to()");

  const { contextSafe } = useGSAP({ scope: scopeRef });

  /**
   *  Giúp GSAP biết “cái gì thuộc về component này” để dọn sạch về trạng thái ban đầu
   *  => tránh leak và tránh animation chạy trên DOM đã bị gỡ
   */
  const runTo = contextSafe(() => {
    gsap.to("#toBox", {
      x: 200,
      rotation: 360,
      scale: 1.4,
      duration: 1,
      ease: "power2.out",
    });
  });

  const resetTo = contextSafe(() => {
    gsap.killTweensOf("#toBox");
    gsap.set("#toBox", { clearProps: "all" });
  });

  const runFrom = contextSafe(() => {
    gsap.set("#fromBox", {
      x: 0,
      opacity: 1,
    });
    gsap.from("#fromBox", {
      x: -200,
      opacity: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
    });
  });

  const resetFrom = contextSafe(() => {
    gsap.killTweensOf("#fromBox");
    gsap.set("#fromBox", { clearProps: "all" });
  });

  const runFromTo = contextSafe(() => {
    gsap.fromTo(
      "#ftBox",
      {
        x: -160,
        opacity: 0,
        scale: 0.5,
      },
      {
        x: 160,
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: "elastic.out(1, 0.5)",
      },
    );
  });

  const resetFromTo = contextSafe(() => {
    gsap.killTweensOf("#ftBox");
    gsap.set("#ftBox", { clearProps: "all" });
  });

  const runCompare = contextSafe(() => {
    gsap.set(["#cmpTo", "#cmpFrom", "#cmpFt"], {
      x: 0,
      opacity: 1,
    });
    gsap.to("#cmpTo", {
      x: 120,
      duration: 0.8,
      ease: "power2.out",
      delay: 0,
    });
    gsap.from("#cmpFrom", {
      x: 120,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.1,
    });
    gsap.fromTo(
      "#cmpFt",
      {
        x: -120,
        opacity: 0,
      },
      {
        x: 120,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.5)",
        delay: 0.2,
      },
    );
  });

  const resetCompare = contextSafe(() => {
    gsap.killTweensOf("#cmpTo");
    gsap.set("#cmpTo", { clearProps: "all" });

    gsap.killTweensOf("#cmpFrom");
    gsap.set("#cmpFrom", { clearProps: "all" });

    gsap.killTweensOf("#cmpFt");
    gsap.set("#cmpFt", { clearProps: "all" });
  });

  const action = (() => {
    switch (activeTab) {
      case "gsap.to()":
        return (
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn btn-green" onClick={runTo} type="button">
              ▶ Play
            </button>
            <button className="btn" onClick={resetTo} type="button">
              ↺ Reset
            </button>
          </div>
        );
      case "gsap.from()":
        return (
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn btn-green" onClick={runFrom}>
              ▶ Play
            </button>
            <button className="btn" onClick={resetFrom}>
              ↺ Reset
            </button>
          </div>
        );
      case "gsap.fromTo()":
        return (
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn btn-green" onClick={runFromTo}>
              ▶ Play
            </button>
            <button className="btn" onClick={resetFromTo}>
              ↺ Reset
            </button>
          </div>
        );
      case "so sánh":
        return (
          <div className="flex items-center gap-2 flex-wrap">
            <button className="btn btn-green" onClick={runCompare}>
              ▶ Play All
            </button>
            <button className="btn" onClick={resetCompare}>
              ↺ Reset
            </button>
          </div>
        );
      default:
        return undefined;
    }
  })();

  return (
    <GSAPSection id="tween">
      <DemoCard code={tweenPanelCode[activeTab]} action={action}>
        <div ref={scopeRef}>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as TweenTab)}
          >
            <TabList>
              {tweenTabs.map((tab) => (
                <TabItem key={tab.value} value={tab.value}>
                  {tab.label}
                </TabItem>
              ))}
            </TabList>
            <TabPanel value="gsap.to()">
              <div className={ui.demoArea}>
                <div className={gBox} id="toBox">
                  to
                </div>
              </div>
            </TabPanel>
            <TabPanel value="gsap.from()">
              <div className={ui.demoArea}>
                <div className={gBox} id="fromBox">
                  from
                </div>
              </div>
            </TabPanel>
            <TabPanel value="gsap.fromTo()">
              <div className={ui.demoArea}>
                <div className={gBox} id="ftBox">
                  fromTo
                </div>
              </div>
            </TabPanel>
            <TabPanel value="so sánh">
              <div className={cn(ui.demoArea, "flex-col justify-start")}>
                <div className="flex w-full flex-col gap-2">
                  <div className={gsapLaneClass}>
                    <div className={gsapLaneNameClass}>hiện tại → target</div>
                    <div id="cmpTo" className={gBox}>
                      .to()
                    </div>
                  </div>
                  <div className={gsapLaneClass}>
                    <div className={gsapLaneNameClass}>target → hiện tại</div>
                    <div id="cmpFrom" className={cn(gBox, "bg-primary")}>
                      .from()
                    </div>
                  </div>
                  <div className={gsapLaneClass}>
                    <div className={gsapLaneNameClass}>định nghĩa cả </div>
                    <div id="cmpFt" className={cn(gBox, "bg-secondary")}>
                      .fromTo()
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </DemoCard>
    </GSAPSection>
  );
};

export default TweenSection;
