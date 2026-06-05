import { useState, useRef, useEffect } from "react";

import { motion, AnimatePresence } from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { motionBox, motionDemoLabel } from "~/motion/classes";

import { cn } from "~/lib/utils";

import MotionSectionWrapper from "../MotionSectionWrapper";

import {
  pages,
  routes,
  colors,
  aPTabs,
  routeKeys,
  initialItems,
  panelTabsCode,
  type APTab,
  type APRoute,
} from "./data";

const AnimatePresenceSection = () => {
  const [activeTab, setActiveTab] = useState<APTab>("exit animation");

  // AP0
  const [visible, setVisible] = useState(false);

  // AP1
  const [items, setItems] = useState(initialItems);
  const [next, setNext] = useState(initialItems.length + 1);

  // AP2
  const [page, setPage] = useState(0);

  // AP3
  const [route, setRoute] = useState<APRoute>("home");
  const dir = useRef(0);
  const prev = useRef(route);

  useEffect(() => {
    dir.current =
      routeKeys.indexOf(route) > routeKeys.indexOf(prev.current) ? 1 : -1;
    prev.current = route;
  }, [route]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        id: next,
        text: `item ${next}`,
        color: colors[next % 5],
      },
    ]);
    setNext((prev) => prev + 1);
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MotionSectionWrapper id="animate-presence">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as APTab)}
        >
          <TabList>
            {aPTabs.map((tab) => (
              <TabItem value={tab.value} key={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="exit animation">
            <div className={cn(ui.demoArea, "flex-col gap-4 min-h-35")}>
              <div className="flex gap-2.5">
                <button
                  className="btn btn-purple"
                  onClick={() => setVisible(true)}
                >
                  show
                </button>
                <button className="btn" onClick={() => setVisible(false)}>
                  hidden
                </button>
              </div>
              <div className="h-17.5 flex-center">
                <AnimatePresence mode="wait">
                  {visible && (
                    <motion.div
                      key="box"
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        y: -20,
                        transition: {
                          duration: 0.3,
                        },
                      }}
                      className={cn(motionBox, "w-20 h-15 bg-motion")}
                    >
                      hello
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="list add/remove">
            <div
              className={cn(ui.demoArea, "flex-col gap-2 items-stretch p-4")}
            >
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{
                      opacity: 0,
                      height: 0,
                      marginBottom: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: 40,
                      marginBottom: 6,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      marginBottom: 0,
                      transition: {
                        duration: 0.25,
                      },
                    }}
                    style={{
                      background: `${item.color}22`,
                      borderColor: `${item.color}55`,
                    }}
                    className="border font-mono text-xs rounded-md px-3.5 flex items-center justify-between"
                  >
                    <span>{item.text}</span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-0 cursor-pointer text-accent-teal text-[16px]"
                    >
                      x
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <button className="btn btn-purple mt-1" onClick={addItem}>
                + add item
              </button>
            </div>
          </TabPanel>
          <TabPanel value="mode: wait">
            <div className={cn(ui.demoArea, "flex-col gap-16")}>
              <div className="flex gap-1.5 flex-wrap justify-center">
                {pages.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i)}
                    className={cn("btn text-xs", i === page && "btn-purple")}
                  >
                    {p.icon} {p.label}
                  </button>
                ))}
              </div>
              <div className="w-55 h-20 overflow-hidden rounded-md relative bg-[#0f0f1c]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={page}
                    initial={{
                      opacity: 0,
                      x: 40,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      x: -40,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                    style={{
                      background: `${pages[page].color}22`,
                      borderColor: `${pages[page].color}44`,
                    }}
                    className="absolute text-sm indent-0 p-1 flex-center gap-2 border rounded-md font-mono"
                  >
                    {pages[page].icon} {pages[page].label}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className={motionDemoLabel}>
                mode="wait" — exit hoàn toàn trước khi enter
              </p>
            </div>
          </TabPanel>
          <TabPanel value="page transitions">
            <div className={cn(ui.demoArea, "flex-col gap-4")}>
              <div className="flex gap-1.5">
                {routeKeys.map((k) => (
                  <button
                    key={k}
                    onClick={() => setRoute(k)}
                    className={cn("btn", k === route && "btn-purple text-xs")}
                  >
                    {routes[k].label}
                  </button>
                ))}
              </div>
              <div className="w-full max-w-75 h-20 overflow-hidden rounded-md relative bg-[#0f0f1c]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={route}
                    initial={{
                      x: `${100 * dir.current}%`,
                      opacity: 0,
                    }}
                    animate={{
                      x: 0,
                      opacity: 1,
                      transition: {
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      },
                    }}
                    exit={{
                      x: `${-100 * dir.current}%`,
                      opacity: 0,
                      transition: {
                        duration: 0.2,
                      },
                    }}
                    style={{
                      background: `${routes[route].bg}22`,
                      borderColor: `${routes[route].bg}44`,
                    }}
                    className="absolute inset-0 flex-center font-mono text-xs border"
                  >
                    {routes[route].label}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default AnimatePresenceSection;
