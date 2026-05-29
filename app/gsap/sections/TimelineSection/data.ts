const timelineTabs = [
  { label: "timeline cơ bản", value: "timeline cơ bản" },
  { label: "position parameter", value: "position parameter" },
  { label: "timeline control", value: "timeline control" },
  { label: "nested timeline", value: "nested timeline" },
] as const;

type TimelineTab = (typeof timelineTabs)[number]["value"];

const panelTabsCode: Record<TimelineTab, string> = {
  "timeline cơ bản": `
    <span class="c">// timeline: tweens chạy NỐI TIẾP nhau mặc định</span><br>
    <span class="k">const</span> tl = <span class="fn">gsap.timeline</span>({ <span class="p">defaults</span>: { <span class="p">ease</span>:<span class="s">'power2.out'</span>, <span class="p">duration</span>:<span class="v">0.6</span> } });<br>
    tl.<span class="fn">from</span>(<span class="s">'#title'</span>,  { <span class="p">y</span>:<span class="v">24</span>, <span class="p">opacity</span>:<span class="v">0</span> })<br>
    &nbsp;&nbsp;.<span class="fn">from</span>(<span class="s">'#sub'</span>,    { <span class="p">y</span>:<span class="v">16</span>, <span class="p">opacity</span>:<span class="v">0</span> })<br>
    &nbsp;&nbsp;.<span class="fn">from</span>(<span class="s">'#btn'</span>,    { <span class="p">y</span>:<span class="v">12</span>, <span class="p">opacity</span>:<span class="v">0</span> });
  `,
  "position parameter": `
    tl.<span class="fn">to</span>(A, { <span class="p">x</span>:<span class="v">160</span>, <span class="p">duration</span>:<span class="v">1</span> });<br>
    tl.<span class="fn">to</span>(B, { <span class="p">x</span>:<span class="v">160</span>, <span class="p">duration</span>:<span class="v">0.8</span> }, <span class="s">"1.5"</span>);&nbsp;&nbsp;<span class="c">// absolute 1.5s</span>
  `,
  "timeline control": `
    <span class="k">const</span> tl = <span class="fn">gsap.timeline</span>({ <span class="p">paused</span>:<span class="k">true</span> });&nbsp;&nbsp;<span class="c">// start paused</span><br>
    tl.<span class="fn">timeScale</span>(<span class="v">2</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// 2× speed — debug trick</span><br>
    tl.<span class="fn">seek</span>(<span class="s">'myLabel'</span>);&nbsp;&nbsp;&nbsp;<span class="c">// jump đến label</span><br>
    tl.<span class="fn">progress</span>(<span class="v">0.5</span>);&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// jump đến 50%</span><br>
    tl.<span class="fn">kill</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// destroy hoàn toàn</span>
  `,
  "nested timeline": `
    <span class="c">// sub-timelines → dễ quản lý phần complex</span><br>
    <span class="k">function</span> <span class="fn">buildRow</span>(els) {<br>
    &nbsp;&nbsp;<span class="k">const</span> tl = <span class="fn">gsap.timeline</span>();<br>
    &nbsp;&nbsp;<span class="k">return</span> tl.<span class="fn">from</span>(els, { <span class="p">x</span>:<span class="v">-30</span>, <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">stagger</span>:<span class="v">0.1</span> });<br>
    }<br>
    <span class="c">// master ghép tất cả</span><br>
    <span class="k">const</span> master = <span class="fn">gsap.timeline</span>()<br>
    &nbsp;&nbsp;.<span class="fn">add</span>(<span class="fn">buildRow</span>(<span class="s">'#nr1 .gbox'</span>))<br>
    &nbsp;&nbsp;.<span class="fn">add</span>(<span class="fn">buildRow</span>(<span class="s">'#nr2 .gbox'</span>), <span class="s">'-=0.2'</span>)<br>
    &nbsp;&nbsp;.<span class="fn">add</span>(<span class="fn">buildRow</span>(<span class="s">'#nr3 .gbox'</span>), <span class="s">'-=0.2'</span>);
  `,
};

export { timelineTabs, panelTabsCode };
export type { TimelineTab };
