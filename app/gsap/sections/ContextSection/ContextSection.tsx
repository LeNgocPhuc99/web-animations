import { useState, useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { contextTabs, panelTabsCode, type ContextTab } from "./data";

import GSAPSection from "../GSAPSection";

import "./context.css";

const ContextSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<ContextTab>(
    "vấn đề không cleanup",
  );

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const runScopeDemo = contextSafe(() => {
    gsap.set([".scope-box-a", ".scope-box-b"], { x: 0, opacity: 1 });
    gsap.from(".scope-box-a", {
      x: -30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "back.out(2)",
    });
    gsap.from(".scope-box-b", {
      x: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "elastic.out(1,0.5)",
      delay: 0.3,
    });
  });

  const action = (() => {
    switch (activeTab) {
      case "scope selector":
        return (
          <button className="btn btn-green" onClick={runScopeDemo} type="button">
            ▶ Demo
          </button>
        );
      default:
        return undefined;
    }
  })();
  return (
    <GSAPSection id="context">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ContextTab)}
        >
          <TabList>
            {contextTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="vấn đề không cleanup">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <div className="ctx-diagram">
                  <fieldset className="ctx-box ctx-warn">
                    <legend className="ctx-box-label">
                      ❌ Component (unmounted)
                    </legend>
                    <p className={gsapDemoLabel}>
                      Component unmount nhưng tween vẫn chạy trong GSAP ticker
                      <br />→ Cố update DOM đã bị xoá → Memory leak + console
                      errors
                    </p>
                  </fieldset>
                  <p className="text-center py-2 text-lg text-accent-teal">
                    ↓ zombie tween
                  </p>
                  <fieldset className="ctx-box ctx-warn">
                    <legend className="ctx-box-label">
                      GSAP ticker (global)
                    </legend>
                    <p
                      className={cn(gsapDemoLabel, "text-accent-teal")}
                    >{`gsap.to(deadElement, {x:100}) — still running!`}</p>
                  </fieldset>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="gsap.context()">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <div className="ctx-diagram">
                  <fieldset className="ctx-box ctx-highlight">
                    <legend className="ctx-box-label">gsap.context()</legend>
                    <p className={gsapDemoLabel}>
                      Bọc tất cả GSAP calls trong một context.
                      <br />
                      Gọi <code>ctx.revert()</code> → kill tất cả tweens +
                      restore inline styles.
                      <br />
                      <strong className="text-gsap">Scoped selector:</strong>
                      <code>ctx.selector('.box')</code> chỉ tìm trong element
                      scope.
                    </p>
                  </fieldset>
                  <p className="text-center py-2 text-lg text-gsap">
                    ↓ clean cleanup
                  </p>
                  <fieldset className="ctx-box ctx-highlight">
                    <legend className="ctx-box-label">component unmount</legend>
                    <p className={cn(gsapDemoLabel, "text-gsap")}>
                      ctx.revert() → all tweens killed ✓
                    </p>
                  </fieldset>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="useGSAP hook">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <div className="ctx-diagram">
                  <fieldset className="ctx-box ctx-highlight">
                    <legend className="ctx-box-label">
                      useGSAP(@gsap/react) — recommended
                    </legend>
                    <p className={gsapDemoLabel}>
                      Wrapper chính thức của GSAP cho React.
                      <br />
                      Tự động tạo context + revert khi unmount.
                      <br />
                      Hoạt động với{" "}
                      <strong className="text-gsap">
                        React 18 Strict Mode
                      </strong>{" "}
                      đúng cách.
                      <br />
                      Cú pháp giống <code>useEffect</code> — không cần học thêm
                      nhiều.
                    </p>
                  </fieldset>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="scope selector">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col items-stretch gap-4 px-4 py-3",
                )}
              >
                <div className="ctx-scope-grid">
                  <div className="ctx-scope-panel ctx-scope-panel-a">
                    <p className={cn(gsapDemoLabel, "mb-2")}>
                      Component A (scope A)
                    </p>
                    <div className="ctx-scope-lane">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div className="ctx-scope-box scope-box-a" key={index} />
                      ))}
                    </div>
                  </div>
                  <div className="ctx-scope-panel ctx-scope-panel-b">
                    <p className={cn(gsapDemoLabel, "mb-2")}>
                      Component B (scope B)
                    </p>
                    <div className="ctx-scope-lane">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <div
                          className="ctx-scope-box ctx-scope-box-blue scope-box-b"
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="ctx-scope-note">
                  <strong className="text-text-base">Scope selector</strong> đảm
                  bảo GSAP selector chạy trong component scope hiện tại. Callback
                  được bọc bằng <code>contextSafe()</code> nên tween tạo từ nút
                  Demo vẫn được context quản lý và cleanup khi unmount.
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default ContextSection;
