import { useState } from "react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import {
  bpTabs,
  bpTipsData,
  bpDebugData,
  panelTabsCode,
  bpPerformanceData,
  bpDebugIssuesData,
  bpMentalModelData,
  type BestPracticeTab,
} from "./data";

import GSAPSection from "../GSAPSection";

import "./bp.css";

const BestPracticesSection = () => {
  const [activeTab, setActiveTab] = useState<BestPracticeTab>("dos & don'ts");

  return (
    <GSAPSection id="best-practices">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as BestPracticeTab)}
        >
          <TabList>
            {bpTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="dos & don'ts">
            <div
              className={cn(
                ui.demoArea,
                "flex-col gap-4 items-stretch px-8 py-6",
              )}
            >
              <div className="bp-grid">
                {bpTipsData.map((tip, index) => (
                  <div
                    key={`${tip.title}-${index}`}
                    className={cn("bp-card", tip.class)}
                  >
                    <div className="bp-title">{tip.title}</div>
                    <div
                      className="bp-body"
                      dangerouslySetInnerHTML={{
                        __html: tip.body,
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
                "flex-col gap-4 items-stretch px-8 py-6",
              )}
            >
              <div className="bp-grid">
                {bpPerformanceData.map((tip, index) => (
                  <div
                    key={`${tip.title}-${index}`}
                    className={cn("bp-card tip")}
                  >
                    <div className="bp-title">{tip.title}</div>
                    <div
                      className="bp-body"
                      dangerouslySetInnerHTML={{
                        __html: tip.body,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
          <TabPanel value="debug toolkit">
            <div
              className={cn(
                ui.demoArea,
                "flex-col gap-4 items-stretch px-8 py-6",
              )}
            >
              <div className="bp-grid">
                {bpDebugData.map((item) => (
                  <div key={item.title} className={cn("bp-card", item.class)}>
                    <div className="bp-title">{item.title}</div>
                    <div
                      className="bp-body"
                      dangerouslySetInnerHTML={{
                        __html: item.body,
                      }}
                    />
                  </div>
                ))}
                <div className="bp-card bad bp-card-span">
                  <div className="bp-title">lỗi hay gặp nhất</div>
                  <div className="bp-issue-grid">
                    {bpDebugIssuesData.map((issue) => (
                      <div
                        key={issue}
                        dangerouslySetInnerHTML={{
                          __html: `• ${issue}`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="mental model">
            <div
              className={cn(
                ui.demoArea,
                "flex-col gap-4 items-stretch px-8 py-6",
              )}
            >
              <div className="bp-stack">
                {bpMentalModelData.map((item) => (
                  <div key={item.title} className={cn("bp-card", item.class)}>
                    <div className="bp-title">{item.title}</div>
                    <div
                      className="bp-body bp-body-large"
                      dangerouslySetInnerHTML={{
                        __html: item.body,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default BestPracticesSection;
