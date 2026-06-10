import { DemoCard, TabItem, TabList, Tabs } from "~/components";

import AdvAnimationSection from "../AdvAnimationSection";

import { panelTabsCode, webAnimationApiTabs, type WebAnimationAPITab } from "./data";
import WebAnimationApiPanels from "./WebAnimationApiPanels";
import useWebAnimationApiSection from "./useWebAnimationApiSection";

import "./webAnimationApi.css";

const WebAnimationApiSection = () => {
  const {
    activeTab,
    actions,
    box1Ref,
    box2Ref,
    box3Ref,
    box4Ref,
    box5Ref,
    ctrlBoxRef,
    ctrlSliderRef,
    ctrlStateRef,
    ctrlTimeRef,
    setActiveTab,
    seekControl,
  } = useWebAnimationApiSection();

  return (
    <AdvAnimationSection id="waapi">
      <DemoCard code={panelTabsCode[activeTab]} action={actions[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as WebAnimationAPITab)}
        >
          <TabList>
            {webAnimationApiTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <WebAnimationApiPanels
            box1Ref={box1Ref}
            box2Ref={box2Ref}
            box3Ref={box3Ref}
            box4Ref={box4Ref}
            box5Ref={box5Ref}
            ctrlBoxRef={ctrlBoxRef}
            ctrlSliderRef={ctrlSliderRef}
            ctrlStateRef={ctrlStateRef}
            ctrlTimeRef={ctrlTimeRef}
            seekControl={seekControl}
          />
        </Tabs>
      </DemoCard>
    </AdvAnimationSection>
  );
};

export default WebAnimationApiSection;
