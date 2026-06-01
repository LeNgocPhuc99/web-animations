import { useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import {
  panelTabsCode,
  scrollTriggerTabs,
  type ScrollTriggerTab,
} from "./data";

import GSAPSection from "../GSAPSection";

const ScrollTriggerSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] =
    useState<ScrollTriggerTab>("trigger cơ bản");

  return (
    <GSAPSection id="scroll-trigger">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ScrollTriggerTab)}
        >
          <TabList>
            {scrollTriggerTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="trigger cơ bản">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
            <TabPanel value="scrub">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
            <TabPanel value="markers & debug">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
            <TabPanel value="pin">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default ScrollTriggerSection;
