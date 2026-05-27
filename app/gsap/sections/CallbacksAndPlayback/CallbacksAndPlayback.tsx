import { useMemo, useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { gBox, gsapDemoLabel } from "~/gsap/classes";

import { cn } from "~/lib/utils";

import { callbacksTabs, panelTabsCode, type CallbackTab } from "./data";

import GSAPSection from "../GSAPSection";

import "./callbacks-and-playback.css";

function CallbacksAndPlayback() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<CallbackTab>("callbacks");

  const action = (() => {
    switch (activeTab) {
      case "callbacks":
      case "playback control":
      case "delay & repeat":
      default:
        return undefined;
    }
  })();

  return (
    <GSAPSection id="callbacks">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as CallbackTab)}
        >
          <TabList>
            {callbacksTabs.map((tab) => (
              <TabItem value={tab.value}>{tab.label}</TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="callbacks">
              <div className={cn(ui.demoArea, "gap-6 flex-wrap")}>
                <div className="flex-col-center">
                  <div id="cbBox" className={cn(gBox)}>
                    anim
                  </div>
                </div>
                <div className="min-w-60 flex-1">
                    <p className={cn(gsapDemoLabel)}></p>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="playback control">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
            <TabPanel value="delay & repeat">
              <div className={cn(ui.demoArea)}></div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
}

export default CallbacksAndPlayback;
