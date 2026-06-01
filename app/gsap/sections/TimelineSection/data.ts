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

const timelineBlocks = [
  {
    left: 0,
    width: 30,
    background: "--color-gsap",
    label: "title",
  },
  {
    left: 22,
    width: 25,
    background: "--color-blue-500",
    label: "subtitle",
  },
  {
    left: 38,
    width: 20,
    background: "--color-pink-500",
    label: "btn 1",
  },
  {
    left: 50,
    width: 20,
    background: "--color-purple-500",
    label: "btn 2",
  },
  {
    left: 62,
    width: 20,
    background: "--color-yellow-500",
    label: "badge",
  },
];

const timelineTicks = [
  "0s",
  ".3s",
  ".6s",
  ".9s",
  "1.2s",
  "1.5s",
  "1.8s",
  "2.1s",
];

const tlPositionCards = [
  { name: `"1.5" — absolute`, desc: "Bắt đầu tại đúng 1.5s trong timeline" },
  {
    name: `"-=0.3" — overlap`,
    desc: "Bắt đầu 0.3s TRƯỚC khi tween trước kết thúc",
    actionDesc: `"1.5" → B bắt đầu tại 1.5s trong timeline`,
  },
  {
    name: `"+=0.2" — gap`,
    desc: "Bắt đầu 0.2s SAU khi tween trước kết thúc",
  },
  {
    name: `"myLabel" — label`,
    desc: "Nhảy đến named label trong timeline",
  },
  {
    name: `"<50%" — percent`,
    desc: "Relative đến tween trước theo %",
  },
  {
    name: `"<" — same start`,
    desc: "Bắt đầu cùng lúc tween trước (parallel)",
  },
] as const;

type TlPositionType = (typeof tlPositionCards)[number]["name"];

const tlPositionConfigs: Record<
  TlPositionType,
  {
    pos: string;
    desc: string;
    code: string;
  }
> = {
  '"1.5" — absolute': {
    pos: "1.5",
    desc: `"1.5" → B bắt đầu tại đúng 1.5s trong timeline`,
    code: `<span class="s">"1.5"</span>); <span class="c">// absolute time</span>`,
  },
  '"-=0.3" — overlap': {
    pos: "-=0.3",
    desc: `"-=0.3" → B bắt đầu 0.3s TRƯỚC khi A kết thúc (overlap)`,
    code: `<span class="s">"-=0.3"</span>); <span class="c">// overlap</span>`,
  },
  '"+=0.2" — gap': {
    pos: "+=0.2",
    desc: `"+=0.2" → B bắt đầu 0.2s SAU khi A kết thúc (gap)`,
    code: `<span class="s">"+=0.2"</span>); <span class="c">// gap</span>`,
  },
  '"myLabel" — label': {
    pos: "label",
    desc: `"myLabel" → thêm label bằng tl.addLabel("myLabel"), rồi seek đến nó`,
    code: `<span class="s">"mark"</span>);`,
  },
  '"<50%" — percent': {
    pos: "<50%",
    desc: `"<50%" → B bắt đầu tại 50% của thời gian tween trước`,
    code: `<span class="s">"<50%"</span>); <span class="c">// 50% into prev</span>`,
  },
  '"<" — same start': {
    pos: "<",
    desc: `"<" → B bắt đầu đúng lúc A bắt đầu (parallel)`,
    code: `<span class="s">"<"</span>); <span class="c">// same start as A</span>`,
  },
};

const tlPositionTimingGuides: Record<TlPositionType, string> = {
  '"1.5" — absolute': `time: 0.0s       1.0s       1.5s       2.3s
      |----------|----------|----------|
posA: [====================]
posB:                         [================]
                              ^
                              B bắt đầu tại mốc 1.5s tuyệt đối`,
  '"-=0.3" — overlap': `time: 0.0s       0.7s       1.0s       1.5s
      |----------|----------|----------|
posA: [====================]
posB:              [================]
                   ^
                   B bắt đầu trước khi A kết thúc 0.3s`,
  '"+=0.2" — gap': `time: 0.0s       1.0s       1.2s       2.0s
      |----------|----------|----------|
posA: [====================]
posB:                         [================]
                              ^
                              B bắt đầu sau khi A kết thúc 0.2s`,
  '"myLabel" — label': `time: 0.0s       0.5s       1.0s       1.3s
      |----------|----------|----------|
posA: [====================]
posB:            [================]
                 ^
                 label "mark" ở 0.5s, B bắt đầu tại mark`,
  '"<50%" — percent': `time: 0.0s       0.5s       1.0s       1.3s
      |----------|----------|----------|
posA: [====================]
posB:            [================]
                 ^
                 B bắt đầu khi A chạy được 50% duration`,
  '"<" — same start': `time: 0.0s       0.8s       1.0s
      |----------|----------|
posA: [====================]
posB: [================]
      ^
      B bắt đầu cùng lúc với A`,
};

const tl1 = [
  { label: "tl1", background: "--color-gsap" },
  { label: "A", background: "--color-gsap" },
  { label: "B", background: "--color-gsap" },
] as const;

const tl2 = [
  { label: "tl2", background: "--color-blue-500" },
  { label: "C", background: "--color-blue-500" },
  { label: "D", background: "--color-blue-500" },
] as const;

const tl3 = [
  { label: "tl3", background: "--color-pink-500" },
  { label: "E", background: "--color-pink-500" },
  { label: "F", background: "--color-pink-500" },
];

const getTlPositionCode = (position: TlPositionType) => {
  const cfg = tlPositionConfigs[position];
  const posVal =
    cfg.pos === "label"
      ? `<span class="s">"mark"</span>`
      : `<span class="s">"${cfg.pos}"</span>`;
  const labelCode =
    cfg.pos === "label"
      ? `tl.<span class="fn">addLabel</span>(<span class="s">"mark"</span>, <span class="v">0.5</span>);<br/>`
      : "";

  return `const maxX = Math.<span class="fn">max</span>(<span class="v">0</span>, stage.clientWidth - posA.offsetWidth - posA.offsetLeft);<br/><br/>tl.<span class="fn">to</span>(posA, { <span class="p">x</span>: maxX, <span class="p">duration</span>: <span class="v">1</span> });<br/>${labelCode}tl.<span class="fn">to</span>(posB, { <span class="p">x</span>: maxX * <span class="v">0.6</span>, <span class="p">duration</span>: <span class="v">0.8</span> }, ${posVal});`;
};

export {
  tl1,
  tl2,
  tl3,
  timelineTabs,
  panelTabsCode,
  timelineBlocks,
  timelineTicks,
  tlPositionCards,
  tlPositionConfigs,
  tlPositionTimingGuides,
  getTlPositionCode,
};
export type { TimelineTab, TlPositionType };
