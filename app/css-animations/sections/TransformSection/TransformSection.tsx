import { useState } from "react";

import { DemoCard } from "~/css-animations/components";
import {
  ui,
  transformBoxClass,
  transformItemClass,
  transformLabelClass,
} from "~/css-animations/classes";

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

const TransformSection = () => {
  const [activeTab, setActiveTab] = useState<TransformTab>("translate");
  const [playing, setPlaying] = useState<boolean>(false);

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
        <button className={ui.button} type="button">
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
          <TabPanel value="skew"></TabPanel>
          <TabPanel value="transform-origin"></TabPanel>
          <TabPanel value="GPU vs CPU"></TabPanel>
          <TabPanel value="combo playground"></TabPanel>
        </Tabs>
      </DemoCard>
    </LessonSection>
  );
};

export default TransformSection;
