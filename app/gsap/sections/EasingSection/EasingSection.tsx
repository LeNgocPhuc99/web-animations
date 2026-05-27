import { useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import EasingFamilyCard from "./EasingFamilyCard";

import { gBox, gsapDemoLabel } from "~/gsap/classes";

import { cn } from "~/lib/utils";

import GSAPSection from "../GSAPSection";

import {
  easeTabs,
  raceEases,
  raceColors,
  easeSpecials,
  easePanelCode,
  easeFamilyCards,
  getEaseVariants,
  type EasingTab,
  type EasingFamily,
} from "./data";

import "./easing.css";

const EasingSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const easeDemoBoxRef = useRef<HTMLDivElement>(null);
  const easeDemoTrackRef = useRef<HTMLDivElement>(null);
  const ballRefs = useRef<Array<HTMLDivElement | null>>([]);
  const raceRunningRef = useRef(false);

  const [activeTab, setActiveTab] = useState<EasingTab>("ease families");
  const [raceRunning, setRaceRunning] = useState(false);

  const [activeEaseFamily, setActiveEaseFamily] =
    useState<EasingFamily>("power");
  const [activeEaseVariant, setActiveVariant] = useState<string>(
    getEaseVariants("power")[0] ?? "",
  );

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const activeEaseVariants = useMemo(
    () => getEaseVariants(activeEaseFamily),
    [activeEaseFamily],
  );

  const selectEaseFamily = (family: EasingFamily) => {
    setActiveEaseFamily(family);
    setActiveVariant(getEaseVariants(family)[0] ?? "");
  };

  const selectEaseVariant = (ease: string) => {
    setActiveVariant(ease);
  };

  const runEaseDemo = contextSafe(() => {
    const box = easeDemoBoxRef.current;
    const track = easeDemoTrackRef.current;

    if (!box || !track || !activeEaseVariant) return;

    gsap.killTweensOf(box);
    gsap.set(box, { x: 0 });

    const maxX = Math.max(track.clientWidth - box.offsetWidth - 28, 0);

    gsap.fromTo(
      box,
      { x: 0 },
      { x: maxX, duration: 1.2, ease: activeEaseVariant },
    );
  });

  const resetEaseBoxDemo = contextSafe(() => {
    const box = easeDemoBoxRef.current;
    if (!box) return;

    gsap.killTweensOf(box);
    gsap.set(box, { clearProps: "all" });
  });

  const runEaseRace = contextSafe(() => {
    if (raceRunningRef.current) return;

    raceRunningRef.current = true;
    setRaceRunning(true);
    const duration = 1.2;

    raceEases.forEach((ease, index) => {
      const ball = ballRefs.current[index];
      const track = ball?.parentElement;
      if (!ball || !track) return;

      const maxX = Math.max(track.clientWidth - ball.offsetWidth - 8, 0);
      gsap.killTweensOf(ball);
      gsap.set(ball, { x: 0 });
      gsap.to(ball, {
        x: maxX,
        duration,
        ease,
      });
    });

    gsap.delayedCall(duration + 0.3, () => {
      raceRunningRef.current = false;
      setRaceRunning(false);
    });
  });

  const resetRace = contextSafe(() => {
    raceEases.forEach((_, index) => {
      const ball = ballRefs.current[index];
      if (!ball) return;

      gsap.killTweensOf(ball);
      gsap.set(ball, { x: 0 });
    });
  });

  const runSpecialEase = contextSafe(() => {
    easeSpecials.forEach((ease) => {
      const config = ease.gsapConfig;
      gsap.fromTo(
        `#${ease.id}`,
        { x: config.x1 },
        {
          x: config.x2,
          duration: config.duration,
          ease: config.easeFunc,
          delay: "delay" in config ? config.delay : undefined,
        },
      );
    });
  });

  const resetSpecialEase = contextSafe(() => {
    easeSpecials.forEach((ease) => {
      gsap.killTweensOf(`#${ease.id}`);
      gsap.set(`#${ease.id}`, { clearProps: "x" });
    });
  });

  const easeCode = `<span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">300</span>, <span class="p">duration</span>: <span class="v">1</span>, <span class="p">ease</span>: <span class="s">'${activeEaseVariant}'</span> });`;

  const action = (() => {
    switch (activeTab) {
      case "ease families":
        return (
          <div className="flex items-center gap-1">
            <button
              className="btn btn-green"
              onClick={runEaseDemo}
              type="button"
            >
              ▶ Play
            </button>
            <button className="btn" onClick={resetEaseBoxDemo} type="button">
              ↺ Reset
            </button>
          </div>
        );
      case "race demo":
        return (
          <div className="flex items-center gap-2">
            <button
              className="btn btn-green"
              onClick={runEaseRace}
              type="button"
            >
              ▶ Race!
            </button>
            <button className="btn" onClick={resetRace} type="button">
              ↺ Reset
            </button>
          </div>
        );
      case "special eases":
        return (
          <div className="flex items-center gap-2">
            <button className="btn btn-green" onClick={runSpecialEase}>
              ▶ Play All
            </button>
            <button className="btn" onClick={resetSpecialEase}>
              ↺ Reset
            </button>
          </div>
        );
    }
  })();

  return (
    <GSAPSection id="easing">
      <DemoCard
        code={
          activeTab === "ease families" ? easeCode : easePanelCode[activeTab]
        }
        action={action}
      >
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as EasingTab)}
        >
          <TabList>
            {easeTabs.map((tab) => (
              <TabItem value={tab.value} key={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="ease families">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch py-6 px-8 gap-4",
                )}
              >
                <div className="ease-family-grid" id="easeFamilyGrid">
                  {easeFamilyCards.map((card) => (
                    <EasingFamilyCard
                      key={card.family}
                      name={card.name}
                      desc={card.desc}
                      family={card.family}
                      isActive={card.family === activeEaseFamily}
                      onSelect={selectEaseFamily}
                    />
                  ))}
                </div>
                <div className="ease-variant-row" id="easeVariantRow">
                  {activeEaseVariants.map((easeVariant) => (
                    <button
                      key={easeVariant}
                      className={cn(
                        "ease-variant",
                        easeVariant === activeEaseVariant && "active",
                      )}
                      onClick={() => selectEaseVariant(easeVariant)}
                      type="button"
                    >
                      {easeVariant}
                    </button>
                  ))}
                </div>
                <div
                  ref={easeDemoTrackRef}
                  className="relative flex h-20 items-center overflow-hidden rounded-lg bg-bg-subtle"
                >
                  <div
                    ref={easeDemoBoxRef}
                    id="easeDemoBox"
                    className={cn(
                      gBox,
                      "absolute left-3.5 text-center text-[9px]",
                    )}
                  />
                </div>
              </div>
            </TabPanel>
            <TabPanel value="race demo">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch py-6 px-8 gap-1",
                )}
              >
                <div className="ease-race-wrap" id="easeRaceWrap">
                  {raceEases.map((ease, index) => (
                    <div className="ease-lane" key={ease}>
                      <span className="ease-lane-name">{ease}</span>
                      <div className="ease-lane-track">
                        <div
                          className={cn("ease-lane-ball")}
                          ref={(node) => {
                            ballRefs.current[index] = node;
                          }}
                          style={{ background: raceColors[index] }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="special eases">
              <div
                className={cn(ui.demoArea, "flex-col px-8 py-6 items-start")}
              >
                {easeSpecials.map((ease) => (
                  <div
                    key={`${ease.label}-${ease.desc}`}
                    className="flex flex-col items-start gap-1"
                  >
                    <div
                      id={ease.id}
                      className={cn(gBox, `text-center ml-20`)}
                      style={{
                        background: `var(${ease.bg})`,
                      }}
                    >
                      <p dangerouslySetInnerHTML={{ __html: ease.label }} />
                    </div>
                    <p className={gsapDemoLabel}>{ease.desc}</p>
                  </div>
                ))}
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default EasingSection;
