const aPTabs = [
  { label: "exit animation", value: "exit animation" },
  { label: "list add/remove", value: "list add/remove" },
  { label: "mode: wait", value: "mode: wait" },
  { label: "page transitions", value: "page transitions" },
] as const;

type APTab = (typeof aPTabs)[number]["value"];

const panelTabsCode: Record<APTab, string> = {
  "exit animation": `
    <span class="c">// AnimatePresence: detect unmount → chạy exit trước khi xoá</span><br>
    <span class="tag">&lt;<span class="fn">AnimatePresence</span>&gt;</span><br>
    &nbsp;&nbsp;{isVisible &amp;&amp; (<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;<span class="fn">motion.div</span></span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">initial</span>={{ <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">scale</span>:<span class="v">0.8</span> }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">animate</span>={{ <span class="p">opacity</span>:<span class="v">1</span>, <span class="p">scale</span>:<span class="v">1</span>   }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">exit</span>=&nbsp;&nbsp;{{ <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">scale</span>:<span class="v">0.5</span> }}&nbsp;<span class="c">// chạy khi unmount</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">/&gt;</span><br>
    &nbsp;&nbsp;)}<br>
    <span class="tag">&lt;/<span class="fn">AnimatePresence</span>&gt;</span>
  `,
  "list add/remove": `
    <span class="c">// key prop bắt buộc để AnimatePresence track từng item</span><br>
    <span class="tag">&lt;<span class="fn">AnimatePresence</span>&gt;</span><br>
    &nbsp;&nbsp;{items.map(item => (<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">key</span>={item.id}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// KEY quan trọng!</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">initial</span>={{ <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">height</span>:<span class="v">0</span> }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">animate</span>={{ <span class="p">opacity</span>:<span class="v">1</span>, <span class="p">height</span>:<span class="s">'auto'</span> }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="p">exit</span>=&nbsp;&nbsp;{{ <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">height</span>:<span class="v">0</span> }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">/&gt;</span><br>
    &nbsp;&nbsp;))}<br>
    <span class="tag">&lt;/<span class="fn">AnimatePresence</span>&gt;</span>
  `,
  "mode: wait": `
    <span class="c">// mode="wait": exit xong rồi mới enter — tránh overlap</span><br>
    <span class="c">// mode="sync" (mặc định): enter và exit chạy cùng lúc</span><br>
    <span class="c">// mode="popLayout": exit xong + layout reflow rồi mới enter</span><br>
    <span class="tag">&lt;<span class="fn">AnimatePresence</span> <span class="p">mode</span>=<span class="s">"wait"</span>&gt;</span><br>
    &nbsp;&nbsp;<span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">key</span>={currentPage} ...transitions<span class="tag">/&gt;</span><br>
    <span class="tag">&lt;/<span class="fn">AnimatePresence</span>&gt;</span>
  `,
  "page transitions": `
    <span class="c">// page transitions: key=route, exit animate ra rồi new page animate vào</span><br>
    <span class="tag">&lt;<span class="fn">AnimatePresence</span> <span class="p">mode</span>=<span class="s">"wait"</span>&gt;</span><br>
    &nbsp;&nbsp;<span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">key</span>={pathname}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">initial</span>={{ <span class="p">x</span>:<span class="s">'100%'</span>, <span class="p">opacity</span>:<span class="v">0</span> }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">animate</span>={{ <span class="p">x</span>:<span class="v">0</span>,     <span class="p">opacity</span>:<span class="v">1</span> }}<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">exit</span>=&nbsp;&nbsp;{{ <span class="p">x</span>:<span class="s">'-100%'</span>,<span class="p">opacity</span>:<span class="v">0</span> }}<br>
    &nbsp;&nbsp;<span class="tag">/&gt;</span><br>
    <span class="tag">&lt;/<span class="fn">AnimatePresence</span>&gt;</span>
  `,
};

const colors = ["#8b5cf6", "#ec4899", "#14b8a6", "#f59e0b", "#22c55e"];

const initialItems = [
  { id: 1, text: "item alpha", color: "#8b5cf6" },
  { id: 2, text: "item beta", color: "#ec4899" },
  { id: 3, text: "item gamma", color: "#14b8a6" },
];

const pages = [
  { label: "Home", color: "#8b5cf6", icon: "🏠" },
  { label: "About", color: "#ec4899", icon: "👤" },
  { label: "Work", color: "#14b8a6", icon: "💼" },
  { label: "Contact", color: "#f59e0b", icon: "✉️" },
] as const;

const routes = {
  home: { label: "🏠 Home", bg: "#8b5cf6" },
  about: { label: "👤 About", bg: "#ec4899" },
  work: { label: "💼 Work", bg: "#14b8a6" },
} as const;

type APRoute = keyof typeof routes;
const routeKeys = Object.keys(routes) as APRoute[];

export {
  pages,
  aPTabs,
  routes,
  colors,
  routeKeys,
  initialItems,
  panelTabsCode,
};
export type { APTab, APRoute };
