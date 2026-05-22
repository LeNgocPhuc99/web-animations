import { useState } from "react";

import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { TabItem, TabList, TabPanel, Tabs } from "~/components/Tabs";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import { pfTabs, pfPanelCode, pfCheatRows, type PerformanceTab } from "./data";

import "./performance.css";

const PerformanceSection = () => {
  const [activeTab, setActiveTab] = useState<PerformanceTab>("render pipeline");
  const [playing, setPlaying] = useState(false);

  // will-change demo state
  const [wcStatus, setWcStatus] = useState("auto");
  const [wcActive, setWcActive] = useState(false);

  const handleWcEnter = () => {
    setWcStatus("transform, opacity");
    setWcActive(true);
  };

  const handleWcLeave = () => {
    setWcActive(false);
    setTimeout(() => {
      setWcStatus("auto");
    }, 450);
  };

  const action = (() => {
    if (activeTab === "GPU vs CPU race") {
      return (
        <button
          className={ui.button}
          type="button"
          onClick={() => setPlaying((prev) => !prev)}
        >
          Play / Pause
        </button>
      );
    }

    return undefined;
  })();

  return (
    <LessonSection id="performance">
      <DemoCard code={pfPanelCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as PerformanceTab)}
        >
          <TabList>
            {pfTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          {/* PANEL 0: PIPELINE */}
          <TabPanel value="render pipeline">
            <div
              className={cn(
                ui.demoArea,
                "py-6 px-8 flex-col items-stretch gap-4",
              )}
            >
              <div className="font-mono text-xs text-text-muted">
                browser phải chạy qua những bước nào tùy vào property bạn
                animate
              </div>
              <div className="pipe-wrap">
                {/* width/height */}
                <div className="pipe-row">
                  <div className="pipe-label-col text-accent-teal">
                    🔴 width / height / top / left
                  </div>
                  <span className="pipe-step ps-js">JS</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-style">Style</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-layout">Layout ⚠</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-paint">Paint ⚠</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-comp">Composite</span>
                </div>
                {/* background-color */}
                <div className="pipe-row">
                  <div className="pipe-label-col text-warning">
                    🟡 background-color / color
                  </div>
                  <span className="pipe-step ps-js">JS</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-style">Style</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-skip">Layout</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-paint">Paint ⚠</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-comp">Composite</span>
                </div>
                {/* transform / opacity */}
                <div className="pipe-row">
                  <div className="pipe-label-col text-success">
                    🟢 transform / opacity
                  </div>
                  <span className="pipe-step ps-js">JS</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-style">Style</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-skip">Layout</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-skip">Paint</span>
                  <span className="pipe-arrow">→</span>
                  <span className="pipe-step ps-comp font-bold text-success">
                    Composite ✓ GPU
                  </span>
                </div>
                <div className="grid grid-cols-1  md:grid-cols-3 gap-2.5 mt-2">
                  <div className="bg-(-accent-teal/8 border border-accent-teal/25 rounded-lg py-2.5 px-3">
                    <div className="font-mono text-xs text-accent-teal font-semibold mb-1">
                      Layout (Reflow)
                    </div>
                    <div className="text-xs text-text-muted">
                      Browser tính lại vị trí và kích thước của tất cả elements
                      liên quan. Chạy trên Main Thread — block JS.
                    </div>
                  </div>
                  <div className="bg-warning/8 border border-warning/25 rounded-lg py-2.5 px-3">
                    <div className="font-mono text-xs text-warning font-semibold mb-1">
                      Paint (Repaint)
                    </div>
                    <div className="text-xs text-text-muted">
                      Browser vẽ lại pixels — fill màu, border, shadow. Tốn CPU
                      nhưng ít hơn Layout.
                    </div>
                  </div>
                  <div className="bg-success/8 border border-success/25 rounded-lg py-2.5 px-3">
                    <div className="font-mono text-xs text-success font-semibold mb-1">
                      Composite
                    </div>
                    <div className="text-xs text-text-muted">
                      GPU ghép các layer đã được paint sẵn. Chạy trên Compositor
                      Thread riêng — không ảnh hưởng Main Thread.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 1: GPU vs CPU RACE */}
          <TabPanel value="GPU vs CPU race">
            <div
              className={cn(
                ui.demoArea,
                "py-6 px-8 flex-col items-stretch gap-4",
              )}
            >
              <div className="font-mono text-xs text-text-muted">
                cùng tốc độ visual — nhưng{" "}
                <code className="text-accent-teal">left</code> làm Main Thread
                liên tục recalculate layout
              </div>
              <div className="font-mono text-[10px] text-accent-teal mb-0.5">
                🔴 animate <code>left</code> — triggers Layout mỗi frame
              </div>
              <div className="race-track">
                <div
                  className={cn("race-ball rb-bad", playing && "race-on")}
                  id="pfBad"
                >
                  left<div className="race-badge">CPU</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-success">
                🟢 animate <code>transform: translateX</code> — Compositor
                Thread only
              </div>
              <div className="race-track">
                <div
                  className={cn("race-ball rb-good", playing && "race-on")}
                  id="pfGood"
                >
                  transform<div className="race-badge">GPU</div>
                </div>
              </div>
              <div className="bg-bg-surface rounded-lg py-2.4 px-3 text-xs text-text-muted mt-1">
                <strong className="text-text-base">Tại sao quan trọng?</strong>{" "}
                Khi Main Thread bận (JS đang chạy), animation dùng{" "}
                <code>left</code> sẽ drop frames. Animation dùng{" "}
                <code>transform</code> tiếp tục chạy mượt vì GPU Compositor
                Thread hoàn toàn độc lập.
              </div>
            </div>
          </TabPanel>
          {/* PANEL 2: COMPOSITE LAYERS */}
          <TabPanel value="composite layers">
            <div
              className={cn(
                ui.demoArea,
                "py-6 px-8 flex-col items-stretch gap-4",
              )}
            >
              <div className="font-mono text-xs text-text-muted">
                browser tạo GPU layer riêng cho elements có{" "}
                <code>transform</code>, <code>opacity</code>, hoặc{" "}
                <code>will-change</code>
              </div>
              <div className="flex gap-8 flex-wrap items-start">
                {/* layer stack visual */}
                <div className="flex-1 min-w-60">
                  <div className="font-mono text-[10px] text-text-muted mb-3">
                    layer stack — GPU composite cuối cùng
                  </div>
                  <div className="relative h-45" id="layerStack">
                    <div className="layer-card lc-gpu bottom-30 left-0 z-3">
                      <div className="layer-dot"></div>
                      <span>Modal (will-change: transform)</span>
                    </div>
                    <div className="layer-card lc-gpu bottom-17.5 left-5 z-2">
                      <div className="layer-dot"></div>
                      <span>Animated sidebar</span>
                    </div>
                    <div className="layer-card lc-cpu bottom-5 left-10 z-1">
                      <div className="layer-dot"></div>
                      <span>Document (main layer)</span>
                    </div>
                  </div>
                </div>
                {/* how layers created */}
                <div className="flex-1 min-w-55">
                  <div className="font-mono text-[10px] text-text-muted mb-2">
                    GPU layer được tạo khi:
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-success/8 border-l-2 border-l-success py-1.5 px-3 rounded-tr-md rounded-br-md text-xs">
                      <code className="text-success">
                        will-change: transform
                      </code>{" "}
                      <span className="text-text-muted">— explicit hint</span>
                    </div>
                    <div className="bg-success/8 border-l-2 border-l-success py-1.5 px-3 rounded-tr-md rounded-br-md text-xs">
                      <code className="text-success">
                        transform: translateZ(0)
                      </code>{" "}
                      <span className="text-text-muted">— hack cũ</span>
                    </div>
                    <div className="bg-success/8 border-l-2 border-l-success py-1.5 px-3 rounded-tr-md rounded-br-md text-xs">
                      <code className="text-success">position: fixed</code>{" "}
                      <span className="text-text-muted">— fixed elements</span>
                    </div>
                    <div className="bg-success/8 border-l-2 border-l-success py-1.5 px-3 rounded-tr-md rounded-br-md text-xs">
                      <code className="text-success">
                        video, canvas, iframe
                      </code>{" "}
                      <span className="text-text-muted">— luôn là layer</span>
                    </div>
                    <div className="bg-success/8 border-l-2 border-l-success py-1.5 px-3 rounded-tr-md rounded-br-md text-xs">
                      <code className="text-success">opacity &lt; 1</code> +
                      animation{" "}
                      <span className="text-text-muted">— auto-promote</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-accent-teal/7 border border-accent-teal/20 rounded-lg px-3 py-1.5 text-xs text-text-muted">
                <strong className="text-accent-teal">⚠ Layer explosion:</strong>{" "}
                Mỗi layer tốn VRAM. Đừng dùng{" "}
                <code>will-change: transform</code> cho mọi element — chỉ dùng
                trước khi animation thực sự bắt đầu, và remove sau khi kết thúc.
              </div>
            </div>
          </TabPanel>
          {/* PANEL 3: WILL-CHANGE */}
          <TabPanel value="will-change">
            <div
              className={cn(
                ui.demoArea,
                "py-6 px-8 flex-col items-stretch gap-4",
              )}
            >
              <div className="font-mono text-xs text-text-muted">
                <code>will-change</code> báo cho browser biết property nào sẽ
                thay đổi — browser chuẩn bị GPU layer trước
              </div>
              <div className="wc-grid">
                <div className="wc-card">
                  <div className="wc-title text-success">✅ Dùng đúng</div>
                  <div className="wc-desc">
                    Chỉ add <code>will-change</code> ngay trước khi animation
                    bắt đầu (hover, JS event). Remove sau khi animation kết
                    thúc.
                  </div>
                  <span className="wc-tag bg-success/15 text-success">
                    hover / JS add
                  </span>
                </div>
                <div className="wc-card">
                  <div className="wc-title text-accent-teal">
                    ❌ Anti-pattern
                  </div>
                  <div className="wc-desc">
                    Đặt <code>will-change</code> trên tất cả elements "để tăng
                    tốc". Gây layer explosion, tốn VRAM, thực ra làm chậm hơn.
                  </div>
                  <span className="wc-tag bg-accent-teal/10 text-accent-teal">
                    memory waste
                  </span>
                </div>
                <div className="wc-card">
                  <div className="wc-title text-warning">⚡ Best practice</div>
                  <div className="wc-desc">
                    Dùng <code>transform: translateZ(0)</code> thay thế nếu cần
                    promote layer cố định. Ít overhead hơn{" "}
                    <code>will-change</code>.
                  </div>
                  <span className="wc-tag bg-warning/10 text-warning">
                    stable layer
                  </span>
                </div>
              </div>
              <div className="bg-bg-surface rounded-lg py-4 px-6">
                <div className="font-mono text-xs text-text-muted pb-2.5">
                  Demo hover — will-change được add/remove đúng lúc
                </div>
                <div id="wcDemo" className="flex gap-3 flex-wrap">
                  <div
                    className="wc-box-correct wc-demo-box"
                    onMouseEnter={handleWcEnter}
                    onMouseLeave={handleWcLeave}
                    style={{
                      willChange: wcActive ? "transform, opacity" : "auto",
                      transform: wcActive
                        ? "scale(1.15) translateY(-4px)"
                        : "none",
                      opacity: wcActive ? 0.85 : 1,
                    }}
                  >
                    correct
                  </div>

                  <div
                    id="wcStatusBox"
                    className="flex-1 min-w-45 bg-bg-subtle rounded-lg py-2.5 px-3 font-mono text-xs"
                  >
                    <div>
                      will-change:{" "}
                      <span
                        id="wcStatus"
                        className={cn(
                          wcStatus === "auto"
                            ? "text-text-muted"
                            : "text-success",
                        )}
                      >
                        {wcStatus}
                      </span>
                    </div>
                    <div className="text-text-muted text-[10px] mt-1">
                      hover vào box để xem will-change được set/remove
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 4: CHEAT SHEET */}
          <TabPanel value="property cheat sheet">
            <div
              className={cn(
                ui.demoArea,
                "py-6 px-8 flex-col items-stretch gap-4",
              )}
            >
              <div className="font-mono text-xs text-text-muted">
                quick reference — property nào trigger bước nào trong pipeline
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-125 border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-b-border-subtle">
                      <th className="text-left px-3 py-2 font-mono text-xs text-text-muted font-semibold">
                        Property
                      </th>
                      <th className="text-center p- font-mono text-xs text-muted font-semibold">
                        Layout
                      </th>
                      <th className="text-center p- font-mono text-xs text-muted font-semibold">
                        Paint
                      </th>
                      <th className="text-center p- font-mono text-xs text-muted font-semibold">
                        Composite
                      </th>
                      <th className="text-left px-3 py-2 font-mono text-xs text-text-muted font-semibold">
                        Verdict
                      </th>
                    </tr>
                  </thead>
                  <tbody id="cheatTable">
                    {pfCheatRows.map((r, i) => (
                      <tr
                        key={r.prop}
                        className="border-b border-b-border-subtle"
                        style={{
                          background:
                            i % 2 === 0
                              ? "transparent"
                              : "rgba(255,255,255,0.01)",
                        }}
                      >
                        <td
                          className="px-3 py-2 font-mono text-xs"
                          style={{ color: r.color }}
                        >
                          {r.prop}
                        </td>
                        <td className="text-center p-2 font-mono text-xs">
                          {r.layout ? (
                            <span className="text-accent-teal font-semibold">
                              ⚠ yes
                            </span>
                          ) : (
                            <span className="text-success">✓ skip</span>
                          )}
                        </td>
                        <td className="text-center p-2 font-mono text-xs">
                          {r.paint ? (
                            <span className="text-accent-teal font-semibold">
                              ⚠ yes
                            </span>
                          ) : (
                            <span className="text-success">✓ skip</span>
                          )}
                        </td>
                        <td className="text-center p-2 font-mono text-xs">
                          <span className="text-success)">✓ yes</span>
                        </td>
                        <td
                          className="px-3 py-2 text-xs"
                          style={{ color: r.color }}
                        >
                          {r.verdict}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </LessonSection>
  );
};

export default PerformanceSection;
