import { useState } from "react";

import { ui } from "~/css-animations/classes";
import { DemoCard } from "~/css-animations/components";

import { TabItem, TabList, TabPanel, Tabs } from "~/components/Tabs";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./transform.css";

const tabs = [
  { label: "translate", value: "translate" },
  { label: "scale", value: "scale" },
  { label: "rotate", value: "rotate" },
  { label: "skew", value: "skew" },
  { label: "transform-origin", value: "transform-origin" },
  { label: "GPU vs CPU", value: "GPU vs CPU" },
  { label: "combo playground", value: "combo playground" },
] as const;

type TransformTab = (typeof tabs)[number]["value"];

type ComboState = {
  tx: number;
  ty: number;
  ro: number;
  sc: number;
  sk: number;
  br: number;
};

const initialCombo: ComboState = {
  tx: 0,
  ty: 0,
  ro: 0,
  sc: 100,
  sk: 0,
  br: 10,
};

const panelCode: Record<TransformTab, string> = {
  translate: `
    <span class="c">/* translate không thay đổi vị trí trong document flow */</span><br>
    <span class="p">transform</span>: <span class="v">translateX(24px)</span>;&nbsp;&nbsp; <span class="c">/* trái/phải */</span><br>
    <span class="p">transform</span>: <span class="v">translateY(-24px)</span>;&nbsp; <span class="c">/* lên/xuống */</span><br>
    <span class="p">transform</span>: <span class="v">translate(18px,-18px)</span>; <span class="c">/* cả 2 */</span><br>
    <span class="p">transform</span>: <span class="v">translate3d(x,y,0)</span>;&nbsp; <span class="c">/* force GPU composite layer */</span>
  `,
  scale: `
    <span class="p">transform</span>: <span class="v">scale(1.6)</span>;&nbsp;&nbsp;&nbsp; <span class="c">/* đều cả 2 trục */</span><br>
    <span class="p">transform</span>: <span class="v">scale(1.5, 0.8)</span>; <span class="c">/* X khác Y */</span><br>
    <span class="p">transform</span>: <span class="v">scaleX(2)</span>;&nbsp;&nbsp;&nbsp; <span class="c">/* chỉ trục X — dùng cho reveal effect */</span><br>
    <span class="c">/* scale(0) → scale(1): pattern phổ biến cho modal, tooltip appear */</span>
  `,
  rotate: `
    <span class="p">transform</span>: <span class="v">rotate(45deg)</span>;&nbsp;&nbsp; <span class="c">/* deg, turn, rad đều được */</span><br>
    <span class="p">transform</span>: <span class="v">rotate(0.5turn)</span>; <span class="c">/* 0.5turn = 180deg */</span><br>
    <span class="p">transform</span>: <span class="v">rotate(-90deg)</span>;&nbsp; <span class="c">/* âm = ngược chiều kim đồng hồ */</span><br>
    <span class="c">/* kết hợp với transform-origin để xoay quanh điểm tuỳ chọn */</span>
  `,
  skew: `
    <span class="p">transform</span>: <span class="v">skewX(20deg)</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="c">/* nghiêng ngang */</span><br>
    <span class="p">transform</span>: <span class="v">skewY(15deg)</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="c">/* nghiêng dọc */</span><br>
    <span class="p">transform</span>: <span class="v">skewX(15deg) skewY(5deg)</span>;&nbsp;&nbsp; <span class="c">/* kết hợp */</span><br>
    <span class="c">/* skew thường dùng cho hero sections, italic-style headings */</span>`,
  "transform-origin": `
    <span class="c">/* mặc định: center center = 50% 50% */</span><br>
    <span class="p">transform-origin</span>: <span class="v">top left</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="c">/* góc trên trái */</span><br>
    <span class="p">transform-origin</span>: <span class="v">50% 100%</span>;&nbsp;&nbsp;&nbsp;&nbsp; <span class="c">/* giữa đáy — pendulum */</span><br>
    <span class="p">transform-origin</span>: <span class="v">0 0</span>;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="c">/* góc trên trái bằng px */</span><br>
    <span class="c">/* dùng khi làm fold, hinge, dropdown reveal effects */</span>`,
  "GPU vs CPU": `
    <span class="c">/* 🔴 BAD — triggers Layout + Paint mỗi frame */</span><br>
    <span class="k">@keyframes</span> { <span class="k">from</span> { <span class="p">left</span>: <span class="v">0</span> } <span class="k">to</span> { <span class="p">left</span>: <span class="v">100%</span> } }<br>
    <span class="c">/* 🟢 GOOD — chỉ Composite, GPU xử lý riêng thread */</span><br>
    <span class="k">@keyframes</span> { <span class="k">from</span> { <span class="p">transform</span>: <span class="v">translateX(0)</span> } <span class="k">to</span> { <span class="p">transform</span>: <span class="v">translateX(300px)</span> } }
  `,
  "combo playground": `
    <span class="c">/* thứ tự trong transform shorthand quan trọng! */</span><br>
    <span class="c">/* translate trước rotate: di chuyển rồi xoay tại chỗ mới */</span><br>
    <span class="p">transform</span>: <span class="v">translateX(50px) rotate(45deg)</span>;<br>
    <span class="c">/* rotate trước translate: xoay hệ trục rồi di chuyển theo hệ trục mới */</span><br>
    <span class="p">transform</span>: <span class="v">rotate(45deg) translateX(50px)</span>;
  `,
};

