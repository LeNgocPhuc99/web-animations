import { useState } from "react";

import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";

import { TabItem, TabList, TabPanel, Tabs } from "~/components/Tabs";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import {
  tfTabs,
  tfPanelCode,
  initialTfCombo,
  type TransformTab,
  type TfComboState,
  tfPipelineClasses,
} from "./data";

import "./transform.css";

const TransformSection = () => {
  const [activeTab, setActiveTab] = useState<TransformTab>("translate");
  const [playing, setPlaying] = useState<boolean>(false);
  const [combo, setCombo] = useState<TfComboState>(initialTfCombo);

  const scale = (combo.sc / 100).toFixed(2);
  const comboTransform = `translateX(${combo.tx}px) translateY(${combo.ty}px) rotate(${combo.ro}deg) scale(${scale}) skewX(${combo.sk}deg)`;

  const updateCombo = (key: keyof TfComboState, value: number) => {
    setCombo((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const resetCombo = () => {
    setCombo(initialTfCombo);
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
      <DemoCard code={tfPanelCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TransformTab)}
        >
          <TabList>
            {tfTabs.map((tab) => (
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
                    <span style={{ color: "var(--color-primary)" }}>
                      trái ↔ phải
                    </span>
                  </div>
                </div>
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-ty">Y</div>
                  </div>
                  <div className="tl-label">
                    translateY(-24px)
                    <br />
                    <span style={{ color: "var(--color-secondary)" }}>
                      lên ↕ xuống
                    </span>
                  </div>
                </div>
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-txy">XY</div>
                  </div>
                  <div className="tl-label">
                    translate(18px,-18px)
                    <br />
                    <span className="text-success">shorthand 2 trục</span>
                  </div>
                </div>
                <div className="tl-cell">
                  <div className="tl-stage">
                    <div className="tl-atom tl-t3d">3D</div>
                  </div>
                  <div className="tl-label">
                    translate3d(x,y,0)
                    <br />
                    <span className="text-warning">force GPU layer</span>
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
                    <span className="text-primary">phóng to đều</span>
                  </div>
                </div>
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-down" />
                  </div>
                  <div className="tl-label">
                    scale(0.5)
                    <br />
                    <span className="text-secondary">thu nhỏ</span>
                  </div>
                </div>
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-x" />
                  </div>
                  <div className="tl-label">
                    scaleX(2)
                    <br />
                    <span className="text-success">chỉ trục X</span>
                  </div>
                </div>
                <div className="sc-cell">
                  <div className="sc-stage">
                    <div className="sc-atom sc-y" />
                  </div>
                  <div className="tl-label">
                    scaleY(2)
                    <br />
                    <span className="text-warning">chỉ trục Y</span>
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
                    <span className="text-secondary">flip</span>
                  </div>
                </div>
                <div className="ro-cell">
                  <div className="ro-stage">
                    <div className="ro-atom ro-360">360°</div>
                  </div>
                  <div className="tl-label">
                    rotate(360deg)
                    <br />
                    <span className="text-success">full spin</span>
                  </div>
                </div>
                <div className="ro-cell">
                  <div className="ro-stage">
                    <div className="ro-atom ro-neg">-90°</div>
                  </div>
                  <div className="tl-label">
                    rotate(-90deg)
                    <br />
                    <span className="text-warning">ngược chiều</span>
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
                    <span className="text-primary">nghiêng theo X</span>
                  </div>
                </div>
                <div className="sk-cell">
                  <div className="sk-stage">
                    <div className="sk-atom sk-y">skewY</div>
                  </div>
                  <div className="tl-label">
                    skewY(15deg)
                    <br />
                    <span className="text-secondary">nghiêng theo Y</span>
                  </div>
                </div>
                <div className="sk-cell">
                  <div className="sk-stage">
                    <div className="sk-atom sk-xy">XY</div>
                  </div>
                  <div className="tl-label">
                    skewX + skewY
                    <br />
                    <span className="text-success">kết hợp</span>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          {/* PANEL 4: TRANSFORM-ORIGIN */}
          <TabPanel value="transform-origin">
            <div className={cn(ui.demoArea, "py-6 px-8")}>
              <div className="font-mono text-xs text-text-muted">
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
                    <span className="text-primary">mặc định</span>
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
                    <span className="text-success">custom %</span>
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
              <div className="font-mono text-xs text-text-muted">
                render pipeline — animate property nào sẽ kích hoạt những bước
                nào
              </div>
              <div className="flex gap-3 flex-wrap mb-2">
                <div className="flex-1 min-w-55">
                  <div className="font-mono text-[10px] text-accent-teal mb-1">
                    🔴 left / top / width / height
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className={tfPipelineClasses.badBox}>JavaScript</span>
                    <span className={tfPipelineClasses.arrow}>→</span>
                    <span className={tfPipelineClasses.badBox}>Style</span>
                    <span className={tfPipelineClasses.arrow}>→</span>
                    <span
                      className={cn(
                        tfPipelineClasses.badBox,
                        "bg-[rgba(226,75,74,0.3)] border-accent-teal font-semibold",
                      )}
                    >
                      Layout ⚠
                    </span>
                    <span className={tfPipelineClasses.arrow}>→</span>
                    <span className={tfPipelineClasses.badBox}>Paint</span>
                    <span className={tfPipelineClasses.arrow}>→</span>
                    <span className={tfPipelineClasses.badBox}>Composite</span>
                  </div>
                </div>
                <div className="flex-1 min-w-55">
                  <div className="font-mono text-[10px] text-success mb-1">
                    🟢 transform / opacity
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className={tfPipelineClasses.disabledBox}>
                      JavaScript
                    </span>
                    <span className={tfPipelineClasses.arrow}>→</span>
                    <span className={tfPipelineClasses.disabledBox}>Style</span>
                    <span className={tfPipelineClasses.arrow}>→</span>
                    <span className={tfPipelineClasses.goodBox}>
                      Composite ✓ GPU
                    </span>
                  </div>
                </div>
              </div>
              {/* live race */}
              <div className="font-mono text-xs text-text-muted">
                live demo — bấm Start để xem cả hai chạy
              </div>
              <div className="font-mono text-[10px] text-accent-teal">
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
              <div className="font-mono text-[10px] text-success">
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
              <div className="font-mono text-xs text-text-muted mt-1">
                <span>generated:</span>
                <span id="comboOutput" className="text-success">
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
