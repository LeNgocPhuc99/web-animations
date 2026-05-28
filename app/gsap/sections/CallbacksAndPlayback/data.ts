const callbacksTabs = [
  { label: "callbacks", value: "callbacks" },
  { label: "playback control", value: "playback control" },
  { label: "delay & repeat", value: "delay & repeat" },
] as const;

type CallbackTab = (typeof callbacksTabs)[number]["value"];

const panelTabsCode: Record<CallbackTab, string> = {
  callbacks: `
    <span class="fn">gsap.to</span>(<span class="s">'#box'</span>, {<br>
    &nbsp;&nbsp;<span class="p">x</span>: <span class="v">200</span>, <span class="p">duration</span>: <span class="v">1.5</span>,<br>
    &nbsp;&nbsp;<span class="p">onStart</span>:    () => log(<span class="s">'onStart fired'</span>),<br>
    &nbsp;&nbsp;<span class="p">onUpdate</span>:   () => log(<span class="s">'onUpdate: '</span> + tween.progress().toFixed(2)),<br>
    &nbsp;&nbsp;<span class="p">onComplete</span>: () => log(<span class="s">'onComplete ✓'</span>),<br>
    &nbsp;&nbsp;<span class="p">onRepeat</span>:   () => log(<span class="s">'onRepeat'</span>),<br>
    &nbsp;&nbsp;<span class="p">onReverseComplete</span>: () => log(<span class="s">'reversed!'</span>)<br>
    });
  `,
  "playback control": `
    <span class="k">const</span> tween = <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">300</span>, <span class="p">duration</span>: <span class="v">2</span>, <span class="p">paused</span>: <span class="k">true</span> });<br>
    tween.<span class="fn">play</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// bắt đầu / tiếp tục</span><br>
    tween.<span class="fn">pause</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// dừng, giữ vị trí</span><br>
    tween.<span class="fn">reverse</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// chạy ngược về điểm đầu</span><br>
    tween.<span class="fn">restart</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// về đầu rồi play</span><br>
    tween.<span class="fn">progress</span>(<span class="v">0.5</span>);&nbsp;<span class="c">// jump đến 50%</span><br>
    tween.<span class="fn">seek</span>(<span class="v">1</span>);&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// jump đến 1s</span>
  `,
  "delay & repeat": `
    <span class="c">// delay: chờ trước khi bắt đầu</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">100</span>, <span class="p">delay</span>: <span class="v">0.8</span> });<br>
    <span class="c">// repeat: lặp N lần. -1 = infinite</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">100</span>, <span class="p">repeat</span>: <span class="v">2</span> });<br>
    <span class="c">// yoyo: mỗi lần repeat chạy ngược chiều</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">100</span>, <span class="p">repeat</span>: <span class="v">-1</span>, <span class="p">yoyo</span>: <span class="k">true</span> });<br>
    <span class="c">// repeatDelay: delay giữa các lần lặp</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">100</span>, <span class="p">repeat</span>: <span class="v">3</span>, <span class="p">repeatDelay</span>: <span class="v">0.5</span> });`,
};

const cbRepeatData = [
  {
    id: "delayBox",
    name: "delay",
    desc: "delay: 0.8s",
    bg: "--color-gsap",
  },
  {
    id: "repeatBox",
    name: "repeat",
    desc: "repeat: 2",
    bg: "--color-pink-400",
  },
  {
    id: "yoyoBox",
    name: "yoyo",
    desc: "yoyo: true",
    bg: "--color-purple-400",
  },
  {
    id: "infBox",
    name: "∞",
    desc: "repeat: -1",
    bg: "--color-green-400",
  },
];

export { callbacksTabs, panelTabsCode, cbRepeatData };
export type { CallbackTab };
