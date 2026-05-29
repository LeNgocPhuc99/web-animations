import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { gBox, gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { overwriteTabs, panelTabsCode, type OverwriteTab } from "./data";
import GSAPSection from "../GSAPSection";

import { cn } from "~/lib/utils";

const OverwriteSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);

  const [activeTab, setActiveTab] = useState<OverwriteTab>("overwrite");

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const runOverwriteDemo = contextSafe(() => {
    // no overwrite — conflict visible
    gsap.set("#owNone", { x: 0 });
    gsap.to("#owNone", { x: 200, duration: 3, ease: "none" });
    setTimeout(() => {
      gsap.to("#owNone", {
        x: 60,
        duration: 0.5,
        ease: "power2.out",
      }); // fight
    }, 600);

    // overwrite: true — kills first
    gsap.set("#owTrue", { x: 0 });
    gsap.to("#owTrue", { x: 200, duration: 3, ease: "none" });
    setTimeout(() => {
      gsap.to("#owTrue", {
        x: 60,
        duration: 0.5,
        ease: "power2.out",
        overwrite: true,
      }); // wins
    }, 600);
  });

  const resetOverwriteDemo = contextSafe(() => {
    gsap.killTweensOf("#owNone");
    gsap.set("#owNone", { x: 0 });

    gsap.killTweensOf("#owTrue");
    gsap.set("#owTrue", { x: 0 });
  });

  const runDefaults = contextSafe(() => {
    gsap.defaults({ duration: 0.8, ease: "power2.out" });
    gsap.set("#def1", { x: 0 });
    gsap.set("#def2", { x: 0 });

    gsap.to("#def1", { x: 140, rotation: 180 });
    gsap.to("#def2", { x: 140, scale: 1.4, delay: 0.15 });

    setTimeout(
      () => gsap.defaults({ duration: 0.5, ease: "power2.out" }),
      2000,
    );
  });

  const resetDefault = contextSafe(() => {
    gsap.killTweensOf("#def1");
    gsap.set("#def1", { clearProps: "all" });

    gsap.killTweensOf("#def2");
    gsap.set("#def2", { clearProps: "all" });
  });

  const runSetDemo = contextSafe(() => {
    gsap.set("#setBox1", { opacity: 0, x: 0, scale: 0.7 });
    gsap.set("#setBox2", { x: -60 });
    gsap.to("#setBox1", {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(2)",
      delay: 0.1,
    });
    gsap.to("#setBox2", {
      x: 60,
      duration: 0.7,
      ease: "elastic.out(1,0.5)",
      delay: 0.2,
    });
  });

  const resetSetDemo = contextSafe(() => {
    gsap.killTweensOf("#setBox1");
    gsap.set("#setBox1", { clearProps: "all" });

    gsap.killTweensOf("#setBox2");
    gsap.set("#setBox2", { clearProps: "all" });
  });

  const action = (() => {
    switch (activeTab) {
      case "overwrite":
        return (
          <div className="flex gap-2 items-center">
            <button className="btn btn-green" onClick={runOverwriteDemo}>
              ▶ Play
            </button>
            <button className="btn" onClick={resetOverwriteDemo}>
              ↺ Reset
            </button>
          </div>
        );
      case "gsap.defaults()":
        return (
          <div className="flex gap-2 items-center">
            <button className="btn btn-green" onClick={runDefaults}>
              ▶ Play
            </button>
            <button className="btn" onClick={resetDefault}>
              ↺ Reset
            </button>
          </div>
        );
      case "gsap.set()":
        return (
          <div className="flex items-center gap-2">
            <button className="btn btn-green" onClick={runSetDemo}>
              ▶ Play
            </button>
            <button className="btn" onClick={resetSetDemo}>
              ↺ Reset
            </button>
          </div>
        );
    }
  })();

  return (
    <GSAPSection id="overwrite">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as OverwriteTab)}
        >
          <TabList>
            {overwriteTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="overwrite">
              <div className={cn(ui.demoArea, "flex-col items-start")}>
                <div className="flex gap-2 w-full">
                  {/* left side */}
                  <div className="flex-1 flex flex-col gap-2 items-start">
                    <div className="flex gap-1 flex-col items-center">
                      <div className={gBox} id="owNone">
                        none
                      </div>
                      <p className={gsapDemoLabel}>
                        overwrite: false
                        <br />
                        (conflict!)
                      </p>
                    </div>
                    <div className="flex gap-1 flex-col items-center">
                      <div className={cn(gBox, "bg-secondary")} id="owTrue">
                        true
                      </div>
                      <p className={gsapDemoLabel}>
                        overwrite: true
                        <br />
                        (kill old)
                      </p>
                    </div>
                  </div>
                  {/* right side */}
                  <div className="fle flex-1 gap-2.5 w-full min-w-55 flex-col items-center">
                    <div className="bg-bg-surface rounded-md px-3.5 py-2.5 text-text-muted text-xs">
                      <strong className="text-text-base">
                        overwrite modes:
                      </strong>
                      <br />
                      <code>false</code> — không override, cả 2 chạy song song
                      (conflict)
                      <br />
                      <code>true</code> — kill tất cả tween cũ trên cùng target
                      <br />
                      <code>'auto'</code> — chỉ kill các property đang conflict
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="gsap.defaults()">
              <div className={cn(ui.demoArea, "flex-col items-start")}>
                <div className="flex gap-2 w-full">
                  {/* left side */}
                  <div className="flex-1 flex flex-col gap-2 items-start">
                    <div className="flex gap-1 flex-col items-center">
                      <div className={cn(gBox, "bg-green-400")} id="def1">
                        d1
                      </div>
                      <p className={gsapDemoLabel}>với defaults</p>
                    </div>
                    <div className="flex gap-1 flex-col items-center">
                      <div className={cn(gBox, "bg-yellow-400")} id="def2">
                        d2
                      </div>
                      <p className={gsapDemoLabel}>với defaults</p>
                    </div>
                  </div>
                  {/* right side */}
                  <div className="fle flex-1 gap-2.5 w-full min-w-55 flex-col items-center">
                    <div className="bg-bg-surface rounded-md px-3.5 py-2.5 text-text-muted text-xs">
                      Cả hai tween chỉ cần chỉ định property animate —{" "}
                      <code>duration</code>, <code>ease</code> được tự động áp
                      từ <code>gsap.defaults()</code>.
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="gsap.set()">
              <div className={cn(ui.demoArea, "flex-col items-start")}>
                <div className="flex gap-2 w-full">
                  {/* left side */}
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(gBox, "bg-pink-400 opacity-0")}
                      id="setBox1"
                    >
                      set 1
                    </div>
                    <div
                      className={cn(gBox, "bg-purple-400 -translate-x-15")}
                      id="setBox2"
                    >
                      set 2
                    </div>
                  </div>

                  <div className="flex flex-1 gap-2.5 w-full min-w-55 flex-col items-center">
                    <div className="bg-bg-surface rounded-md px-3.5 py-2.5 text-text-muted text-xs">
                      <code>gsap.set()</code> là tween với{" "}
                      <code>duration: 0</code> — áp giá trị ngay lập tức, không
                      animate. Dùng để set trạng thái ban đầu trước khi animate,
                      hoặc reset sau khi xong.
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default OverwriteSection;
