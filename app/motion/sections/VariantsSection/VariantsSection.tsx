import { useState } from "react";

import { motion } from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { cn } from "~/lib/utils";

import MotionSectionWrapper from "../MotionSectionWrapper";

import {
  words,
  items,
  bgList,
  navVariant,
  itemVariant,
  linkVariant,
  basicVariant,
  variantsTabs,
  childVariant,
  panelCodeTabs,
  parentVariant,
  containerVariant,
  type VariantTab,
} from "./data";

import { motionBox, motionDemoLabel } from "~/motion/classes";

const VariantsSection = () => {
  const [activeTab, setActiveTabs] = useState<VariantTab>("variants cơ bản");
  const [replayBasic, setReplayBasic] = useState(0);
  const [replayWhenOr, setReplayWhenOr] = useState(0);
  const [replayStagger, setReplayStagger] = useState(0);
  const [replayPropagation, setReplayPropagation] = useState(0);

  const action = (() => {
    switch (activeTab) {
      case "variants cơ bản":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayBasic((prev) => prev + 1)}
          >
            ▶ Replay
          </button>
        );
      case "staggerChildren":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayStagger((prev) => prev + 1)}
          >
            ▶ Replay
          </button>
        );
      case "when & orchestration":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayWhenOr((prev) => prev + 1)}
          >
            ▶ Replay
          </button>
        );
      case "propagation":
        return (
          <button
            className="btn btn-purple"
            onClick={() => setReplayPropagation((prev) => prev + 1)}
          >
            ▶ Replay
          </button>
        );
      default:
        return undefined;
    }
  })();

  return (
    <MotionSectionWrapper id="variants">
      <DemoCard code={panelCodeTabs[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTabs(val as VariantTab)}
        >
          <TabList>
            {variantsTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="variants cơ bản">
            <div className={cn(ui.demoArea)} key={replayBasic}>
              {["one", "two", "three"].map((t, i) => (
                <motion.div
                  key={t}
                  initial="hidden"
                  animate="visible"
                  variants={basicVariant}
                  className={cn(motionBox)}
                  transition={{
                    delay: i * 0.1,
                  }}
                  style={{ backgroundColor: bgList[i] ?? "#8b5cf6" }}
                >
                  {t}
                </motion.div>
              ))}
              <div className={cn(motionDemoLabel, "max-w-50")}>
                Variants: named states
                <br />
                <code>'hidden'</code> → <code>'visible'</code>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="staggerChildren">
            <div className={cn(ui.demoArea)} key={replayStagger}>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariant}
                className="flex gap-2.5 flex-wrap justify-center"
              >
                {words.map((world, index) => (
                  <motion.div
                    key={world}
                    variants={itemVariant}
                    className={cn(motionBox)}
                    style={{
                      backgroundColor: bgList[index] ?? "#8b5cf6",
                    }}
                  >
                    {world}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabPanel>
          <TabPanel value="when & orchestration">
            <div className={cn(ui.demoArea)} key={replayWhenOr}>
              <motion.div
                variants={parentVariant}
                initial="hidden"
                animate="visible"
                className={cn(
                  "bg-bg-surface border border-border-default p-4 rounded-md flex gap-2.5 flex-wrap",
                )}
              >
                <p className={cn(motionDemoLabel, "mb-1 w-full")}>
                  parent fades first (when: beforeChildren)
                </p>
                {[1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={`children-${i}`}
                    variants={childVariant}
                    className={cn(motionBox, "w-11 h-11 bg-motion")}
                  >
                    {i}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </TabPanel>
          <TabPanel value="propagation">
            <div className={cn(ui.demoArea)} key={replayPropagation}>
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={navVariant}
                className="flex flex-col gap-1.5 w-50 list-none"
              >
                {items.map((item) => (
                  <motion.li
                    key={item}
                    variants={linkVariant}
                    className={cn(
                      motionDemoLabel,
                      "border border-border-default py-2 px-3.5 flex rounded-md items-center gap-2 cursor-pointer",
                    )}
                  >
                    <span style={{ color: "#8b5cf6", fontSize: 14 }}>
                      {"→"}
                    </span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default VariantsSection;
