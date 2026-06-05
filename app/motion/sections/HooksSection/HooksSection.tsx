import { useState, useRef, type MouseEvent } from "react";

import {
  motion,
  useSpring,
  useScroll,
  useTransform,
  useMotionValue,
} from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { motionBox, motionDemoLabel } from "~/motion/classes";

import { cn } from "~/lib/utils";

import MotionSectionWrapper from "../MotionSectionWrapper";

import { hooksTabs, panelTabsCode, type HooksTab } from "./data";

const HooksSection = () => {
  const [activeTab, setActiveTab] = useState<HooksTab>("useMotionValue");

  // HK0
  const x0 = useMotionValue(0);
  const bg = useTransform(
    x0,
    [-100, 0, 100],
    ["#ec4899", "#8b5cf6", "#14b8a6"],
  );

  // HK1
  const x1 = useMotionValue(0);
  const opacity = useTransform(x1, [-180, 0, 180], [0.2, 1, 0.2]);
  const rotate = useTransform(x1, [-180, 180], [-25, 25]);
  const scale = useTransform(x1, [-180, 0, 180], [0.7, 1, 0.7]);
  const color = useTransform(
    x1,
    [-180, 0, 180],
    ["#ec4899", "#8b5cf6", "#14b8a6"],
  );

  // HK2
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25 });
  const springX2 = useSpring(mouseX, { stiffness: 80, damping: 15 });
  const springY2 = useSpring(mouseY, { stiffness: 80, damping: 15 });

  const onMove = (e: MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const onLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionSectionWrapper id="hooks">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as HooksTab)}
        >
          <TabList>
            {hooksTabs.map((tab) => (
              <TabItem value={tab.value} key={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="useMotionValue">
            <div className={cn(ui.demoArea, "flex-col gap-4")}>
              <motion.div
                drag="x"
                dragMomentum={false}
                style={{
                  x: x0,
                  backgroundColor: bg,
                }}
                className={cn(motionBox, "cursor-grab")}
              >
                drag me
              </motion.div>
              <p className={cn(motionDemoLabel, "text-center")}>
                kéo trái/phải — color thay đổi theo x<br />
                <span className="text-motion">useMotionValue</span> không
                trigger re-render
              </p>
            </div>
          </TabPanel>
          <TabPanel value="useTransform">
            <div className={cn(ui.demoArea, "flex-col gap-4")}>
              <motion.div
                drag="x"
                dragMomentum={false}
                dragElastic={0.05}
                style={{
                  x: x1,
                  opacity,
                  rotate,
                  scale,
                  backgroundColor: color,
                }}
                className={cn(motionBox, "cursor-grab")}
                whileDrag={{
                  cursor: "grabbing",
                }}
              >
                drag
              </motion.div>
              <p className={cn(motionDemoLabel, "text-center")}>
                <span style={{ color: "#a78bfa" }}>opacity</span>,{" "}
                <span style={{ color: "#34d399" }}>rotate</span>,{" "}
                <span style={{ color: "#60a5fa" }}>scale</span>,{" "}
                <span style={{ color: "#fbbf24" }}>color</span>
                <br />
                tất cả transform từ cùng một motion value x
              </p>
            </div>
          </TabPanel>
          <TabPanel value="useSpring">
            <div className={cn(ui.demoArea, "flex gap-2")}>
              <div
                onMouseMove={onMove}
                onMouseLeave={onLeave}
                className="w-65 h-30 rounded-md bg-[#0f0f1c] border border-[#333] relative cursor-none flex-center"
              >
                <span className={cn(motionDemoLabel)}>hover & move mouse</span>
                <motion.div
                  className={cn(
                    motionBox,
                    "w-9 h-9 rounded-full bg-motion absolute pointer-events-none",
                  )}
                  style={{
                    x: springX,
                    y: springY,
                  }}
                />
                <motion.div
                  className={cn(
                    motionBox,
                    "w-6 h-6 rounded-full bg-[#ec4899] opacity-50 absolute pointer-events-none",
                  )}
                  style={{
                    x: springX2,
                    y: springY2,
                  }}
                />
              </div>
              <span className={motionDemoLabel}>
                2 springs với stiffness khác nhau → lag effect
              </span>
            </div>
          </TabPanel>
          <TabPanel value="useScroll">
            <HooksScrollDemo />
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

const HooksScrollDemo = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const scrollOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.3, 1, 0.3],
  );

  return (
    <div className={cn(ui.demoArea, "flex-col gap-0 p-0")}>
      <div style={{ width: "100%", height: 3, position: "relative" }}>
        <motion.div
          style={{
            height: 3,
            background: "#8b5cf6",
            transformOrigin: "left",
            scaleX,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
          }}
        />
      </div>
      <div
        ref={scrollRef}
        style={{
          height: 200,
          overflowY: "auto",
          padding: "1rem",
          width: "100%",
        }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            style={{
              opacity: scrollOpacity,
              background: "#1f1f34",
              border: "1px solid #333",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 8,
              fontFamily: "DM Mono,monospace",
              fontSize: 12,
              color: "#a0a0c0",
            }}
          >
            Section {i + 1} — scroll để xem progress bar
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HooksSection;
