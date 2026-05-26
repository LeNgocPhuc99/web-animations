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

  const [activeTab, setActiveTab] = useState<EasingTab>("ease families");

  const [activeEaseFamily, setActiveEaseFamily] = useState<EasingFamily>("power");
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

  const easeCode = `<span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">300</span>, <span class="p">duration</span>: <span class="v">1</span>, <span class="p">ease</span>: <span class="s">'${activeEaseVariant}'</span> });`;

  const action =
    activeTab === "ease families" ? (
      <button className="btn btn-green" onClick={runEaseDemo} type="button">
        ▶ Play
      </button>
    ) : undefined;

  return (
    <GSAPSection id="easing">
      <DemoCard
        code={activeTab === "ease families" ? easeCode : easePanelCode[activeTab]}
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
                    className={cn(gBox, "absolute left-3.5 text-center text-[9px]")}
                  />
                  <div
                    id="easeDemoLabel"
                    className={cn(gsapDemoLabel, "absolute right-3.5")}
                  >
                    {activeEaseVariant}
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="race demo"></TabPanel>
            <TabPanel value="special eases"></TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default EasingSection;
