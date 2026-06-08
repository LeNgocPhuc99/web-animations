const layoutTabs = [
  { label: "layout prop", value: "layout prop" },
  { label: "layoutId shared", value: "layoutId shared" },
  { label: "LayoutGroup", value: "LayoutGroup" },
  { label: "list reorder", value: "list reorder" },
] as const;

type LayoutTab = (typeof layoutTabs)[number]["value"];

const panelTabsCode: Record<LayoutTab, string> = {
  "layout prop": `
    <span class="c">// layout: tự động detect DOM position change → animate</span><br>
    <span class="c">// không cần biết từ đâu đến đâu — Motion tự tính (FLIP technique)</span><br>
    <span class="c">// shift justify đổi vị trí container → layout tự animate</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">layout</span><span class="tag">&gt;</span>...<span class="tag">&lt;/<span class="fn">motion.div</span>&gt;</span><br>
    <span class="c">// layout="position": chỉ animate position, không animate size</span><br>
    <span class="c">// layout="size": chỉ animate size</span><br>
    <span class="c">// layout="preserve-aspect": giữ tỉ lệ khi scale</span>
  `,
  "layoutId shared": `
    <span class="c">// layoutId: "magic motion" giữa 2 component KHÁC NHAU</span><br>
    <span class="c">// Motion nhận ra cùng layoutId và animate giữa chúng</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">layoutId</span>=<span class="s">\`card-\${card.id}\`</span> <span class="tag">/&gt;</span>&nbsp;&nbsp;<span class="c">// thumbnail</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">layoutId</span>=<span class="s">\`card-\${selected.id}\`</span> <span class="tag">/&gt;</span>&nbsp;&nbsp;<span class="c">// modal full</span><br>
    <span class="c">// Motion tự animate thumbnail → modal và ngược lại</span>
  `,
  LayoutGroup: `
    <span class="c">// LayoutGroup: sync layout animations giữa các components riêng</span><br>
    <span class="c">// khi một item expand, các item khác tự động reflow có animation</span><br>
    <span class="tag">&lt;<span class="fn">LayoutGroup</span>&gt;</span><br>
    &nbsp;&nbsp;{items.map(item => <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">layout</span> <span class="tag">/&gt;</span>)}<br>
    <span class="tag">&lt;/<span class="fn">LayoutGroup</span>&gt;</span>
  `,
  "list reorder": `
    <span class="c">// Reorder list: Reorder.Group + Reorder.Item</span><br>
    <span class="tag">&lt;<span class="fn">Reorder.Group</span></span> <span class="p">axis</span>=<span class="s">"y"</span> <span class="p">values</span>={items} <span class="p">onReorder</span>={setItems}<span class="tag">&gt;</span><br>
    &nbsp;&nbsp;{items.map(i =&gt; (<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="tag">&lt;<span class="fn">Reorder.Item</span></span> <span class="p">key</span>={i} <span class="p">value</span>={i} <span class="p">animate</span>={draggingItem===i ? <span class="s">{...}</span> : <span class="s">{...}</span>}<span class="tag">&gt;</span>{i}<span class="tag">&lt;/<span class="fn">Reorder.Item</span>&gt;</span><br>
    &nbsp;&nbsp;))}<br>
    <span class="tag">&lt;/<span class="fn">Reorder.Group</span>&gt;</span>
  `,
};

const cards = [
  { id: "a", color: "#8b5cf6", label: "A" },
  { id: "b", color: "#ec4899", label: "B" },
  { id: "c", color: "#14b8a6", label: "C" },
] as const;

type LACard = (typeof cards)[number];

const accordionItems = [
  {
    id: 1,
    title: "Accordion Item 1",
    content: "Content for item 1 — layout group syncs all items",
  },
  {
    id: 2,
    title: "Accordion Item 2",
    content: "Content for item 2 — no jarring jumps",
  },
  {
    id: 3,
    title: "Accordion Item 3",
    content: "Content for item 3 — smooth reflow",
  },
];

export { cards, accordionItems, layoutTabs, panelTabsCode };

export type { LayoutTab, LACard };
