import { useState } from "react";
import { motion } from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { cn } from "~/lib/utils";

import MotionSectionWrapper from "../MotionSectionWrapper";

import {
  motionTabs,
  panelTabCode,
  initialAnimateBoxes,
  initialTransitionBoxes,
  type MotionTab,
} from "./data";

import { motionBox, motionDemoLabel } from "~/motion/classes";

const MotionSection = () => {
  const [activeTab, setActiveTab] = useState<MotionTab>("initial & animate");
  const [replayKfKey, setReplayKfKey] = useState(0);
  const [replayAnimateKey, setReplayAnimateKey] = useState(0);
  const [repayTransitionKey, setReplayTransitionKey] = useState(0);
  const [activeState, setActiveState] = useState(false);

  const action = (() => {
    switch (activeTab) {
      case "initial & animate":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayAnimateKey((key) => key + 1)}
          >
            ▶ Replay
          </button>
        );
      case "transition config":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayTransitionKey((key) => key + 1)}
          >
            ▶ Replay
          </button>
        );
      case "keyframes":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayKfKey((key) => key + 1)}
          >
            ▶ Replay
          </button>
        );
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
            <div className={cn(ui.demoArea, "gap-14")} key={replayAnimateKey}>
              {initialAnimateBoxes.map((box, index) => (
                <div className={ui.stack} key={`${box.label}-${index}`}>
                  <motion.div
                    className={cn(motionBox)}
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
            <div
              className={cn(ui.demoArea, "flex-col items-start pl-20 gap-2")}
              key={repayTransitionKey}
            >
              {initialTransitionBoxes.map((box, index) => (
                <motion.div
                  key={`${box.label}-${index}`}
                  className={cn(motionBox)}
                  style={{
                    background: box.bg,
                  }}
                  initial={{
                    x: -80,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  transition={{
                    ...box.trans,
                    delay: index * 0.1,
                  }}
                >
                  {box.label}
                </motion.div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="whileAnimate states">
            <div className={cn(ui.demoArea)}>
              <motion.div
                className={cn(
                  motionBox,
                  "w-20 h-20 cursor-pointer",
                  activeState ? "rounded-full" : "rounded-md",
                )}
                animate={{
                  scale: activeState ? 1.3 : 1,
                  backgroundColor: activeState ? "#8b5cf6" : "#1f1f34",
                  border: `2px solid ${activeState ? "#a78bfa" : "#333"}`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                onClick={() => setActiveState((prev) => !prev)}
              >
                {activeState ? "active" : "click"}
              </motion.div>
              <p className={cn(motionDemoLabel)}>
                animate nhận object mới
                <br />
                khi state thay đổi
                <br />
                Motion tự interpolate
              </p>
            </div>
          </TabPanel>
          <TabPanel value="keyframes">
            <div className={cn(ui.demoArea, "justify-around")} key={replayKfKey}>
              <motion.div
                className={cn(motionBox, "bg-motion")}
                initial={{
                  x: 0,
                }}
                animate={{
                  x: [0, 120, 60, 180, 90],
                  rotate: [0, 20, -10, 30, 0],
                  scale: [1, 1.2, 0.9, 1.1, 1],
                }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.25, 0.5, 0.75, 1],
                  ease: "easeInOut",
                }}
              >
                kf
              </motion.div>
              <div className={cn(motionDemoLabel, "max-w-60")}>
                <code>x: [0,120,60,180,90]</code>
                <br />
                <code>times: [0,.25,.5,.75,1]</code>
                <br />5 keyframes, tự interpolate
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default MotionSection;
