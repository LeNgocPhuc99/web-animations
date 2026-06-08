import { useState } from "react";

import { AnimatePresence, LayoutGroup, Reorder, motion } from "motion/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { motionDemoLabel } from "~/motion/classes";

import { cn } from "~/lib/utils";
import MotionSectionWrapper from "../MotionSectionWrapper";

import {
  cards,
  layoutTabs,
  panelTabsCode,
  accordionItems,
  type LayoutTab,
  type LACard,
} from "./data";

const LayoutSection = () => {
  const [activeTab, setActiveTab] = useState<LayoutTab>("layout prop");

  // LA0
  const [expanded, setExpanded] = useState<boolean>(false);
  const [justify, setJustify] = useState("flex-start");

  // LA1
  const [selected, setSelected] = useState<LACard | null>(null);

  // LA2
  const [openId, setOpenId] = useState<number | null>(1);
  
  // LA3
  const [items, setItems] = useState([
    "Framer",
    "Motion",
    "Layout",
    "Reorder",
    "Group",
  ]);
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  return (
    <MotionSectionWrapper id="layout">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as LayoutTab)}
        >
          <TabList>
            {layoutTabs.map((tab) => (
              <TabItem value={tab.value} key={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="layout prop">
            <div className={cn(ui.demoArea, "flex-col items-stretch gap-3")}>
              <div className="flex-center flex-wrap">
                <button
                  className="btn"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  {expanded ? "collapse" : "expand"}
                </button>
                <button
                  className="btn"
                  onClick={() =>
                    setJustify((prev) =>
                      prev === "flex-start" ? "flex-end" : "flex-start",
                    )
                  }
                >
                  shift justify
                </button>
              </div>
              <div className="flex w-full" style={{ justifyContent: justify }}>
                <motion.div
                  layout
                  className={cn(
                    "bg-[#1f1f34] border border-motion rounded-lg p-3.5 flex flex-col gap-2",
                    expanded ? "w-65" : "w-30",
                  )}
                >
                  <motion.div
                    layout
                    className="font-mono text-sm font-semibold text-[#a78bfa]"
                  >
                    motion.div
                  </motion.div>
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={motionDemoLabel}
                      >
                        layout prop auto-animates size & position changes using
                        FLIP technique
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              <p className={motionDemoLabel}>
                layout prop — không cần biết giá trị từ/đến
              </p>
            </div>
          </TabPanel>
          <TabPanel value="layoutId shared">
            <div className={cn(ui.demoArea, "flex-col gap-3 min-h-50")}>
              <LayoutGroup>
                <AnimatePresence initial={false}>
                  {!selected ? (
                    <motion.div
                      key="cards"
                      className="flex flex-wrap gap-3"
                      layout
                    >
                      {cards.map((card) => (
                        <motion.div
                          key={card.id}
                          layoutId={`card-${card.id}`}
                          onClick={() => setSelected(card)}
                          className="flex h-16 w-16 cursor-pointer select-none items-center justify-center rounded-lg font-mono text-lg font-bold text-white"
                          style={{
                            backgroundColor: card.color,
                            boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                          }}
                          whileHover={{ scale: 1.05 }}
                        >
                          {card.label}
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="expanded"
                      layoutId={`card-${selected.id}`}
                      onClick={() => setSelected(null)}
                      className="flex cursor-pointer items-center justify-center rounded-xl text-white"
                      style={{
                        backgroundColor: selected.color,
                        width: 200,
                        height: 100,
                        boxShadow: "0 18px 34px rgba(0,0,0,0.28)",
                      }}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-mono text-3xl font-bold">
                          {selected.label}
                        </span>
                        <span className="font-mono text-[11px] text-white/75">
                          click to collapse
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </LayoutGroup>
              <p className={motionDemoLabel}>
                click card → expand. click lại → collapse (layoutId magic)
              </p>
            </div>
          </TabPanel>
          <TabPanel value="LayoutGroup">
            <div className={cn(ui.demoArea, "flex-col items-stretch gap-2")}>
              <LayoutGroup>
                {accordionItems.map((item) => {
                  const open = openId === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      layout
                      onClick={() => setOpenId(open ? null : item.id)}
                      className="cursor-pointer overflow-hidden rounded-md border border-white/10 bg-[#1f1f34] px-3.5 py-3"
                    >
                      <motion.div
                        layout
                        className="flex items-center justify-between gap-3 font-mono text-[13px] font-semibold"
                        style={{
                          color: open ? "#a78bfa" : "#eaeaf5",
                        }}
                      >
                        {item.title}
                        <motion.span
                          animate={{ rotate: open ? 45 : 0 }}
                          className="text-motion text-base leading-none"
                        >
                          +
                        </motion.span>
                      </motion.div>
                      <AnimatePresence>
                        {open && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 overflow-hidden font-mono text-[13px] leading-7 text-text-muted"
                          >
                            {item.content}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </LayoutGroup>
              <p className={motionDemoLabel}>
                item mở rộng thì các item khác tự reflow mượt hơn
              </p>
            </div>
          </TabPanel>
          <TabPanel value="list reorder">
            <div className={cn(ui.demoArea, "flex-col items-stretch gap-2")}>
              <Reorder.Group
                axis="y"
                values={items}
                onReorder={setItems}
                className="flex flex-col gap-1.5"
              >
                {items.map((item) => (
                  <Reorder.Item
                    key={item}
                    value={item}
                    className="flex cursor-grab select-none items-center gap-2 rounded-md border border-[#8b5cf644] px-3.5 py-2.5 font-mono text-[13px] text-[#eaeaf5]"
                    animate={{
                      scale: draggingItem === item ? 1.03 : 1,
                      backgroundColor:
                        draggingItem === item ? "#2d1f4a" : "#1f1f34",
                      boxShadow:
                        draggingItem === item
                          ? "0 10px 30px rgba(139,92,246,0.3)"
                          : "none",
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    onDragStart={() => setDraggingItem(item)}
                    onDragEnd={() => setDraggingItem(null)}
                  >
                    <span className="text-motion">⠿</span>
                    {item}
                  </Reorder.Item>
                ))}
              </Reorder.Group>
              <p className={motionDemoLabel}>
                kéo để sắp xếp - Reorder.Group + Reorder.Item
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </MotionSectionWrapper>
  );
};

export default LayoutSection;
