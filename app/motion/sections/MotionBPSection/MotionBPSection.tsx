import { useState } from "react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import MotionSectionWrapper from "../MotionSectionWrapper";

import {
  motionBPTabs,
  motionBPDosDonts,
  motionBPTips,
  motionBPVsRows,
  panelTabsCode,
  type MotionBPTab,
} from "./data";

import "./motion-bp.css";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

const MotionBPSection = () => {
  const [activeTab, setActiveTab] = useState<MotionBPTab>("dos & don'ts");

  return (
    <MotionSectionWrapper id="best-practices">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as MotionBPTab)}
        >
          <TabList>
            {motionBPTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="dos & don'ts">
            <div
              className={cn(
                ui.demoArea,
                "flex-col items-stretch gap-2.5 px-8 py-6",
              )}
            >
              <div className="bp-grid">
                {motionBPDosDonts.map((item) => (
                  <div
                    key={item.title}
                    className={cn("bp-card", item.className)}
                  >
                    <div className="bp-title">{item.title}</div>
                    <div
                      className="bp-body"
                      dangerouslySetInnerHTML={{
                        __html: item.body,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="performance">
            <div
              className={cn(
                ui.demoArea,
                "flex-col items-stretch gap-2.5 px-8 py-6",
              )}
            >
              <div className="bp-grid">
                {motionBPTips.map((item) => (
                  <div key={item.title} className={cn("bp-card tip")}>
                    <div className="bp-title">{item.title}</div>
                    <div
                      className="bp-body"
                      dangerouslySetInnerHTML={{
                        __html: item.body,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="vs GSAP">
            <div
              className={cn(
                ui.demoArea,
                "flex-col items-stretch gap-4 px-8 py-6",
              )}
            >
              <div className="bp-tableWrap">
                <table className="bp-table">
                  <thead>
                    <tr>
                      <th>Tiêu chí</th>
                      <th>Framer Motion</th>
                      <th>GSAP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motionBPVsRows.map((row, index) => (
                      <tr key={row.criterion} data-even={index % 2 === 0}>
                        <td>{row.criterion}</td>
                        <td>{row.framerMotion}</td>
                        <td>{row.gsap}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default MotionBPSection;
