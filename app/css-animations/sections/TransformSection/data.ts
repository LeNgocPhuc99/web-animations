const tfTabs = [
  { label: "translate", value: "translate" },
  { label: "scale", value: "scale" },
  { label: "rotate", value: "rotate" },
  { label: "skew", value: "skew" },
  { label: "transform-origin", value: "transform-origin" },
  { label: "GPU vs CPU", value: "GPU vs CPU" },
  { label: "combo playground", value: "combo playground" },
] as const;

type TransformTab = (typeof tfTabs)[number]["value"];

type TfComboState = {
  tx: number;
  ty: number;
  ro: number;
  sc: number;
  sk: number;
  br: number;
};

const initialTfCombo: TfComboState = {
  tx: 0,
  ty: 0,
  ro: 0,
  sc: 100,
  sk: 0,
  br: 10,
};

const tfPanelCode: Record<TransformTab, string> = {
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

const tfPipelineClasses = {
  badBox: `py-1 px-2.5 bg-(--color-accent-teal)/20 border border-(--color-accent-teal)/27 rounded-sm font-mono text-[10px] text-(--color-accent-teal)`,
  arrow: `text-(--color-text-muted) text-xs`,
  goodBox: `py-1 px-2.5 bg-(--color-success)/15 border border-(--color-success) rounded-sm font-mono text-[10px] text-(--color-success)`,
  disabledBox: `"py-1 px-2.5 bg-(--color-bg-surface) border border-(--color-border-subtle) rounded-sm text-mono text-[10px] text-(--color-text-muted)`,
};

export { tfTabs, tfPanelCode, initialTfCombo, tfPipelineClasses };
export type { TransformTab, TfComboState };
