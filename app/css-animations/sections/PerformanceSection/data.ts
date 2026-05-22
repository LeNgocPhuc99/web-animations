const pfTabs = [
  { label: "render pipeline", value: "render pipeline" },
  { label: "GPU vs CPU race", value: "GPU vs CPU race" },
  { label: "composite layers", value: "composite layers" },
  { label: "will-change", value: "will-change" },
  { label: "property cheat sheet", value: "property cheat sheet" },
] as const;

type PerformanceTab = (typeof pfTabs)[number]["value"];

const pfPanelCode: Record<PerformanceTab, string> = {
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

const pfCheatRows = [
  {
    prop: "transform",
    layout: false,
    paint: false,
    comp: true,
    verdict: "✅ GPU only — best",
    color: "var(--color-success)",
  },
  {
    prop: "opacity",
    layout: false,
    paint: false,
    comp: true,
    verdict: "✅ GPU only — best",
    color: "var(--color-success)",
  },
  {
    prop: "filter (blur…)",
    layout: false,
    paint: true,
    comp: true,
    verdict: "🟡 Paint trigger",
    color: "var(--color-warning)",
  },
  {
    prop: "background-color",
    layout: false,
    paint: true,
    comp: true,
    verdict: "🟡 Paint trigger",
    color: "var(--color-warning)",
  },
  {
    prop: "color",
    layout: false,
    paint: true,
    comp: true,
    verdict: "🟡 Paint trigger",
    color: "var(--color-warning)",
  },
  {
    prop: "box-shadow",
    layout: false,
    paint: true,
    comp: true,
    verdict: "🟡 Paint trigger",
    color: "var(--color-warning)",
  },
  {
    prop: "border-radius",
    layout: false,
    paint: true,
    comp: true,
    verdict: "🟡 Paint trigger",
    color: "var(--color-warning)",
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

export type { PerformanceTab };
export { pfCheatRows, pfTabs, pfPanelCode };
