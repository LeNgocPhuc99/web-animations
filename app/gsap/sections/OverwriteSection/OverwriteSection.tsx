import { useRef, useState } from "react";

import { ui } from "~/styles/classes";
import { gBox, gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { overwriteTabs, panelTabsCode, type OverwriteTab } from "./data";
import GSAPSection from "../GSAPSection";

import { cn } from "~/lib/utils";

const OverwriteSection = () => {
  const [activeTab, setActiveTab] = useState<OverwriteTab>("overwrite");

  const action = (() => {
    switch (activeTab) {
      case "overwrite":
        return <button className="btn btn-green">▶ Play</button>;
      case "gsap.defaults()":
        return <button className="btn btn-green">▶ Play</button>;
      case "gsap.set()":
        return <button className="btn btn-green">▶ Play</button>;
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
                    <div className={cn(gBox, "bg-secondary")} id="owNone">
                      none
                    </div>
                    <p className={gsapDemoLabel}>overwrite: false</p>
                  </div>
                </div>
                {/* right side */}
                <div className="fle flex-1 gap-2.5 w-full min-w-55 flex-col items-center">
                  <div className="bg-bg-surface rounded-md px-3.5 py-2.5 text-text-muted text-xs">
                    <strong className="text-text-base">overwrite modes:</strong>
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
                    <div className={cn(gBox, "bg-green-400")} id="owNone">
                      d1
                    </div>
                    <p className={gsapDemoLabel}>với defaults</p>
                  </div>
                  <div className="flex gap-1 flex-col items-center">
                    <div className={cn(gBox, "bg-yellow-400")} id="owNone">
                      d2
                    </div>
                    <p className={gsapDemoLabel}>với defaults</p>
                  </div>
                </div>
                {/* right side */}
                <div className="fle flex-1 gap-2.5 w-full min-w-55 flex-col items-center">
                  <div className="bg-bg-surface rounded-md px-3.5 py-2.5 text-text-muted text-xs">
                    Cả hai tween chỉ cần chỉ định property animate —{" "}
                    <code>duration</code>, <code>ease</code> được tự động áp từ{" "}
                    <code>gsap.defaults()</code>.
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="gsap.set()">
            <div className={cn(ui.demoArea, "flex-col items-start")}>
              <div className="flex gap-2 w-full">
                {/* left side */}
                <div className={cn(gBox, "bg-pink-400 opacity-0")} id="owNone">
                  set 1
                </div>
                <div className={cn(gBox, "bg-purple-400 -translate-x-15")} id="owNone">
                  set 1
                </div>

                <div className="fle flex-1 gap-2.5 w-full min-w-55 flex-col items-center">
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
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default OverwriteSection;
