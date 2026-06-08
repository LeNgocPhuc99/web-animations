const gestureTabs = [
  { label: "whileHover & whileTap", value: "whileHover & whileTap" },
  { label: "drag", value: "drag" },
  { label: "dragConstraints", value: "dragConstraints" },
  { label: "useDragControls", value: "useDragControls" },
] as const;

type GestureTab = (typeof gestureTabs)[number]["value"];

const panelTabsCode: Record<GestureTab, string> = {
  "whileHover & whileTap": `
    <span class="c">// whileHover / whileTap: animate state khi gesture active</span><br>
    <span class="tag">&lt;<span class="fn">motion.button</span></span><br>
    &nbsp;&nbsp;<span class="p">whileHover</span>={{ <span class="p">scale</span>:<span class="v">1.05</span>, <span class="p">y</span>:<span class="v">-3</span> }}<br>
    &nbsp;&nbsp;<span class="p">whileTap</span>=&nbsp;{{ <span class="p">scale</span>:<span class="v">0.95</span> }}<br>
    &nbsp;&nbsp;<span class="p">transition</span>={{ <span class="p">type</span>:<span class="s">'spring'</span>, <span class="p">stiffness</span>:<span class="v">400</span>, <span class="p">damping</span>:<span class="v">17</span> }}<br>
    <span class="tag">&gt;</span>Click me<span class="tag">&lt;/<span class="fn">motion.button</span>&gt;</span>
  `,
  drag: `
    <span class="c">// drag="x"|"y"|true — cho phép kéo theo trục</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span><br>
    &nbsp;&nbsp;<span class="p">drag</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// drag cả 2 trục</span><br>
    &nbsp;&nbsp;<span class="p">dragElastic</span>={<span class="v">0.1</span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// độ đàn hồi khi ra ngoài bounds</span><br>
    &nbsp;&nbsp;<span class="p">dragMomentum</span>={<span class="k">true</span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// inertia khi thả</span><br>
    &nbsp;&nbsp;<span class="p">whileDrag</span>={{ <span class="p">scale</span>:<span class="v">1.1</span>, <span class="p">zIndex</span>:<span class="v">10</span> }}<br>
    <span class="tag">/&gt;</span>
  `,
  dragConstraints: `
    <span class="c">// dragConstraints: giới hạn vùng drag</span><br>
    <span class="k">const</span> constraintRef = <span class="fn">useRef</span>(null);<br>
    <span class="tag">&lt;div</span> <span class="p">ref</span>={constraintRef}<span class="tag">&gt;</span><br>
    &nbsp;&nbsp;<span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">drag</span> <span class="p">dragConstraints</span>={constraintRef} <span class="tag">/&gt;</span><br>
    <span class="tag">&lt;/div&gt;</span><br>
    <span class="c">// hoặc object: dragConstraints={{ top:0, left:0, right:200, bottom:200 }}</span>
  `,
  useDragControls: `
    <span class="c">// useDragControls: trigger drag từ element khác (e.g. handle)</span><br>
    <span class="k">const</span> controls = <span class="fn">useDragControls</span>();<br>
    <span class="tag">&lt;div</span> <span class="p">onPointerDown</span>={e => controls.<span class="fn">start</span>(e)}<span class="tag">&gt;</span>⠿ drag handle<span class="tag">&lt;/div&gt;</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">drag</span> <span class="p">dragControls</span>={controls} <span class="tag">/&gt;</span>
  `,
} as const;

const gsBtns = [
  {
    label: "Scale hover",
    wH: { scale: 1.1 },
    wT: { scale: 0.92 },
    trans: { type: "spring", stiffness: 400, damping: 17 },
    bg: "#8b5cf6",
    border: "",
  },
  {
    label: "Lift + shadow",
    wH: { y: -5, boxShadow: "0 12px 30px rgba(139,92,246,0.5)" },
    wT: { scale: 0.97, y: 0 },
    trans: { type: "spring", stiffness: 300, damping: 20 },
    bg: "#ec4899",
    border: "",
  },
  {
    label: "Color shift",
    wH: { backgroundColor: "#14b8a6", scale: 1.05 },
    wT: { scale: 0.95 },
    trans: { duration: 0.2 },
    bg: "#1f1f34",
    border: "1px solid #8b5cf6",
  },
  {
    label: "Rotate tap",
    wH: { scale: 1.1 },
    wT: { rotate: 10, scale: 0.9 },
    trans: { type: "spring", stiffness: 500, damping: 15 },
    bg: "#f59e0b",
    border: "",
  },
] as const;

export { gsBtns, gestureTabs, panelTabsCode };

export type { GestureTab };
