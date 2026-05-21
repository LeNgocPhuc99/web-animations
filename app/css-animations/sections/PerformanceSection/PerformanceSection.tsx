import { useState } from "react";

import { ui } from "~/css-animations/classes";
import { DemoCard } from "~/css-animations/components";
import { TabItem, TabList, TabPanel, Tabs } from "~/components/Tabs";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./performance.css";

const tabs = [
  { label: "render pipeline", value: "render pipeline" },
  { label: "GPU vs CPU race", value: "GPU vs CPU race" },
  { label: "composite layers", value: "composite layers" },
  { label: "will-change", value: "will-change" },
  { label: "property cheat sheet", value: "property cheat sheet" },
] as const;

type PerformanceTab = (typeof tabs)[number]["value"];

const panelCode: Record<PerformanceTab, string> = {
  "render pipeline": `
    <span class="c">/* Mỗi frame animation, browser chạy lại toàn bộ pipeline */</span><br>
    <span class="c">/* width → Layout + Paint + Composite = 3 bước tốn kém */</span><br>
    <span class="c">/* transform → chỉ Composite = GPU làm hết, 60fps ổn định */</span>`,
  "GPU vs CPU race": `
    <span class="c">/* 🔴 Main Thread phải recalculate mỗi frame */</span><br>
    <span class="k">@keyframes</span> bad { <span class="k">from</span> { <span class="p">left</span>: <span class="v">0</span> } <span class="k">to</span> { <span class="p">left</span>: <span class="v">90%</span> } }<br>
    <span class="c">/* 🟢 GPU Compositor tự xử lý, không cần Main Thread */</span><br>
    <span class="k">@keyframes</span> good { <span class="k">from</span> { <span class="p">transform</span>: <span class="v">translateX(0)</span> } <span class="k">to</span> { <span class="p">transform</span>: <span class="v">translateX(90%)</span> } }
  `,
  "composite layers": `
    <span class="c">/* Kiểm tra layers: DevTools → Rendering → Layer borders (hiện màu xanh) */</span><br>
    <span class="c">/* hoặc: DevTools → Layers panel (Chrome) */</span><br>
    <span class="c">/* Mỗi layer màu cam = GPU layer riêng */</span>`,
  "will-change": `
    <span class="c">/* ✅ Pattern chuẩn: add trước animation, remove sau */</span><br>
    el.addEventListener(<span class="v">'mouseenter'</span>, () => el.style.willChange = <span class="v">'transform, opacity'</span>);<br>
    el.addEventListener(<span class="v">'mouseleave'</span>, () => el.style.willChange = <span class="v">'auto'</span>);<br>
    <span class="c">/* hoặc CSS: .el:hover { will-change: transform } */</span><br>
    <span class="c">/* JS: el.style.willChange = 'auto' sau animationend */</span>
  `,
  "property cheat sheet": `
    <span class="c">/* Rule đơn giản để nhớ: */</span><br>
    <span class="c">/* animate POSITION → dùng transform: translate thay left/top */</span><br>
    <span class="c">/* animate SIZE → dùng transform: scale thay width/height */</span><br>
    <span class="c">/* animate SHOW/HIDE → dùng opacity thay display/visibility */</span>
  `,
};