const pipelineClasses = {
  badBox: `py-1 px-2.5 bg-(--bg4) border border-(--border3) rounded-sm font-mono text-[10px] text-(--accent7)`,
  arrow: `text-(--muted) text-[12px]`,
  goodBox: `py-1 px-2.5 bg-(--bg5) border border-(--accent3) rounded-sm font-mono text-[10px] text-(--accent3)`,
  disabledBox: `"py-1 px-2.5 bg-(--bg3) border border-(--border) rounded-sm text-mono text-[10px] text-(--muted)`,
};

const TransformSection = () => {
  const [activeTab, setActiveTab] = useState<TransformTab>("translate");
  const [playing, setPlaying] = useState<boolean>(false);
  const [combo, setCombo] = useState<ComboState>(initialCombo);

  const scale = (combo.sc / 100).toFixed(2);
  const comboTransform = `translateX(${combo.tx}px) translateY(${combo.ty}px) rotate(${combo.ro}deg) scale(${scale}) skewX(${combo.sk}deg)`;

  const updateCombo = (key: keyof ComboState, value: number) => {
    setCombo((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetCombo = () => {
    setCombo(initialCombo);
  };

  const action = (() => {
    if (activeTab === "GPU vs CPU") {
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
    if (activeTab === "combo playground") {
      return (
        <button className={ui.button} onClick={resetCombo} type="button">
          ↺ Reset
        </button>
      );
    }

    return undefined;
  })();

  return (
    <LessonSection id="transform">
      <DemoCard code={panelCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TransformTab)}
        >
          <TabList>
            {tabs.map((tab) => (
              <TabItem value={tab.value} key={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          {/* PANEL 0: TRANSLATE */}
          <TabPanel value="translate">
            <div className={cn(ui.demoArea, "py-6 px-8")}>
              <div className="tl-grid">
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-tx">X</div>
                  </div>
                  <div className="tl-label">
                    translateX(24px)
                    <br />
                    <span className="text-var(--accent)">trái ↔ phải</span>
                  </div>
                </div>
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-ty">Y</div>
                  </div>
                  <div className="tl-label">
                    translateY(-24px)
                    <br />
                    <span className="text-var(--accent2)">lên ↕ xuống</span>
                  </div>
                </div>
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-txy">XY</div>
                  </div>
                  <div className="tl-label">
                    translate(18px,-18px)
                    <br />
                    <span className="text-(--accent3)">shorthand 2 trục</span>
                  </div>
                </div>
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-t3d">3D</div>
                  </div>
                  <div className="tl-label">
                    translate3d(x,y,0)
                    <br />
                    <span className="text-var(--accent4)">force GPU layer</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 1: SCALE */}
          <TabPanel value="scale">
            <div className={cn(ui.demoArea, "py-6 px-8")}>
              <div className="sc-grid">
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-up" />
                  </div>
                  <div className="tl-label">
                    scale(1.6)
                    <br />
                    <span className="text-(--accent)">phóng to đều</span>
                  </div>
                </div>
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-down" />
                  </div>
                  <div className="tl-label">
                    scale(0.5)
                    <br />
                    <span className="text-(--accent2)">thu nhỏ</span>
                  </div>
                </div>
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-x" />
                  </div>
                  <div className="tl-label">
                    scaleX(2)
                    <br />
                    <span className="text-(--accent3)">chỉ trục X</span>
                  </div>
                </div>
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-y" />
                  </div>
                  <div className="tl-label">
                    scaleY(2)
                    <br />
                    <span className="text-(--accent4)">chỉ trục Y</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 2: ROTATE  */}
          <TabPanel value="rotate">
            <div className={cn(ui.demoArea, "py-6 px-8")}>
              <div className="ro-grid">
                <div className="ro-cell">
                  <div className="ro-stage">
                    <div className="ro-atom ro-45">45°</div>
                  </div>
                  <div className="tl-label">rotate(45deg)</div>
                </div>
                <div className="ro-cell">
                  <div className="ro-stage">
                    <div className="ro-atom ro-180">180°</div>
                  </div>
                  <div className="tl-label">
                    rotate(180deg)
                    <br />
                    <span className="text-(--accent2)">flip</span>
                  </div>
                </div>
                <div className="ro-cell">
                  <div className="ro-stage">
                    <div className="ro-atom ro-360">360°</div>
                  </div>
                  <div className="tl-label">
                    rotate(360deg)
                    <br />
                    <span className="text-(--accent3)">full spin</span>
                  </div>
                </div>
                <div className="ro-cell">
                  <div className="ro-stage">
                    <div className="ro-atom ro-neg">-90°</div>
                  </div>
                  <div className="tl-label">
                    rotate(-90deg)
                    <br />
                    <span className="text-(--accent4)">ngược chiều</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 3: SKEW */}
          <TabPanel value="skew">
            <div className={cn(ui.demoArea, "py-6 px-8")}>
              <div className="sk-grid">
                <div className="sk-cell">
                  <div className="sk-stage">
                    <div className="sk-atom sk-x">skewX</div>
                  </div>
                  <div className="tl-label">
                    skewX(20deg)
                    <br />
                    <span className="text-(--accent)">nghiêng theo X</span>
                  </div>
                </div>
                <div className="sk-cell">
                  <div className="sk-stage">
                    <div className="sk-atom sk-y">skewY</div>
                  </div>
                  <div className="tl-label">
                    skewY(15deg)
                    <br />
                    <span className="text-(--accent2)">nghiêng theo Y</span>
                  </div>
                </div>
                <div className="sk-cell">
                  <div className="sk-stage">
                    <div className="sk-atom sk-xy">XY</div>
                  </div>
                  <div className="tl-label">
                    skewX + skewY
                    <br />
                    <span className="text-(--accent3)">kết hợp</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 4: TRANSFORM-ORIGIN */}
          <TabPanel value="transform-origin">
            <div className={cn(ui.demoArea, "py-6 px-8")}>
              <div className="font-mono text-[11px] text-[#85859a]">
                hover → cùng rotate(180deg) nhưng khác transform-origin — chấm
                trắng = điểm pivot
              </div>
              <div className="to-grid">
                <div className="to-cell">
                  <div className="to-stage">
                    <div className="to-atom to-center" />
                  </div>
                  <div className="tl-label">
                    center center <br />
                    <span className="text-(--accent)">mặc định</span>
                  </div>
                </div>
                <div className="to-cell">
                  <div className="to-stage">
                    <div className="to-atom to-tl" />
                  </div>
                  <div className="tl-label">top left</div>
                </div>
                <div className="to-cell">
                  <div className="to-stage">
                    <div className="to-atom to-tr" />
                  </div>
                  <div className="tl-label">top right</div>
                </div>
                <div className="to-cell">
                  <div className="to-stage">
                    <div className="to-atom to-bl" />
                  </div>
                  <div className="tl-label">bottom lef</div>
                </div>
                <div className="to-cell">
                  <div className="to-stage">
                    <div className="to-atom to-custom" />
                  </div>
                  <div className="tl-label">
                    50% 100% <br />
                    <span className="text-(--accent3)">custom %</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 5: GPU vs CPU */}
          <TabPanel value="GPU vs CPU">
            <div
              className={cn(ui.demoArea, "py-6 px-8 flex-col items-stretch")}
            >
              {/* pipeline diagram */}
              <div className="font-mono text-[11px] text-(--muted)">
                render pipeline — animate property nào sẽ kích hoạt những bước
                nào
              </div>
              <div className="flex gap-3 flex-wrap mb-2">
                <div className="flex-1 min-w-55">
                  <div className="font-mono text-[10px] text-(--accent7) mb-1">
                    🔴 left / top / width / height
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className={pipelineClasses.badBox}>JavaScript</span>
                    <span className={pipelineClasses.arrow}>→</span>
                    <span className={pipelineClasses.badBox}>Style</span>
                    <span className={pipelineClasses.arrow}>→</span>
                    <span
                      className={cn(
                        pipelineClasses.badBox,
                        "bg-[rgba(226,75,74,0.3)] border-(--accent7) font-semibold",
                      )}
                    >
                      Layout ⚠
                    </span>
                    <span className={pipelineClasses.arrow}>→</span>
                    <span className={pipelineClasses.badBox}>Paint</span>
                    <span className={pipelineClasses.arrow}>→</span>
                    <span className={pipelineClasses.badBox}>Composite</span>
                  </div>
                </div>
                <div className="flex-1 min-w-55">
                  <div className="font-mono text-[10px] text-(--accent3) mb-1">
                    🟢 transform / opacity
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className={pipelineClasses.disabledBox}>
                      JavaScript
                    </span>
                    <span className={pipelineClasses.arrow}>→</span>
                    <span className={pipelineClasses.disabledBox}>Style</span>
                    <span className={pipelineClasses.arrow}>→</span>
                    <span className={pipelineClasses.goodBox}>
                      Composite ✓ GPU
                    </span>
                  </div>
                </div>
              </div>
              {/* live race */}
              <div className="font-mono text-[11px] text-(--muted)">
                live demo — bấm Start để xem cả hai chạy
              </div>
              <div className="font-mono text-[10px] text-(--accent7)">
                🔴 animate <code>left</code> — Main Thread
              </div>
              <div className="gpu-track">
                <div
                  className={cn("gpu-ball ball-bad", playing && "gpu-running")}
                  id="gpuBad"
                >
                  left<div className="gpu-badge">CPU</div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-(--accent3)">
                🟢 animate <code>transform</code> — GPU Compositor Thread
              </div>
              <div className="gpu-track">
                <div
                  className={cn("gpu-ball ball-good", playing && "gpu-running")}
                  id="gpuGood"
                >
                  transform<div className="gpu-badge">GPU</div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 6: COMBO PLAYGROUND */}
          <TabPanel value="combo playground">
            <div className={cn(ui.demoArea, "py-6 px-8 flex-col")}>
              <div className="combo-stage">
                <div
                  className="combo-el"
                  id="comboEl"
                  style={{
                    borderRadius: `${combo.br}px`,
                    transform: comboTransform,
                  }}
                >
                  🎯
                </div>
              </div>
              <div className="combo-controls">
                <div className="combo-ctrl">
                  <label>
                    translateX &nbsp;
                    <span className="val" id="txVal">
                      {combo.tx}px
                    </span>
                  </label>
                  <input
                    type="range"
                    min="-120"
                    max="120"
                    value={combo.tx}
                    id="txSlider"
                    onChange={(e) =>
                      updateCombo("tx", e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
                <div className="combo-ctrl">
                  <label>
                    translateY &nbsp;
                    <span className="val" id="tyVal">
                      {combo.ty}px
                    </span>
                  </label>
                  <input
                    type="range"
                    min="-60"
                    max="60"
                    value={combo.ty}
                    id="tySlider"
                    onChange={(e) =>
                      updateCombo("ty", e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
                <div className="combo-ctrl">
                  <label>
                    rotate &nbsp;
                    <span className="val" id="roVal">
                      {combo.ro}deg
                    </span>
                  </label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={combo.ro}
                    id="roSlider"
                    onChange={(e) =>
                      updateCombo("ro", e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
                <div className="combo-ctrl">
                  <label>
                    scale &nbsp;
                    <span className="val" id="scVal">
                      {scale}
                    </span>
                  </label>
                  <input
                    type="range"
                    min="20"
                    max="200"
                    value={combo.sc}
                    id="scSlider"
                    onChange={(e) =>
                      updateCombo("sc", e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
                <div className="combo-ctrl">
                  <label>
                    skewX &nbsp;
                    <span className="val" id="skVal">
                      {combo.sk}deg
                    </span>
                  </label>
                  <input
                    type="range"
                    min="-40"
                    max="40"
                    value={combo.sk}
                    id="skSlider"
                    onChange={(e) =>
                      updateCombo("sk", e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
                <div className="combo-ctrl">
                  <label>
                    border-radius &nbsp;
                    <span className="val" id="brVal">
                      {combo.br}px
                    </span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={combo.br}
                    id="brSlider"
                    onChange={(e) =>
                      updateCombo("br", e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
              </div>
              {/* font-family:var(--mono);font-size:11px;color:var(--muted);margin-top:4px */}
              <div className="font-mono text-[11px] text-(--muted) mt-1">
                <span>generated:</span>
                <span id="comboOutput" className="text-(--accent3)">
                  transform: {comboTransform}
                </span>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </LessonSection>
  );
};

export default TransformSection;
