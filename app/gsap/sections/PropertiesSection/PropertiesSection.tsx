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
  propertyCards,
  propertiesTabs,
  type PropertiesTab,
  propertiesPanelCode,
} from "./data";

const PropertiesSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<PropertiesTab>(
    "transform shortcuts",
  );

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const action = (() => {
    switch (activeTab) {
      case "transform shortcuts":
        return (
          <button></button>
        )
      case "CSS properties":
      case "special values":
    }
    return undefined;
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
                    />
                  ))}
                </div>

                <div className="flex-center gap-4 px-8 py-6 w-full">
                  <div className={gBox}>click card</div>
                  <div className={gsapDemoLabel}>
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
                      stroke-width="5"
                    />
                    <circle
                      id="svgArc"
                      cx="28"
                      cy="28"
                      r="20"
                      fill="none"
                      stroke="var(--color-accent-teal)"
                      stroke-width="5"
                      stroke-dasharray="0 126"
                      stroke-linecap="round"
                      transform="rotate(-90 28 28)"
                    />
                  </svg>
                  <p className={gsapDemoLabel}>định nghĩa cả</p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="special values">
              <div className={cn(ui.demoArea, "py-6 px-8 items-start")}>
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
