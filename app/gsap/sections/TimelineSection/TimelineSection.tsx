import { useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gsapDemoLabel, gBox } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import {
  tl1,
  tl2,
  tl3,
  timelineTabs,
  panelTabsCode,
  timelineTicks,
  timelineBlocks,
  tlPositionCards,
  getTlPositionCode,
  tlPositionConfigs,
  tlPositionTimingGuides,
  type TimelineTab,
  type TlPositionType,
} from "./data";

import GSAPSection from "../GSAPSection";

import "./timeline.css";

gsap.registerPlugin(useGSAP);

const TimelineSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const tlBasicRef = useRef<gsap.core.Timeline | null>(null);
  const tlPosRef = useRef<gsap.core.Timeline | null>(null);
  const tlControl = useRef<gsap.core.Timeline | null>(null);
  const tlNestedRef = useRef<gsap.core.Timeline | null>(null);

  const [activeTab, setActiveTab] = useState<TimelineTab>("timeline cơ bản");
  const [activeTlPosition, setActiveTlPosition] =
    useState<TlPositionType>('"1.5" — absolute');

  const [tlParams, setTlParam] = useState<{
    tlProgress: string;
    tlTime: string;
    tlSeek: number;
    tlScale: number;
  }>({
    tlProgress: "0.000",
    tlTime: "0.00",
    tlSeek: 0,
    tlScale: 1,
  });

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const updateTlControlParams = (tl: gsap.core.Timeline) => {
    setTlParam((prev) => ({
      ...prev,
      tlProgress: tl.progress().toFixed(3),
      tlTime: tl.time().toFixed(2),
      tlSeek: tl.progress() * 100,
    }));
  };

  const resetTlControlParams = () => {
    setTlParam({
      tlProgress: "0.000",
      tlTime: "0.00",
      tlSeek: 0,
      tlScale: 1,
    });
  };

  const stopTimelineDemos = () => {
    tlBasicRef.current?.kill();
    tlPosRef.current?.kill();
    tlControl.current?.kill();
    tlNestedRef.current?.kill();

    tlBasicRef.current = null;
    tlPosRef.current = null;
    tlControl.current = null;
    tlNestedRef.current = null;

    resetTlControlParams();
  };

  const initTlControl = () => {
    if (tlControl.current) {
      return tlControl.current;
    }

    const q = gsap.utils.selector(scopeRef);
    const box = q("#tlCtrlBox")[0] as HTMLElement | undefined;
    if (!box) {
      return null;
    }

    gsap.set(box, { x: 0, rotation: 0, scale: 1 });

    let tl: gsap.core.Timeline;
    tl = gsap.timeline({
      paused: true,
      repeat: -1,
      yoyo: true,
      onUpdate() {
        updateTlControlParams(tl);
      },
    });

    tl.to(box, { x: 280, duration: 1, ease: "power2.out" })
      .to(box, { rotation: 360, duration: 0.6, ease: "back.out(1.7)" }, "-=0.3")
      .to(box, { scale: 1.4, duration: 0.4 }, "-=0.3")
      .to(box, { scale: 1, duration: 0.3 });

    tlControl.current = tl;
    updateTlControlParams(tl);

    return tl;
  };

  const runTlBasic = contextSafe(() => {
    const targetsSelector = [
      "#tl-title",
      "#tl-sub",
      "#tl-btn1",
      "#tl-btn2",
      "#tl-badge",
    ];
    const q = gsap.utils.selector(scopeRef);
    const targets = targetsSelector.flatMap((target) => q(target));
    const scrubber = q(".tl-scrubber")[0];

    tlBasicRef.current?.kill();
    gsap.killTweensOf([...targets, scrubber]);
    gsap.set(targets, { opacity: 0, y: 0, scale: 1 });
    gsap.set(scrubber, { left: "0%" });

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
        duration: 0.55,
      },
      onUpdate() {
        gsap.set(scrubber, {
          left: `${(this.progress() * 100).toFixed(0)}%`,
        });
      },
    });
    tlBasicRef.current = tl;

    tl.fromTo("#tl-title", { y: 22, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(
        "#tl-sub",
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1 },
        "-=0.25", // bắt đầu animation này sớm hơn 0.25 giây so với lúc animation trước kết thúc
      )
      .fromTo(
        "#tl-btn1",
        { y: 12, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1 },
        "-=0.2",
      )
      .fromTo(
        "#tl-btn2",
        { y: 12, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1 },
        "-=0.35",
      )
      .fromTo(
        "#tl-badge",
        { y: 8, opacity: 0, scale: 0.7 },
        { y: 0, opacity: 1, scale: 1 },
        "-=0.25",
      );
  });

  const runTlPos = contextSafe(() => {
    const q = gsap.utils.selector(scopeRef);
    const stage = q("#posStage")[0] as HTMLElement | undefined;
    const posA = q("#posA")[0] as HTMLElement | undefined;
    const posB = q("#posB")[0] as HTMLElement | undefined;
    if (!stage || !posA || !posB) {
      return;
    }
    const maxX = Math.max(
      0,
      stage.clientWidth - posA.offsetWidth - posA.offsetLeft,
    );

    tlPosRef.current?.kill();
    gsap.killTweensOf([posA, posB]);
    gsap.set([posA, posB], { x: 0 });
    const tl = gsap.timeline();
    tlPosRef.current = tl;

    tl.to(posA, { x: maxX, duration: 1, ease: "power2.inOut" });
    const cfg = tlPositionConfigs[activeTlPosition];
    const posVal = cfg.pos === "label" ? "mark" : cfg.pos;
    if (cfg.pos === "label") {
      tl.addLabel("mark", 0.5);
    }

    tl.to(
      posB,
      {
        x: maxX * 0.6,
        duration: 0.8,
        ease: "back.out(1.5)",
      },
      posVal,
    );
  });

  const resetTlPos = contextSafe(() => {
    const q = gsap.utils.selector(scopeRef);
    const posA = q("#posA")[0] as HTMLElement | undefined;
    const posB = q("#posB")[0] as HTMLElement | undefined;
    if (!posA || !posB) {
      return;
    }
    tlPosRef.current?.kill();
    gsap.killTweensOf([posA, posB]);
    gsap.set([posA, posB], { x: 0 });
  });

  const tlCtrlPlay = contextSafe(() => {
    initTlControl()?.play();
  });

  const tlCtrlPause = contextSafe(() => {
    tlControl.current?.pause();
  });

  const tlCtrlReverse = contextSafe(() => {
    initTlControl()?.reverse();
  });

  const tlCtrlSpeed = contextSafe((speed: number) => {
    const tl = initTlControl();
    if (!tl) {
      return;
    }

    tl.timeScale(speed);
    setTlParam((prev) => ({
      ...prev,
      tlScale: speed,
    }));
  });

  const seekTl = contextSafe((value: number) => {
    const tl = initTlControl();
    if (!tl) {
      return;
    }

    tl.progress(value / 100).pause();
    updateTlControlParams(tl);
  });

  const buildRowTl = (selector: string) => {
    const tl = gsap.timeline();
    tl.from(selector, {
      x: -30,
      opacity: 0,
      scale: 0.7,
      stagger: 0.1,
      ease: "back.out(1.5)",
      duration: 0.5,
    });

    return tl;
  };

  const runNestedTl = contextSafe(() => {
    const q = gsap.utils.selector(scopeRef);
    const boxes = q("#nestedRows .gbox");
    if (!boxes.length) {
      return;
    }

    gsap.killTweensOf(boxes);
    gsap.set(boxes, { x: 0, opacity: 1, scale: 1 });

    const master = gsap.timeline();
    tlNestedRef.current?.kill();
    tlNestedRef.current = master;

    master
      .add(buildRowTl("#nr1 .gbox"))
      .add(buildRowTl("#nr2 .gbox"), "-=0.2")
      .add(buildRowTl("#nr3 .gbox"), "-=0.2");
  });

  const handleTabChange = (val: string) => {
    stopTimelineDemos();
    setActiveTab(val as TimelineTab);
  };

  const action = (() => {
    switch (activeTab) {
      case "timeline cơ bản":
        return (
          <button type="button" className="btn btn-green" onClick={runTlBasic}>
            ▶ Play
          </button>
        );
      case "position parameter":
        return (
          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-green" onClick={runTlPos}>
              ▶ Play
            </button>
            <button type="button" className="btn" onClick={resetTlPos}>
              ↺ Reset
            </button>
          </div>
        );
      case "timeline control":
        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-green"
              onClick={tlCtrlPlay}
            >
              ▶ Play
            </button>
            <button type="button" className="btn" onClick={tlCtrlPause}>
              Pause
            </button>
            <button type="button" className="btn" onClick={tlCtrlReverse}>
              Reverse
            </button>
            <button
              type="button"
              className={cn("btn", tlParams.tlScale === 0.5 && "btn-green")}
              onClick={() => tlCtrlSpeed(0.5)}
            >
              0.5x
            </button>
            <button
              type="button"
              className={cn("btn", tlParams.tlScale === 1 && "btn-green")}
              onClick={() => tlCtrlSpeed(1)}
            >
              1x
            </button>
            <button
              type="button"
              className={cn("btn", tlParams.tlScale === 2 && "btn-green")}
              onClick={() => tlCtrlSpeed(2)}
            >
              2x
            </button>
          </div>
        );
      case "nested timeline":
        return (
          <button type="button" className="btn btn-green" onClick={runNestedTl}>
            ▶ Play
          </button>
        );
      default:
        return undefined;
    }
  })();

  const panelCode = (() => {
    switch (activeTab) {
      case `position parameter`:
        return getTlPositionCode(activeTlPosition);
      default:
        return panelTabsCode[activeTab];
    }
  })();

  return (
    <GSAPSection id="timeline">
      <DemoCard code={panelCode} action={action}>
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabList>
            {timelineTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="timeline cơ bản">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-4 items-stretch px-8 py-6",
                )}
              >
                <div>
                  <p className={gsapDemoLabel}>timeline visualizer</p>
                  {/* visual timeline bar */}
                  <div className="bg-bg-surface rounded-md p-3 relative">
                    <div className="tl-scrubber left-0" />
                    {/* timeline block */}
                    <div className="h-14 relative">
                      {timelineBlocks.map((tl, index) => (
                        <div
                          key={`${tl.label}-${index}`}
                          className="tl-block"
                          style={{
                            left: `${tl.left}%`,
                            width: `${tl.width}%`,
                            backgroundColor: `var(${tl.background})`,
                          }}
                        >
                          {tl.label}
                        </div>
                      ))}
                    </div>
                    {/* timeline stick */}
                    <div className="tl-ruler">
                      {timelineTicks.map((tlTick, index) => (
                        <div
                          key={`${tlTick}-${index}`}
                          className="tl-tick"
                        >{`${tlTick}`}</div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* animated elements */}
                <div
                  id="tlBasicRow"
                  className="flex gap-3 items-center flex-wrap"
                >
                  <h4
                    id="tl-title"
                    className="font-mono text-xl font-bold opacity-0"
                  >
                    Hello GSAP
                  </h4>
                  <p id="tl-sub" className="text-sm text-text-muted opacity-0">
                    Timeline rocks
                  </p>
                  <button id="tl-btn1" className="btn btn-green opacity-0">
                    Primary
                  </button>
                  <button id="tl-btn2" className="btn btn-pink opacity-0">
                    Secondary
                  </button>
                  <div
                    id="tl-badge"
                    className="bg-gsap text-black font-mono px-2 py-1 rounded-[20px] opacity-0"
                  >
                    new
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="position parameter">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <div className="grid gap-2.5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {tlPositionCards.map((tlPosition, index) => (
                    <div
                      key={`${tlPosition.name}-${index}`}
                      className={cn(
                        "pos-card",
                        tlPosition.name === activeTlPosition && "active",
                      )}
                      onClick={() => setActiveTlPosition(tlPosition.name)}
                    >
                      <p className="pos-name">{tlPosition.name}</p>
                      <p className="pos-desc">{tlPosition.desc}</p>
                    </div>
                  ))}
                </div>
                <div id="posStage" className="pos-stage">
                  <div
                    id="posA"
                    className={cn(gBox, "absolute left-3.5 top-2 text-xs")}
                  >
                    A
                  </div>
                  <div
                    id="posB"
                    className={cn(
                      gBox,
                      "absolute left-3.5 top-2 text-xs bg-pink-400",
                    )}
                  >
                    B
                  </div>
                </div>
                <pre className="pos-timing-guide">
                  {tlPositionTimingGuides[activeTlPosition]}
                </pre>
              </div>
            </TabPanel>
            <TabPanel value="timeline control">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <div className="flex gap-6 items-center flex-wrap">
                  <div className="min-w-90">
                    <div id="tlCtrlBox" className={cn(gBox, "shrink-0")}>
                      tl
                    </div>
                  </div>
                  <div className="flex-1 min-w-52">
                    <div className="flex items-center gap-1.5 mb-2">
                      <p className={gsapDemoLabel}>progress: </p>
                      <p className={cn(gsapDemoLabel, "text-gsap")}>
                        {tlParams.tlProgress}
                      </p>
                      <p className={gsapDemoLabel}>time: </p>
                      <p className={cn(gsapDemoLabel, "text-text-base")}>
                        {`${tlParams.tlTime}s`}
                      </p>
                      <p className={gsapDemoLabel}>timeScale:</p>
                      <p className={cn(gsapDemoLabel, "text-yellow-400")}>
                        {`${tlParams.tlScale}x`}
                      </p>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={tlParams.tlSeek}
                      className="w-full cursor-grab"
                      onChange={(e) => {
                        seekTl(Number(e.target.value));
                      }}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="nested timeline">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <p className={gsapDemoLabel}>
                  nested timelines — mỗi row là một sub-timeline, tất cả ghép
                  vào master timeline
                </p>
                <div id="nestedRows" className="flex flex-col gap-2">
                  <div className="flex gap-2" id="nr1">
                    {tl1.map((tl, index) => (
                      <div
                        key={`${tl.label}-${index}`}
                        className={cn(gBox, "gbox w-11 h-11")}
                        style={{
                          backgroundColor: `var(${tl.background})`,
                        }}
                      >
                        {tl.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2" id="nr2">
                    {tl2.map((tl, index) => (
                      <div
                        key={`${tl.label}-${index}`}
                        className={cn(gBox, "gbox w-11 h-11")}
                        style={{
                          backgroundColor: `var(${tl.background})`,
                        }}
                      >
                        {tl.label}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2" id="nr3">
                    {tl3.map((tl, index) => (
                      <div
                        key={`${tl.label}-${index}`}
                        className={cn(gBox, "gbox w-11 h-11")}
                        style={{
                          backgroundColor: `var(${tl.background})`,
                        }}
                      >
                        {tl.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default TimelineSection;
