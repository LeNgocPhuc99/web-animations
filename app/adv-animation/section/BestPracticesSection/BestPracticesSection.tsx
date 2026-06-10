import { useEffect, useRef } from "react";

import { DemoCard, TabItem, TabList, Tabs } from "~/components";

import AdvAnimationSection from "../AdvAnimationSection";

import {
  bestPracticesTabs,
  panelTabsCode,
  type BestPracticesTab,
  toolRows,
} from "./data";
import BestPracticesPanels from "./BestPracticesPanels";
import useBestPracticesSection from "./useBestPracticesSection";

import "./bestPractices.css";

const BestPracticesSection = () => {
  const { activeTab, setActiveTab } = useBestPracticesSection();
  const toolTableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    if (activeTab !== "chọn đúng tool") {
      return;
    }

    const table = toolTableRef.current;
    if (!table || table.childElementCount > 0) {
      return;
    }

    const head = document.createElement("thead");
    head.innerHTML =
      "<tr><th>Use case</th><th>Tool</th><th>Bundle</th><th>Complexity</th><th>Note</th></tr>";
    table.appendChild(head);

    const body = document.createElement("tbody");
    toolRows.forEach((row, index) => {
      const tr = document.createElement("tr");
      tr.style.background =
        index % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)";
      tr.innerHTML = `
        <td style="padding:8px 12px;font-size:13px">${row.useCase}</td>
        <td style="padding:8px 12px;font-family:var(--mono);font-size:12px;color:var(--adv2)">${row.tool}</td>
        <td style="padding:8px 12px;font-family:var(--mono);font-size:11px;color:var(--muted)">${row.bundle}</td>
        <td style="padding:8px 12px;font-size:12px">${row.complexity}</td>
        <td style="padding:8px 12px;font-size:12px;color:var(--muted)">${row.note}</td>`;
      body.appendChild(tr);
    });
    table.appendChild(body);
  }, [activeTab]);

  return (
    <AdvAnimationSection id="bestpractices">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as BestPracticesTab)}
        >
          <TabList>
            {bestPracticesTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <BestPracticesPanels toolTableRef={toolTableRef} />
        </Tabs>
      </DemoCard>
    </AdvAnimationSection>
  );
};

export default BestPracticesSection;
