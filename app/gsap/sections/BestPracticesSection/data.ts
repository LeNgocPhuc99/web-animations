const bpTabs = [
  { label: `dos & don'ts`, value: `dos & don'ts` },
  { label: `performance`, value: `performance` },
  { label: `debug toolkit`, value: `debug toolkit` },
  { label: `mental model`, value: `mental model` },
] as const;

type BestPracticeTab = (typeof bpTabs)[number]["value"];

const panelTabsCode: Record<BestPracticeTab, string> = {
  "dos & don'ts": `
    <span class="c">// ✅ pattern chuẩn cho animated component</span><br>
    <span class="fn">gsap.set</span>(el, { <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">y</span>:<span class="v">20</span> });&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// 1. init state</span><br>
    <span class="k">const</span> tween = <span class="fn">gsap.to</span>(el, { <span class="p">opacity</span>:<span class="v">1</span>, <span class="p">y</span>:<span class="v">0</span>, <span class="p">duration</span>:<span class="v">0.6</span>,<br>
    &nbsp;&nbsp;<span class="p">clearProps</span>: <span class="s">'all'</span> });&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// 2. animate + cleanup</span><br>
    <span class="k">return</span> () => tween.<span class="fn">kill</span>();&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// 3. cleanup</span>
  `,
  performance: `
    <span class="c">// gsap.matchMedia() — handle reduced motion + breakpoints</span><br>
    <span class="k">const</span> mm = <span class="fn">gsap.matchMedia</span>();<br>
    mm.<span class="fn">add</span>(<span class="s">'(prefers-reduced-motion: no-preference)'</span>, () => {<br>
    &nbsp;&nbsp;<span class="fn">gsap.from</span>(<span class="s">'.hero'</span>, { <span class="p">y</span>:<span class="v">60</span>, <span class="p">opacity</span>:<span class="v">0</span> });<br>
    &nbsp;&nbsp;<span class="k">return</span> () => {}&nbsp;&nbsp;<span class="c">// cleanup tự động khi media query thay đổi</span><br>
    });
  `,
  "debug toolkit": `
    <span class="c">// slow-mo toàn bộ để debug — đặt trong console</span><br>
    gsap.globalTimeline.<span class="fn">timeScale</span>(<span class="v">0.2</span>);<br>
    <span class="c">// xem tất cả tweens đang active</span><br>
    gsap.globalTimeline.<span class="fn">getChildren</span>(<span class="k">true</span>, <span class="k">true</span>, <span class="k">true</span>).<span class="fn">forEach</span>(t => console.<span class="fn">log</span>(t));<br>
    <span class="c">// force refresh ScrollTrigger sau dynamic content load</span><br>
    ScrollTrigger.<span class="fn">refresh</span>();
  `,
  "mental model": `
    <span class="c">/* quick reference — GSAP Core cheat sheet */</span><br>
    <span class="fn">gsap.to</span>(el, vars)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// hiện tại → target</span><br>
    <span class="fn">gsap.from</span>(el, vars)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// target → hiện tại</span><br>
    <span class="fn">gsap.fromTo</span>(el, from, to)<span class="c">// full control</span><br>
    <span class="fn">gsap.set</span>(el, vars)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// instant, no animation</span><br>
    <span class="fn">gsap.timeline</span>(config)&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// sequence tweens</span><br>
    <span class="fn">gsap.killTweensOf</span>(el)&nbsp;&nbsp;&nbsp;<span class="c">// kill specific tweens</span><br>
    <span class="fn">gsap.globalTimeline</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// master timeline</span>
  `,
};

const bpTipsData = [
  {
    class: "good",
    title: "✅ Dùng gsap.set() để init",
    body: `Set trạng thái ban đầu bằng <code>gsap.set()</code> thay vì CSS — đảm bảo GSAP biết điểm xuất phát và không có flash khi animate.`,
  },
  {
    class: "bad",
    title: "❌ Mix CSS transition + GSAP",
    body: `Đừng để cùng property có cả CSS <code>transition</code> và GSAP tween — chúng conflict nhau. Chọn một trong hai, thường là GSAP.`,
  },
  {
    class: "good",
    title: "✅ Lưu tween vào biến",
    body: `Luôn <code>const tween = gsap.to(...)</code> để có thể <code>pause()</code>, <code>kill()</code>, <code>reverse()</code> sau này. Tránh anonymous tween không quản lý được.`,
  },
  {
    class: "bad",
    title: "❌ Tạo tween trong render loop",
    body: `Đừng tạo tween trong <code>onUpdate</code> callback hay RAF loop — mỗi frame tạo một tween mới làm memory leak. Tạo một lần, control nhiều lần.`,
  },
  {
    class: "good",
    title: "✅ clearProps sau animation",
    body: `<code>clearProps: 'all'</code> xoá inline styles sau khi xong — trả element về CSS class ban đầu. Quan trọng khi element cần responsive layout sau animation.`,
  },
  {
    class: "bad",
    title: "❌ Animate layout properties",
    body: `Tránh animate <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code>. Dùng <code>x/y</code>, <code>scaleX/Y</code>, <code>xPercent</code> thay thế.`,
  },
];