const PerformanceSection = () => {
  const [activeTab, setActiveTab] = useState<PerformanceTab>("render pipeline");
  const [playing, setPlaying] = useState(false);

  // will-change demo state
  const [wcStatus, setWcStatus] = useState("auto");
  const [wcActive, setWcActive] = useState(false);

  const cheatRows = [
    {
      prop: "transform",
      layout: false,
      paint: false,
      comp: true,
      verdict: "✅ GPU only — best",
      color: "var(--accent3)",
    },
    {
      prop: "opacity",
      layout: false,
      paint: false,
      comp: true,
      verdict: "✅ GPU only — best",
      color: "var(--accent3)",
    },
    {
      prop: "filter (blur…)",
      layout: false,
      paint: true,
      comp: true,
      verdict: "🟡 Paint trigger",
      color: "var(--accent4)",
    },
    {
      prop: "background-color",
      layout: false,
      paint: true,
      comp: true,
      verdict: "🟡 Paint trigger",
      color: "var(--accent4)",
    },
    {
      prop: "color",
      layout: false,
      paint: true,
      comp: true,
      verdict: "🟡 Paint trigger",
      color: "var(--accent4)",
    },
    {
      prop: "box-shadow",
      layout: false,
      paint: true,
      comp: true,
      verdict: "🟡 Paint trigger",
      color: "var(--accent4)",
    },
    {
      prop: "border-radius",
      layout: false,
      paint: true,
      comp: true,
      verdict: "🟡 Paint trigger",
      color: "var(--accent4)",
    },
    {
      prop: "left / top",
      layout: true,
      paint: true,
      comp: true,
      verdict: "🔴 Full pipeline",
      color: "#e24b4a",
    },
    {
      prop: "width / height",
      layout: true,
      paint: true,
      comp: true,
      verdict: "🔴 Full pipeline",
      color: "#e24b4a",
    },
    {
      prop: "margin / padding",
      layout: true,
      paint: true,
      comp: true,
      verdict: "🔴 Full pipeline",
      color: "#e24b4a",
    },
    {
      prop: "font-size",
      layout: true,
      paint: true,
      comp: true,
      verdict: "🔴 Full pipeline",
      color: "#e24b4a",
    },
    {
      prop: "display / visibility",
      layout: true,
      paint: true,
      comp: true,
      verdict: "🔴 Full pipeline",
      color: "#e24b4a",
    },
  ];

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
      <DemoCard code={panelCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as PerformanceTab)}
        >
          <TabList>
            {tabs.map((tab) => (
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
              <div className="font-mono text-[11px] text-(--muted)">
                browser phải chạy qua những bước nào tùy vào property bạn
                animate
              </div>
              <div className="pipe-wrap">
                {/* width/height */}
                <div className="pipe-row">
                  <div className="pipe-label-col text-(--accent7)">
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
                  <div className="pipe-label-col text-(--accent4)">
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
                  <div className="pipe-label-col text-(--accent3)">
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
                  <span className="pipe-step ps-comp font-bold text-(--accent3)">
                    Composite ✓ GPU
                  </span>
                </div>
                <div className="grid grid-cols-1  md:grid-cols-3 gap-2.5 mt-2">
                  <div className="bg-(--bg6) border border-(--border4) rounded-lg py-2.5 px-3">
                    <div className="font-mono text-[11px] text-(--accent7) font-semibold mb-1">
                      Layout (Reflow)
                    </div>
                    <div className="text-[12px] text-(--muted)">
                      Browser tính lại vị trí và kích thước của tất cả elements
                      liên quan. Chạy trên Main Thread — block JS.
                    </div>
                  </div>
                  <div className="bg-(--bg7) border border-(--border5) rounded-lg py-2.5 px-3">
                    <div className="font-mono text-[11px] text-(--accent4) font-semibold mb-1">
                      Paint (Repaint)
                    </div>
                    <div className="text-[12px] text-(--muted)">
                      Browser vẽ lại pixels — fill màu, border, shadow. Tốn CPU
                      nhưng ít hơn Layout.
                    </div>
                  </div>
                  <div className="bg-(--bg8) border border-(--border6) rounded-lg py-2.5 px-3">
                    <div className="font-mono text-[11px] text-(--accent3) font-semibold mb-1">
                      Composite
                    </div>
                    <div className="text-[12px] text-(--muted)">
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
              <div className="font-mono text-[11px] text-(--muted)">
                cùng tốc độ visual — nhưng{" "}
                <code className="text-(--accent7)">left</code> làm Main Thread
                liên tục recalculate layout
              </div>
              <div className="font-mono text-[10px] text-(--accent7) mb-0.5">
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
              <div className="font-mono text-[10px] text-(--accent3)">
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
              {/* background:var(--bg3);border-radius:8px;padding:10px 14px;font-size:12px;color:var(--muted);line-height:1.7;margin-top:4px */}
              <div className="bg-(--bg3) rounded-lg py-2.4 px-3 text-[12px] text-(--muted) mt-1">
                <strong className="text-(--text)">Tại sao quan trọng?</strong>{" "}
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
              <div className="font-mono text-[11px] text-(--muted)">
                browser tạo GPU layer riêng cho elements có{" "}
                <code>transform</code>, <code>opacity</code>, hoặc{" "}
                <code>will-change</code>
              </div>
              <div className="flex gap-8 flex-wrap items-start">
                {/* layer stack visual */}
                <div className="flex-1 min-w-60">
                  <div className="font-mono text-[10px] text-(--muted) mb-3">
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
                  <div className="font-mono text-[10px] text-(--muted) mb-2">
                    GPU layer được tạo khi:
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="bg-(--bg8) border-l-2 border-l-(--accent3) py-1.5 px-3 rounded-tr-md rounded-br-md text-[12px]">
                      <code className="text-(--accent3)">
                        will-change: transform
                      </code>{" "}
                      <span className="text-(--muted)">— explicit hint</span>
                    </div>
                    <div className="bg-(--bg8) border-l-2 border-l-(--accent3) py-1.5 px-3 rounded-tr-md rounded-br-md text-[12px]">
                      <code className="text-(--accent3)">
                        transform: translateZ(0)
                      </code>{" "}
                      <span className="text-(--muted)">— hack cũ</span>
                    </div>
                    <div className="bg-(--bg8) border-l-2 border-l-(--accent3) py-1.5 px-3 rounded-tr-md rounded-br-md text-[12px]">
                      <code className="text-(--accent3)">position: fixed</code>{" "}
                      <span className="text-(--muted)">— fixed elements</span>
                    </div>
                    <div className="bg-(--bg8) border-l-2 border-l-(--accent3) py-1.5 px-3 rounded-tr-md rounded-br-md text-[12px]">
                      <code className="text-(--accent3)">
                        video, canvas, iframe
                      </code>{" "}
                      <span className="text-(--muted)">— luôn là layer</span>
                    </div>
                    <div className="bg-(--bg8) border-l-2 border-l-(--accent3) py-1.5 px-3 rounded-tr-md rounded-br-md text-[12px]">
                      <code className="text-(--accent3)">opacity &lt; 1</code> +
                      animation{" "}
                      <span className="text-(--muted)">— auto-promote</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-(--bg9) border border-(--border7) rounded-lg px-3 py-1.5 text-[12px] text-(--muted)">
                <strong className="text-(--accent7)">⚠ Layer explosion:</strong>{" "}
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
              <div className="font-mono text-[11px] text-(--muted)">
                <code>will-change</code> báo cho browser biết property nào sẽ
                thay đổi — browser chuẩn bị GPU layer trước
              </div>
              <div className="wc-grid">
                <div className="wc-card">
                  <div className="wc-title text-(--accent3)">✅ Dùng đúng</div>
                  <div className="wc-desc">
                    Chỉ add <code>will-change</code> ngay trước khi animation
                    bắt đầu (hover, JS event). Remove sau khi animation kết
                    thúc.
                  </div>
                  <span className="wc-tag bg-(--bg5) text-(--accent3)">
                    hover / JS add
                  </span>
                </div>
                <div className="wc-card">
                  <div className="wc-title text-(--accent7)">
                    ❌ Anti-pattern
                  </div>
                  <div className="wc-desc">
                    Đặt <code>will-change</code> trên tất cả elements "để tăng
                    tốc". Gây layer explosion, tốn VRAM, thực ra làm chậm hơn.
                  </div>
                  <span className="wc-tag bg-(--bg10) text-(--accent7)">
                    memory waste
                  </span>
                </div>
                <div className="wc-card">
                  <div className="wc-title text-(--accent4)">
                    ⚡ Best practice
                  </div>
                  <div className="wc-desc">
                    Dùng <code>transform: translateZ(0)</code> thay thế nếu cần
                    promote layer cố định. Ít overhead hơn{" "}
                    <code>will-change</code>.
                  </div>
                  <span className="wc-tag bg-(--bg11) text-(--accent4)">
                    stable layer
                  </span>
                </div>
              </div>
              <div className="bg-(--bg3) rounded-lg py-4 px-6">
                <div className="font-mono text-[11px] text-(--muted) pb-2.5">
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
                    className="flex-1 min-w-45 bg-(--bg2) rounded-lg py-2.5 px-3 font-mono text-[11px]"
                  >
                    <div>
                      will-change:{" "}
                      <span
                        id="wcStatus"
                        className={cn(
                          wcStatus === "auto"
                            ? "text-(--muted)"
                            : "text-(--accent3)",
                        )}
                      >
                        {wcStatus}
                      </span>
                    </div>
                    <div className="text-(--muted) text-[10px] mt-1">
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
              <div className="font-mono text-[11px] text-(--muted)">
                quick reference — property nào trigger bước nào trong pipeline
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-125 border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-b-(--border)">
                      <th className="text-left px-3 py-2 font-mono text-[11px] text-(--muted) font-semibold">
                        Property
                      </th>
                      <th className="text-center p- font-mono text-[11px] text-muted font-semibold">
                        Layout
                      </th>
                      <th className="text-center p- font-mono text-[11px] text-muted font-semibold">
                        Paint
                      </th>
                      <th className="text-center p- font-mono text-[11px] text-muted font-semibold">
                        Composite
                      </th>
                      <th className="text-left px-3 py-2 font-mono text-[11px] text-(--muted) font-semibold">
                        Verdict
                      </th>
                    </tr>
                  </thead>
                  <tbody id="cheatTable">
                    {cheatRows.map((r, i) => (
                      <tr
                        key={r.prop}
                        className="border-b border-b-(--border)"
                        style={{
                          background:
                            i % 2 === 0
                              ? "transparent"
                              : "rgba(255,255,255,0.01)",
                        }}
                      >
                        <td
                          className="px-3 py-2 font-mono text-[12px]"
                          style={{ color: r.color }}
                        >
                          {r.prop}
                        </td>
                        <td className="text-center p-2 font-mono text-[12px]">
                          {r.layout ? (
                            <span className="text-[#e24b4a] font-semibold">
                              ⚠ yes
                            </span>
                          ) : (
                            <span className="text-(--accent3)">✓ skip</span>
                          )}
                        </td>
                        <td className="text-center p-2 font-mono text-[12px]">
                          {r.paint ? (
                            <span className="text-[#e24b4a] font-semibold">
                              ⚠ yes
                            </span>
                          ) : (
                            <span className="text-(--accent3)">✓ skip</span>
                          )}
                        </td>
                        <td className="text-center p-2 font-mono text-[12px]">
                          <span className="text-(--accent3)">✓ yes</span>
                        </td>
                        <td
                          className="px-3 py-2 text-[12px]"
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
