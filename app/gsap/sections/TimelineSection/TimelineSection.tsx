import { useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { timelineTabs, panelTabsCode, type TimelineTab } from "./data";

import GSAPSection from "../GSAPSection";

import "./timeline.css";

const TimelineSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<TimelineTab>("timeline cơ bản");

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const action = (() => {
    switch (activeTab) {
      case "timeline cơ bản":
        return <button className="btn btn-green">▶ Play</button>;
      case "position parameter":
        return <button className="btn btn-green">▶ Play</button>;
      case "timeline control":
        return (
          <div className="flex items-center gap-2">
            <button className="btn btn-green">▶ Play</button>
            <button className="btn">Pause</button>
            <button className="btn">Reverse</button>
            <button className="btn">0.5x</button>
            <button className="btn">1x</button>
            <button className="btn">2x</button>
          </div>
        );
      case "nested timeline":
        return <button className="btn btn-green">▶ Play</button>;
      default:
        return undefined;
    }
  })();

  return (
    <GSAPSection id="timeline">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as TimelineTab)}
        >
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
              ></div>
            </TabPanel>
            <TabPanel value="position parameter">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
            <TabPanel value="timeline control">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
            <TabPanel value="nested timeline">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default TimelineSection;