const bpPerformanceData = [
  {
    title: "⚡ will-change trước animation",
    body: `Set <code>will-change: transform</code> trên element sắp animate để browser tạo GPU layer trước. Remove sau khi animation kết thúc tránh layer bloat.`,
  },
  {
    title: "⚡ gsap.killTweensOf()",
    body: `Gọi <code>gsap.killTweensOf(el)</code> trước khi tạo tween mới trên cùng element — tránh stacking tweens không cần thiết, đặc biệt trong event handlers.`,
  },
  {
    title: "⚡ Dùng ticker của GSAP",
    body: `Thay <code>requestAnimationFrame</code> tự viết, dùng <code>gsap.ticker.add(callback)</code> — GSAP tối ưu ticker để sync với render cycle, tránh double rAF.`,
  },
  {
    title: "⚡ lazyRender: true (mặc định)",
    body: `GSAP dùng lazy rendering — gộp DOM write cuối mỗi tick để tránh layout thrashing. Đừng override <code>gsap.config({force3D: 'auto'})</code> trừ khi có lý do.`,
  },
  {
    title: "⚡ Batch ScrollTriggers",
    body: `<code>ScrollTrigger.batch()</code> xử lý nhiều elements trong một trigger thay vì tạo riêng từng cái — giảm số lượng IntersectionObserver đáng kể.`,
  },
  {
    title: "⚡ prefers-reduced-motion",
    body: `Luôn wrap GSAP animations trong <code>matchMedia('(prefers-reduced-motion: no-preference)')</code> — GSAP 3.x có <code>gsap.matchMedia()</code> để xử lý sạch.`,
  },
];

const bpDebugData = [
  {
    title: "console inspection",
    class: "debug",
    body: `
      <span>tween.progress()</span> — 0 đến 1<br>
      <span>tween.time()</span> — seconds elapsed<br>
      <span>tween.duration()</span> — total duration<br>
      <span>tween.isActive()</span> — đang chạy?<br>
      <span>tween.paused()</span> — đang pause?<br>
      <span>gsap.globalTimeline</span> — xem tất cả
    `,
  },
  {
    title: "GSDevTools (plugin)",
    class: "plugin",
    body: `
      Plugin chính thức (Club GSAP): UI timeline scrubber ngay trên trang — drag để seek, thay speed, xem tất cả tweens đang active. Công cụ debug mạnh nhất cho complex animations.
      <div class="bp-subtitle">timeScale trick</div>
      <div><code>gsap.globalTimeline.timeScale(0.2)</code> — slow-mo toàn bộ page để debug</div>
    `,
  },
];

const bpDebugIssuesData = [
  "Element không tìm thấy → selector sai hoặc DOM chưa render",
  "Animation flash → thiếu <code>gsap.set()</code> init trước khi <code>from()</code>",
  "Tween không chạy → element có <code>display:none</code> hoặc <code>visibility:hidden</code>",
  "Conflict với CSS → có CSS transition trên cùng property",
  "Memory leak → không cleanup trong React useEffect",
  "ScrollTrigger sai vị trí → chạy trước khi font/image load xong",
];

const bpMentalModelData = [
  {
    class: "good",
    title: "GSAP là transport layer, không phải design tool",
    body: "GSAP không giúp bạn quyết định animation trông như thế nào — đó là công việc của bạn. GSAP chỉ đảm bảo nó chạy đúng, đủ mượt, và đúng lúc. Thiết kế animation trước trên giấy hoặc Figma, rồi mới code.",
  },
  {
    class: "info",
    title: "Tween = mô tả trạng thái, không phải lệnh",
    body: `<code>gsap.to(el, {x:100})</code> không nói "di chuyển 100px từ đây". Nó nói "element này phải ở x=100". GSAP tự tính toán từ trạng thái hiện tại đến đó. Đây là lý do <code>fromTo()</code> đáng tin cậy hơn <code>from()</code> trong timeline phức tạp.`,
  },
  {
    class: "accent",
    title: "Timeline = choreographer, Tween = dancer",
    body: "Timeline không animate gì cả — nó chỉ điều phối thứ tự và timing của các Tween. Hiểu cái này giúp debug: nếu animation sai, vấn đề thường là ở position parameter trong timeline, không phải tween.",
  },
  {
    class: "tip",
    title: "Lộ trình tiếp theo sau Core",
    body: `
      <strong>ScrollTrigger</strong> chuyên sâu (scrub, pin, parallax) →
      <strong>Flip plugin</strong> (FLIP technique, shared layout) →
      <strong>MotionPath</strong> (animate theo đường SVG) →
      <strong>MorphSVG</strong> (shape morphing) →
      <strong>SplitText</strong> (text animation theo char/word/line)
    `,
  },
];

export {
  bpTabs,
  panelTabsCode,
  bpTipsData,
  bpPerformanceData,
  bpDebugData,
  bpDebugIssuesData,
  bpMentalModelData,
};

export type { BestPracticeTab };
