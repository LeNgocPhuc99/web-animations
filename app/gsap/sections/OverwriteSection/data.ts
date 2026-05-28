const overwriteTabs = [
  { label: "overwrite", value: "overwrite" },
  { label: "gsap.defaults()", value: "gsap.defaults()" },
  { label: "gsap.set()", value: "gsap.set()" },
] as const;

type OverwriteTab = (typeof overwriteTabs)[number]["value"];

const panelTabsCode: Record<OverwriteTab, string> = {
  overwrite: `
    <span class="c">// overwrite: 'auto' — chỉ override property đang conflict</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">200</span>, <span class="p">duration</span>: <span class="v">2</span> });<br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">50</span>, <span class="p">duration</span>: <span class="v">0.5</span>, <span class="p">overwrite</span>: <span class="k">true</span> });<br>
    <span class="c">// set globally để tự động xử lý:</span><br>
    <span class="fn">gsap.defaults</span>({ <span class="p">overwrite</span>: <span class="s">'auto'</span> });
  `,
  "gsap.defaults()": `
    <span class="c">// set defaults cho toàn bộ project</span><br>
    <span class="fn">gsap.defaults</span>({<br>
    &nbsp;&nbsp;<span class="p">duration</span>: <span class="v">0.8</span>,<br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'power2.out'</span>,<br>
    &nbsp;&nbsp;<span class="p">overwrite</span>: <span class="s">'auto'</span><br>
    });<br>
    <span class="c">// giờ không cần lặp lại duration và ease</span><br>
    <span class="fn">gsap.to</span>(<span class="s">'#el'</span>, { <span class="p">x</span>: <span class="v">100</span> });&nbsp;<span class="c">// dùng defaults</span>
  `,
  "gsap.set()": `
    <span class="c">// set ngay lập tức — không animate</span><br>
    <span class="fn">gsap.set</span>(<span class="s">'#el'</span>, { <span class="p">x</span>: <span class="v">0</span>, <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">scale</span>: <span class="v">0.8</span> });<br>
    <span class="c">// sau đó animate từ trạng thái đã set</span><br>
    <span class="fn">gsap.to</span>(<span class="s">'#el'</span>, { <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">scale</span>: <span class="v">1</span>, <span class="p">duration</span>: <span class="v">0.5</span> });<br>
    <span class="c">// clearProps: xoá transform khỏi inline style</span><br>
    <span class="fn">gsap.set</span>(<span class="s">'#el'</span>, { <span class="p">clearProps</span>: <span class="s">'all'</span> });
  `,
};

export { overwriteTabs, panelTabsCode };
export type { OverwriteTab };
