import { useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { gBox, gsapDemoLabel } from "~/gsap/classes";

import { cn } from "~/lib/utils";

import GSAPSection from "../GSAPSection";

import { easeTabs, easePanelCode, type EasingTab } from "./data";

const EasingSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<EasingTab>("ease families");

  const { contextSafe } = useGSAP({ scope: scopeRef });

  return (
    <GSAPSection id="easing">
      <DemoCard code={easePanelCode[activeTab]}>
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
