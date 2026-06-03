import { useState } from "react";
import { motion } from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { cn } from "~/lib/utils";

import MotionSectionWrapper from "../MotionSectionWrapper";

import { motionTabs, panelTabCode, type MotionTab } from "./data";

const initialAnimateBoxes = [
  {
    label: "fade+slide",
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    bg: "#8b5cf6",
  },
  {
    label: "scale in",
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.1,
    },
    bg: "#ec4899",
  },
  {
    label: "rotate",
    initial: { opacity: 0, rotate: -90, x: -40 },
    animate: { opacity: 1, rotate: 0, x: 0 },
    transition: { duration: 0.7, ease: "backOut", delay: 0.2 },
    bg: "#14b8a6",
  },
  {
    label: "flip X",
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    transition: { duration: 0.6, delay: 0.3 },
    bg: "#f59e0b",
  },
] as const;

const MotionSection = () => {
  const [activeTab, setActiveTab] = useState<MotionTab>("initial & animate");
  const [replayKey, setReplayKey] = useState(0);

  const action = (() => {
    switch (activeTab) {
      case "initial & animate":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayKey((key) => key + 1)}
          >
            ▶ Replay
          </button>
        );
      case "transition config":
        return <button className="btn btn-purple">▶ Replay</button>;
      case "keyframes":
        return <button className="btn btn-purple">▶ Replay</button>;
      default:
        return undefined;
    }
  })();

  return (
    <MotionSectionWrapper id="motion">
      <DemoCard code={panelTabCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as MotionTab)}
        >
          <TabList>
            {motionTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="initial & animate">
            <div className={cn(ui.demoArea)} key={replayKey}>
              {initialAnimateBoxes.map((box) => (
                <div className={ui.stack} key={box.label}>
                  <motion.div
                    className={cn(
                      "flex h-14 w-14 shrink-0 cursor-pointer select-none items-center justify-center rounded-[10px]",
                      "font-mono text-[10px] font-medium text-white",
                    )}
                    style={{ background: box.bg }}
                    initial={box.initial}
                    animate={box.animate}
                    transition={box.transition}
                  >
                    {box.label}
                  </motion.div>
                  <span className={ui.caption}>{box.label}</span>
                </div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="transition config">
            <div className={cn(ui.demoArea)}></div>
          </TabPanel>
          <TabPanel value="whileAnimate states">
            <div className={cn(ui.demoArea)}></div>
          </TabPanel>
          <TabPanel value="keyframes">
            <div className={cn(ui.demoArea)}></div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default MotionSection;
