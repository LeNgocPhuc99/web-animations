import { DemoCard, TabItem, TabList, Tabs } from "~/components";

import AdvAnimationSection from "../AdvAnimationSection";

import { svgTabs, panelTabsCode, type SvgTab } from "./data";
import useSvgAnimationSection from "./useSvgAnimationSection";

import SvgAnimationPanels from "./SvgAnimationPanels";

import "./svg.css";

const SvgAnimationSection = () => {
  const { activeTab, action, setActiveTab, updateRing } =
    useSvgAnimationSection();

  return (
    <AdvAnimationSection id="svg">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as SvgTab)}
        >
          <TabList>
            {svgTabs.map((tab) => (
              <TabItem key={tab.label} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <SvgAnimationPanels onRingInput={updateRing} />
        </Tabs>
      </DemoCard>
    </AdvAnimationSection>
  );
};

export default SvgAnimationSection;
