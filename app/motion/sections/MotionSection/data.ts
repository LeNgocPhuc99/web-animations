const motionTabs = [
  { label: "initial & animate", value: "initial & animate" },
  { label: "transition config", value: "transition config" },
  { label: "whileAnimate states", value: "whileAnimate states" },
  { label: "keyframes", value: "keyframes" },
] as const;

type MotionTab = (typeof motionTabs)[number]["value"];

const panelTabCode: Record<MotionTab, string> = {
  "initial & animate": `
    <span class="c">// motion.div thay vì div — thêm animation superpowers</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span><br>
    &nbsp;&nbsp;<span class="p">initial</span>={{ <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">y</span>: <span class="v">30</span>, <span class="p">scale</span>: <span class="v">0.8</span> }}<br>
    &nbsp;&nbsp;<span class="p">animate</span>={{ <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">y</span>: <span class="v">0</span>,  <span class="p">scale</span>: <span class="v">1</span>   }}<br>
    &nbsp;&nbsp;<span class="p">transition</span>={{ <span class="p">duration</span>: <span class="v">0.6</span>, <span class="p">ease</span>: <span class="s">'easeOut'</span> }}<br>
    <span class="tag">/&gt;</span>
  `,
  "transition config": `
    <span class="c">// transition types: tween (CSS-like), spring (physics), inertia</span><br>
    <span class="p">transition</span>={{ <span class="p">type</span>: <span class="s">'spring'</span>, <span class="p">stiffness</span>: <span class="v">260</span>, <span class="p">damping</span>: <span class="v">20</span> }}<br>
    <span class="p">transition</span>={{ <span class="p">type</span>: <span class="s">'tween'</span>,  <span class="p">duration</span>: <span class="v">0.4</span>, <span class="p">ease</span>: <span class="s">'easeInOut'</span> }}<br>
    <span class="p">transition</span>={{ <span class="p">delay</span>: <span class="v">0.2</span>, <span class="p">repeat</span>: <span class="fn">Infinity</span>, <span class="p">repeatType</span>: <span class="s">'mirror'</span> }}
  `,
  "whileAnimate states": `
    <span class="c">// animate thay đổi khi state thay đổi — Motion re-animate tự động</span><br>
    <span class="k">const</span> [active, setActive] = <span class="fn">useState</span>(<span class="k">false</span>);<br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span><br>
    &nbsp;&nbsp;<span class="p">animate</span>={{ <span class="p">scale</span>: active ? <span class="v">1.3</span> : <span class="v">1</span>, <span class="p">backgroundColor</span>: active ? <span class="s">'#8b5cf6'</span> : <span class="s">'#1f1f34'</span> }}<br>
    &nbsp;&nbsp;<span class="p">onClick</span>={() => <span class="fn">setActive</span>(!active)}<br>
    <span class="tag">/&gt;</span>
  `,
  keyframes: `
    <span class="c">// keyframes: array values — Motion tự interpolate</span><br>
    <span class="p">animate</span>={{ <span class="p">x</span>: [<span class="v">0</span>, <span class="v">100</span>, <span class="v">50</span>, <span class="v">150</span>], <span class="p">rotate</span>: [<span class="v">0</span>, <span class="v">45</span>, <span class="v">-10</span>, <span class="v">0</span>] }}<br>
    <span class="p">transition</span>={{ <span class="p">duration</span>: <span class="v">2</span>, <span class="p">times</span>: [<span class="v">0</span>, <span class="v">0.3</span>, <span class="v">0.7</span>, <span class="v">1</span>] }}<span class="c"> // times = % mốc</span>
  `,
};

const initialAnimateBoxes = [
  {
    label: "fade+slide",
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    bg: "#8b5cf6",
  },
  {
    label: "scale in",
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
      delay: 0.1,
    },
    bg: "#ec4899",
  },
  {
    label: "rotate",
    initial: { opacity: 0, rotate: -90, x: -40 },
    animate: { opacity: 1, rotate: 0, x: 0 },
    transition: { duration: 0.7, ease: "backOut", delay: 0.2 },
    bg: "#14b8a6",
  },
  {
    label: "flip X",
    initial: { opacity: 0, rotateY: 90 },
    animate: { opacity: 1, rotateY: 0 },
    transition: { duration: 0.6, delay: 0.3 },
    bg: "#f59e0b",
  },
] as const;

const initialTransitionBoxes = [
  {
    label: "spring",
    trans: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
    bg: "#8b5cf6",
  },
  {
    label: "tween ease",
    trans: {
      type: "tween",
      duration: 0.5,
      ease: "easeInOut",
    },
    bg: "#ec4899",
  },
  {
    label: "bounce",
    trans: {
      type: "spring",
      stiffness: 400,
      damping: 8,
    },
    bg: "#14b8a6",
  },
  {
    label: "slow spring",
    trans: {
      type: "spring",
      stiffness: 50,
      damping: 10,
    },
    bg: "#f59e0b",
  },
] as const;

export {
  motionTabs,
  panelTabCode,
  initialAnimateBoxes,
  initialTransitionBoxes,
};

export type { MotionTab };
