const kfTabs = [
  { label: "anatomy", value: "anatomy" },
  { label: "multi-step %", value: "multi-step" },
  { label: "fill-mode", value: "fill-mode" },
  { label: "iteration & direction", value: "iteration" },
  { label: "stagger", value: "stagger" },
  { label: "real-world patterns", value: "real-world" },
] as const;

type KeyframeTab = (typeof kfTabs)[number]["value"];

const keyframeBars = [80, 52, 112, 68, 96, 44, 104, 72, 60] as const;
const keyframeWords = [
  "Animation",
  "brings",
  "interfaces",
  "to",
  "life.",
] as const;

const kfPanelCode: Record<KeyframeTab, string> = {
  anatomy: `
    <span class="c">/* cú pháp đầy đủ */</span><br>
    <span class="k">@keyframes</span> <span class="p">bounce</span> {<br>
    &nbsp;&nbsp;<span class="v">from</span> { <span class="p">transform</span>: translateY(0); }<br>
    &nbsp;&nbsp;<span class="v">to</span>&nbsp;&nbsp; { <span class="p">transform</span>: translateY(-50px); }<br>
    }<br>
    <span class="k">.el</span> { <span class="p">animation</span>: <span class="v">bounce 1s ease infinite alternate</span>; }
  `,
  "multi-step": `
    <span class="c">/* overshoot: 0→60% scale up vượt, 80% bounce back */</span><br>
    <span class="k">@keyframes</span> <span class="p">bounceIn</span> {<br>
    &nbsp;&nbsp;<span class="v">0%</span>&nbsp;&nbsp; { <span class="p">transform</span>: scale(<span class="v">0</span>); }<br>
    &nbsp;&nbsp;<span class="v">60%</span>&nbsp; { <span class="p">transform</span>: scale(<span class="v">1.2</span>); }<br>
    &nbsp;&nbsp;<span class="v">80%</span>&nbsp; { <span class="p">transform</span>: scale(<span class="v">0.9</span>); }<br>
    &nbsp;&nbsp;<span class="v">100%</span> { <span class="p">transform</span>: scale(<span class="v">1</span>); }<br>
    }<br>
    <span class="c">/* gộp 2 mốc cùng trạng thái */</span><br>
    <span class="v">0%, 100%</span> { <span class="p">background</span>: <span class="v">blue</span>; } <span class="v">50%</span> { <span class="p">background</span>: <span class="v">red</span>; }
  `,
  "fill-mode": `
    <span class="c">/* forwards: giữ trạng thái to{} sau khi xong */</span><br>
    <span class="k">.el</span> { <span class="p">opacity</span>: <span class="v">0</span>; <span class="p">animation</span>: <span class="v">flyIn 0.6s ease 1s forwards</span>; }<br>
    <span class="c">/* both = backwards + forwards — pattern chuẩn nhất */</span><br>
    <span class="k">.el</span> { <span class="p">opacity</span>: <span class="v">0</span>; <span class="p">animation</span>: <span class="v">flyIn 0.6s ease 1s both</span>; }
  `,
  iteration: `
    <span class="c">/* alternate: lần 1 xuôi, lần 2 ngược — không cần 2 @keyframes */</span><br>
    <span class="p">animation</span>: <span class="v">swing 0.7s ease-in-out infinite alternate</span>;<br>
    <span class="c">/* pause bằng CSS */</span><br>
    <span class="k">.el</span>:<span class="p">hover</span> { <span class="p">animation-play-state</span>: <span class="v">paused</span>; }<br>
    <span class="c">/* pause bằng JS */</span><br>
    el.style.animationPlayState = <span class="v">'paused'</span>;
  `,
  stagger: `
    <span class="c">/* CSS: nth-child — đơn giản khi số item cố định */</span><br>
    <span class="k">.bar:nth-child(n)</span> { <span class="p">animation-delay</span>: <span class="v">calc(n * 0.07s)</span>; }<br>
    <span class="c">/* JS: linh hoạt hơn khi số item động */</span><br>
    items.forEach((el, i) => el.style.animationDelay = (i * <span class="v">0.07</span>) + <span class="v">'s'</span>);
  `,
  "real-world": `
    <span class="c">/* shake: thêm class → lắng nghe animationend → xoá class */</span><br>
    el.classList.add(<span class="v">'shaking'</span>);<br>
    el.addEventListener(<span class="v">'animationend'</span>, () => el.classList.remove(<span class="v">'shaking'</span>), { <span class="p">once</span>: <span class="v">true</span> });<br>
    <span class="c">/* force-restart: void el.offsetWidth trước khi thêm class lại */</span>
  `,
};

export { kfTabs, keyframeBars, keyframeWords, kfPanelCode };
export type { KeyframeTab };
