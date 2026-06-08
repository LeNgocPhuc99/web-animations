import { useRef, useState } from "react";

import { motion, useDragControls } from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { motionBox, motionDemoLabel } from "~/motion/classes";

import { cn } from "~/lib/utils";
import MotionSectionWrapper from "../MotionSectionWrapper";

import { gsBtns, gestureTabs, panelTabsCode, type GestureTab } from "./data";

const GestureSection = () => {
  const [activeTab, setActiveTab] = useState<GestureTab>(
    "whileHover & whileTap",
  );

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const controls = useDragControls();

  const containerRef = useRef<HTMLInputElement>(null);

  return (
    <MotionSectionWrapper id="gestures">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as GestureTab)}
        >
          <TabList>
            {gestureTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="whileHover & whileTap">
            <div className={cn(ui.demoArea)}>
              {gsBtns.map((btn, index) => (
                <motion.div
                  key={`${btn.label}-${index}`}
                  style={{
                    backgroundColor: btn.bg,
                    border: btn.border,
                  }}
                  className={cn(
                    motionBox,
                    "w-auto h-auto py-2.5 px-4.5 rounded-md",
                  )}
                  whileHover={btn.wH}
                  whileTap={btn.wT}
                  transition={btn.trans}
                >
                  {btn.label}
                </motion.div>
              ))}
            </div>
          </TabPanel>
          <TabPanel value="drag">
            <div className={cn(ui.demoArea)}>
              <motion.div
                drag
                whileDrag={{
                  scale: 1.25,
                  zIndex: 10,
                  cursor: "grabbing",
                  boxShadow: "0 20px 60px rgba(139,92,246,0.5)",
                }}
                dragTransition={{
                  bounceStiffness: 300,
                  bounceDamping: 20,
                }}
                className={cn(motionBox, "bg-motion w-18 h-18 cursor-grab")}
              >
                drag me
              </motion.div>
            </div>
          </TabPanel>
          <TabPanel value="dragConstraints">
            <div className={cn(ui.demoArea)} ref={containerRef}>
              <motion.div
                drag
                dragConstraints={containerRef}
                dragElastic={0.25}
                whileDrag={{
                  scale: 1.1,
                  cursor: "grabbing",
                }}
                dragTransition={{ bounceStiffness: 200, bounceDamping: 15 }}
                className={cn(
                  motionBox,
                  "w-17 h-17 bg-motion cursor-grab rounded-full",
                )}
              >
                drag!
              </motion.div>
              <span
                className={cn(
                  motionDemoLabel,
                  "absolute left-1/2 bottom-3 -translate-x-1/2",
                )}
              >
                constrained trong box
              </span>
            </div>
          </TabPanel>
          <TabPanel value="useDragControls">
            <div className={cn(ui.demoArea)}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-80 h-30 bg-[#1f1f34] border border-motion rounded-md py-3 px-5 select-none">
                  <div
                    onPointerDown={(e) => controls.start(e)}
                    className="font-mono text-xs text-motion cursor-grab mb-2 flex items-center gap-3"
                  >
                    ⠿ drag handle
                  </div>
                  <motion.div
                    drag
                    dragControls={controls}
                    dragListener={false}
                    dragConstraints={{
                      left: -60,
                      right: 60,
                      top: -20,
                      bottom: 20,
                    }}
                    className="bg-[#8b5cf610] w-fit text-[#a0a0c0] border border-[#8b5cf644] rounded-md py-2 px-3 font-mono cursor-default"
                    onDrag={(_, info) =>
                      setPos({
                        x: Math.round(info.offset.x),
                        y: Math.round(info.offset.y),
                      })
                    }
                  >
                    draggable content
                  </motion.div>
                </div>
                <p className={motionDemoLabel}>
                  offset: x={pos.x}, y={pos.y}
                </p>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default GestureSection;
