import { useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { gBox, gsapDemoLabel } from "~/gsap/classes";

import { cn } from "~/lib/utils";

import GSAPSection from "../GSAPSection";

import PropertyCard from "./PropertyCard";

import {
  propertyDemos,
  propertyCards,
  propertiesTabs,
  type PropertiesTab,
  propertiesPanelCode,
  type PropertyDemoType,
} from "./data";

const PropertiesSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<PropertiesTab>(
    "transform shortcuts",
  );

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const resetTransform = contextSafe(() => {
    const lbl = document.getElementById("propDemoLabel");
    if (lbl) {
      lbl.innerText = " ← click một card để xem demo";
    }

    gsap.killTweensOf("#propDemoBox");
    gsap.set("#propDemoBox", { clearProps: "all" });
  });

  const demoTransformProps = contextSafe((type: PropertyDemoType) => {
    const el = document.getElementById("propDemoBox");
    const lbl = document.getElementById("propDemoLabel");
    gsap.killTweensOf(el);
    gsap.set(el, { clearProps: "all" });

    const demo = propertyDemos[type];
    if (lbl) {
      lbl.textContent = demo.label;
    }
    gsap.to(el, demo.tween);
  });

  const runCssProps = contextSafe(() => {
    // background
    gsap.to("#cssP1", {
      backgroundColor: "#ee5b8d",
      duration: 0.6,
      yoyo: true,
      repeat: 1,
    });

    // border radius
    gsap.to("#cssP2", {
      borderRadius: "50%",
      duration: 0.5,
      delay: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // width
    gsap.to("#cssP3", {
      width: 100,
      duration: 0.6,
      delay: 0.2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: 1,
    });

    // counter
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 9847,
      duration: 2,
      delay: 0.3,
      ease: "power2.out",
      onUpdate: () => {
        const el = document.getElementById("cssP4");
        if (el) {
          el.textContent = Math.round(obj.val).toLocaleString();
        }
      },
    });

    // SVG arc
    gsap.to("#svgArc", {
      attr: { "stroke-dasharray": "126 0" },
      duration: 1.5,
      delay: 0.4,
      ease: "power2.out",
    });
  });

  const runSpecialValues = contextSafe(() => {
    gsap.to("#sv1", {
      x: "+=80",
      rotation: "+=45",
      duration: 0.6,
      repeat: 2,
      yoyo: true,
    });

    gsap.to("#sv2", {
      x: gsap.utils.snap(50, gsap.utils.random(0, 200)),
      duration: 0.8,
      delay: 0.1,
    });

    gsap.to("#sv3", {
      x: gsap.utils.random(-80, 80),
      y: gsap.utils.random(-20, 20),
      duration: 0.6,
      delay: 0.2,
      ease: "bounce.out",
    });

    // function-based: already index-based via arr
    const els = [document.getElementById("sv4")];
    gsap.to(els, {
      x: (i) => (i + 1) * 60,
      duration: 0.8,
      delay: 0.3,
      ease: "elastic.out(1, 0.5)",
    });
  });

  const resetSpecialValues = contextSafe(() => {
    gsap.killTweensOf("#sv1");
    gsap.set("#sv1", { clearProps: "all" });

    gsap.killTweensOf("#sv2");
    gsap.set("#sv2", { clearProps: "all" });

    gsap.killTweensOf("#sv3");
    gsap.set("#sv3", { clearProps: "all" });

    gsap.killTweensOf("#sv4");
    gsap.set("#sv4", { clearProps: "all" });
  });

  const action = (() => {
    switch (activeTab) {
      case "transform shortcuts":
        return (
          <button className="btn" onClick={resetTransform}>
            ↺ Reset
          </button>
        );
      case "CSS properties":
        return (
          <button className="btn btn-green" onClick={runCssProps}>
            ▶ Play All
          </button>
        );
      case "special values":
        return (
          <div className="flex-center gap-2">
            <button className="btn btn-green" onClick={runSpecialValues}>
              ▶ Play
            </button>
            <button className="btn" onClick={resetSpecialValues}>
              ↺ Reset
            </button>
          </div>
        );
      default:
        return undefined;
    }
  })();

  return (
    <GSAPSection id="properties">
      <DemoCard code={propertiesPanelCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as PropertiesTab)}
        >
          <TabList>
            {propertiesTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="transform shortcuts">
              <div className={cn(ui.demoArea)}>
                <div className="grid sm:grid-cols-2 gap-4 w-full">
                  {propertyCards.map((property) => (
                    <PropertyCard
                      key={property.name}
                      name={property.name}
                      desc={property.desc}
                      onClick={() => demoTransformProps(property.transformPros)}
                    />
                  ))}
                </div>

                <div className="flex-center gap-4 px-8 py-6 w-full">
                  <div id="propDemoBox" className={gBox}>
                    click card
                  </div>
                  <div id="propDemoLabel" className={gsapDemoLabel}>
                    ← click một card để xem demo
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="CSS properties">
              <div className={cn(ui.demoArea, "flex-wrap items-stretch")}>
                <div className="flex-col-center gap-1">
                  <div id="cssP1" className={cn(gBox)}>
                    bg color
                  </div>
                  <p className={gsapDemoLabel}>background</p>
                </div>
                <div className="flex-col-between gap-1">
                  <div id="cssP2" className={cn(gBox, "bg-secondary")}>
                    border-r
                  </div>
                  <p className={gsapDemoLabel}>borderRadius</p>
                </div>
                <div className="flex-col-between gap-1">
                  <div id="cssP3" className={cn(gBox, "bg-accent-purple")}>
                    width
                  </div>
                  <p className={gsapDemoLabel}>width (layout)</p>
                </div>
                <div className="flex-col-between gap-1">
                  <div
                    id="cssP4"
                    className="font-mono text-3xl my-auto font-bold text-gsap"
                  >
                    100
                  </div>
                  <p className={gsapDemoLabel}>counter (object)</p>
                </div>
                <div className="flex-col-between gap-1">
                  <svg id="cssP5" width="56" height="56" viewBox="0 0 56 56">
                    <circle
                      cx="28"
                      cy="28"
                      r="20"
                      fill="none"
                      stroke="var(--color-bg-surface)"
                      strokeWidth="5"
                    />
                    <circle
                      id="svgArc"
                      cx="28"
                      cy="28"
                      r="20"
                      fill="none"
                      stroke="var(--color-accent-teal)"
                      strokeWidth="5"
                      strokeDasharray="0 126"
                      strokeLinecap="round"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <p className={gsapDemoLabel}>định nghĩa cả</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="special values">
              <div className={cn(ui.demoArea, "py-6 px-8 flex-col items-start")}>
                <div className="flex-col-between gap-1">
                  <div id="sv1" className={cn(gBox)}>
                    +=
                  </div>
                  <p className={gsapDemoLabel}>relative +=</p>
                </div>
                <div className="flex-col-between gap-1">
                  <div id="sv2" className={cn(gBox, "bg-secondary")}>
                    snap
                  </div>
                  <p className={gsapDemoLabel}>snap to grid</p>
                </div>
                <div className="flex-col-between gap-1">
                  <div id="sv3" className={cn(gBox, "bg-purple-400")}>
                    random
                  </div>
                  <p className={gsapDemoLabel}>random range</p>
                </div>
                <div className="flex-col-between gap-1">
                  <div id="sv4" className={cn(gBox, "bg-success")}>
                    func
                  </div>
                  <p className={gsapDemoLabel}>function-based</p>
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default PropertiesSection;
