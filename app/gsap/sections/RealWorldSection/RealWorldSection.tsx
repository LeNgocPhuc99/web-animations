import { useState, useRef, type MouseEvent } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import GSAPSection from "../GSAPSection";

import {
  navItems,
  realWorldTabs,
  panelTabsCode,
  type RealWorldTab,
} from "./data";

import "./real-world.css";

const RealWorldSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<RealWorldTab>("page entrance");

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const runPageEntrance = contextSafe(() => {
    const targets = ["#rwTitle", "#rwSubtitle", "#rwBtns"];

    gsap.killTweensOf(targets);
    gsap.set(targets, { opacity: 0, y: 0 });

    const tl = gsap.timeline();

    tl.fromTo(
      "#rwTitle",
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
    )
      .fromTo(
        "#rwSubtitle",
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3",
      )
      .fromTo(
        "#rwBtns",
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" },
        "-=0.2",
      );
  });

  const gsapHoverEnter = contextSafe((event: MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      y: -7,
      scale: 1.02,
      duration: 0.35,
      ease: "back.out(2)"
    });
  });

  const gsapHoverLeave = contextSafe((event: MouseEvent<HTMLDivElement>) => {
    gsap.to(event.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  const runCounters = contextSafe(() => {
    const counters = [
      { id: "cnt1", target: 12450 },
      { id: "cnt2", target: 386 },
      { id: "cnt3", target: 98241 },
    ];

    counters.forEach(({ id, target }, index) => {
      const el = scopeRef.current?.querySelector<HTMLElement>(`#${id}`);

      if (!el) return;

      const obj = { val: 0 };

      gsap.to(obj, {
        val: target,
        duration: 2,
        ease: "power2.out",
        delay: index * 0.12,
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toLocaleString("vi-VN");
        },
      });
    });
  });

  const runNavReveal = contextSafe(() => {
    gsap.set(".rw-nav-item", { x: -24, opacity: 0 });
    gsap.to(".rw-nav-item", {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      stagger: 0.2,
      // clearProps: "all",
    });
  });

  const action = (() => {
    switch (activeTab) {
      case "page entrance":
        return (
          <button className="btn btn-green" onClick={runPageEntrance}>
            ▶ Play
          </button>
        );
      case "counter":
        return (
          <button className="btn btn-green" onClick={runCounters}>
            ▶ Count
          </button>
        );
      case "nav reveal":
        return (
          <button className="btn btn-green" onClick={runNavReveal}>
            ▶ Play
          </button>
        );
      default:
        return undefined;
    }
  })();

  return (
    <GSAPSection id="real-world">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as RealWorldTab)}
        >
          <TabList>
            {realWorldTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="page entrance">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-3 items-stretch py-6 px-8",
                )}
              >
                <h4
                  id="rwTitle"
                  className="font-mono font-bold text-2xl opacity-0"
                >
                  Animation makes it feel alive.
                </h4>
                <p
                  id="rwSubtitle"
                  className="text-sm text-text-muted opacity-0"
                >
                  Sử dụng gsap.from() với stagger để tạo entrance sequence tự
                  nhiên.
                </p>
                <div
                  id="rwBtns"
                  className="flex gap-2.5 items-center opacity-0"
                >
                  <button className="btn-green">Get started</button>
                  <button className="btn">Learn more</button>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="hover card">
              <div className={cn(ui.demoArea, "gap-6 flex-wrap")}>
                <div
                  id="hoverCard"
                  className="rw-card w-55 cursor-pointer"
                  onMouseEnter={gsapHoverEnter}
                  onMouseLeave={gsapHoverLeave}
                >
                  <p className="text-[16px] font-bold mb-1.5">Card hover</p>
                  <p className="text-sm text-text-muted">
                    Hover để xem GSAP animate card lift — mượt hơn CSS
                    transition vì có spring easing.
                  </p>
                </div>
                <div className="flex-1 min-w-55 bg-bg-surface rounded-md py-3 px-3.5 text-xs text-text-muted">
                  Dùng <code>onmouseenter/leave</code> thay CSS{" "}
                  <code>:hover</code> khi cần kiểm soát animation — GSAP tự xử
                  lý interrupt nếu hover nhanh.
                </div>
              </div>
            </TabPanel>
            <TabPanel value="counter">
              <div className={cn(ui.demoArea, "gap-10 flex-wrap")}>
                <div className="text-center">
                  <p id="cnt1" className="rw-number-wrap text-gsap">
                    0
                  </p>
                  <p className={gsapDemoLabel}>users</p>
                </div>
                <div className="text-center">
                  <p id="cnt2" className="rw-number-wrap text-pink-400">
                    0
                  </p>
                  <p className={gsapDemoLabel}>projects</p>
                </div>
                <div className="text-center">
                  <p id="cnt3" className="rw-number-wrap text-green-400">
                    0
                  </p>
                  <p className={gsapDemoLabel}>deploys</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="nav reveal">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-2 items-stretch py-6 px-8",
                )}
              >
                <div id="rwNavList" className="flex flex-col gap-1.5 max-w-70">
                  {navItems.map((nav, index) => (
                    <div key={`${nav.label}-${index}`} className="rw-nav-item">
                      {nav.icon} <span>{nav.label}</span>
                    </div>
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

export default RealWorldSection;
