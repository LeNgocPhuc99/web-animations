import type { RefObject } from "react";

import { TabPanel } from "~/components";

import { cn } from "~/lib/utils";
import { ui } from "~/styles/classes";

import {
  accessibilityCards,
  performanceCards,
  toolRows,
} from "./data";

type BestPracticesPanelsProps = {
  toolTableRef: RefObject<HTMLTableElement | null>;
};

const BestPracticesPanels = ({ toolTableRef }: BestPracticesPanelsProps) => {
  return (
    <>
      <TabPanel value="chọn đúng tool">
        <div className={cn(ui.demoArea, "flex-col items-stretch p-6 gap-0")}>
          <div className="overflow-x-auto">
            <table ref={toolTableRef} className="cmp-table min-w-150" />
          </div>
        </div>
      </TabPanel>

      <TabPanel value="performance at scale">
        <div className={cn(ui.demoArea, "flex-col items-stretch p-6 gap-2.5")}>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {performanceCards.map((card) => (
              <div key={card.title} className={`info-box ${card.tone}`}>
                <strong className={card.tone === "warn" ? "text-yellow-500" : "text-adv"}>
                  {card.title}
                </strong>
                <br />
                {card.body}
              </div>
            ))}
          </div>
        </div>
      </TabPanel>

      <TabPanel value="accessibility">
        <div className={cn(ui.demoArea, "flex-col items-stretch p-6 gap-2.5")}>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {accessibilityCards.map((card) => (
              <div key={card.title} className={`info-box ${card.tone}`}>
                <strong className={card.tone === "warn" ? "text-yellow-500" : "text-green-500"}>
                  {card.title}
                </strong>
                <br />
                {card.body}
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
    </>
  );
};

export default BestPracticesPanels;
