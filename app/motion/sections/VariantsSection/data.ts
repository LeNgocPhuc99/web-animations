const variantsTabs = [
  { label: "variants cơ bản", value: "variants cơ bản" },
  { label: "staggerChildren", value: "staggerChildren" },
  { label: "when & orchestration", value: "when & orchestration" },
  { label: "propagation", value: "propagation" },
] as const;

type VariantTab = (typeof variantsTabs)[number]["value"];

const panelCodeTabs: Record<VariantTab, string> = {
  "variants cơ bản": `
    <span class="k">const</span> variants = {<br>
    &nbsp;&nbsp;<span class="p">hidden</span>:  { <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">x</span>: <span class="v">-30</span> },<br>
    &nbsp;&nbsp;<span class="p">visible</span>: { <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">x</span>: <span class="v">0</span>  },<br>
    };<br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">variants</span>={variants} <span class="p">initial</span>=<span class="s">"hidden"</span> <span class="p">animate</span>=<span class="s">"visible"</span> <span class="tag">/&gt;</span>
  `,
  staggerChildren: `
    <span class="k">const</span> container = {<br>
    &nbsp;&nbsp;<span class="p">hidden</span>: {},<br>
    &nbsp;&nbsp;<span class="p">visible</span>: { <span class="p">transition</span>: { <span class="p">staggerChildren</span>: <span class="v">0.1</span>, <span class="p">delayChildren</span>: <span class="v">0.2</span> } }<br>
    };<br>
    <span class="k">const</span> item = {<br>
    &nbsp;&nbsp;<span class="p">hidden</span>:  { <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">y</span>: <span class="v">20</span> },<br>
    &nbsp;&nbsp;<span class="p">visible</span>: { <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">y</span>: <span class="v">0</span>  }<br>
    };<span class="c"> // children TỰ ĐỘNG nhận stagger từ parent</span>
  `,
  "when & orchestration": `
    <span class="c">// when: "beforeChildren" | "afterChildren"</span><br>
    <span class="k">const</span> container = {<br>
    &nbsp;&nbsp;<span class="p">hidden</span>: { <span class="p">opacity</span>: <span class="v">0</span> },<br>
    &nbsp;&nbsp;<span class="p">visible</span>: { <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">transition</span>: {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">when</span>: <span class="s">"beforeChildren"</span>,&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// parent fade in TRƯỚC</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">staggerChildren</span>: <span class="v">0.12</span><br>
    &nbsp;&nbsp;} }<br>
    };
  `,
  propagation: `
    <span class="c">// propagation: parent animate="visible" → truyền xuống tất cả children</span><br>
    <span class="c">// children không cần initial/animate riêng — kế thừa từ parent</span><br>
    <span class="tag">&lt;<span class="fn">motion.ul</span></span> <span class="p">initial</span>=<span class="s">"hidden"</span> <span class="p">animate</span>=<span class="s">"visible"</span> <span class="p">variants</span>={container}<span class="tag">&gt;</span><br>
    &nbsp;&nbsp;{items.map(i => <span class="tag">&lt;<span class="fn">motion.li</span></span> <span class="p">variants</span>={item}<span class="tag">&gt;</span>{i}<span class="tag">&lt;/<span class="fn">motion.li</span>&gt;</span>)}<br>
    <span class="tag">&lt;/<span class="fn">motion.ul</span>&gt;</span>
  `,
};

const basicVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
} as const;

const itemVariant = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
} as const;

const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
} as const;

const parentVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
} as const;

const childVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
} as const;

const navVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
} as const;

const linkVariant = {
  hidden: { x: -20, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
} as const;

const words = ["Framer", "Motion", "Variants", "Stagger"];
const bgList = ["#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b"];
const items = ["Dashboard", "Analytics", "Projects", "Settings", "Profile"];

export {
  words,
  items,
  bgList,
  navVariant,
  linkVariant,
  itemVariant,
  variantsTabs,
  childVariant,
  basicVariant,
  parentVariant,
  panelCodeTabs,
  containerVariant,
};
export type { VariantTab };
