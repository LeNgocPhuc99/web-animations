const motionBPTabs = [
  { label: `dos & don'ts`, value: `dos & don'ts` },
  { label: "performance", value: "performance" },
  { label: "vs GSAP", value: "vs GSAP" },
] as const;

type MotionBPTab = (typeof motionBPTabs)[number]["value"];

const motionBPDosDonts = [
  {
    className: "good",
    title: "✅ Dùng variants cho reusable",
    body: "Định nghĩa variants ngoài component tránh re-create object mỗi render. Đặt trong file riêng và import — dễ maintain và test.",
  },
  {
    className: "bad",
    title: "❌ Inline object trong animate",
    body: "Tránh animate={{ x: computed }} với object mới mỗi render — gây re-animation không cần thiết. Dùng useMotionValue hoặc animate với stable reference.",
  },
  {
    className: "good",
    title: "✅ AnimatePresence đúng vị trí",
    body: "<code>AnimatePresence</code> phải bao trực tiếp conditional render. Component bên trong phải có <code>key</code> prop unique để Motion track được.",
  },
  {
    className: "bad",
    title: "❌ Quên key trong AnimatePresence",
    body: "Không có <code>key</code> → Motion không biết element nào unmount → exit animation không chạy. Key phải là unique identifier, không phải index.",
  },
  {
    className: "good",
    title: "✅ useReducedMotion",
    body: "Dùng hook <code>useReducedMotion()</code> để detect preference và disable/simplify animations. Accessibility-first từ đầu.",
  },
  {
    className: "bad",
    title: "❌ Layout animation không cần thiết",
    body: "<code>layout</code> prop dùng FLIP technique — tốn CPU mỗi render. Chỉ dùng khi thực sự cần animate position/size change, không thêm vào mọi element.",
  },
] as const;

const motionBPTips = [
  {
    title: "⚡ MotionValue không trigger re-render",
    body: "<code>useMotionValue</code> và <code>useTransform</code> cập nhật trực tiếp DOM style mà không qua React render cycle — đây là lý do scroll-linked animations mượt.",
  },
  {
    title: "⚡ transform thay left/top",
    body: "Framer Motion mặc định dùng <code>transform</code> cho <code>x/y</code> — GPU composite layer. Tránh animate <code>top/left</code> trực tiếp.",
  },
  {
    title: "⚡ LazyMotion + domAnimation",
    body: "Dùng <code>LazyMotion</code> + <code>domAnimation</code> để chỉ load features cần thiết — giảm bundle size đáng kể (từ ~34kb → ~18kb).",
  },
  {
    title: "⚡ will-change tự động",
    body: "Framer Motion tự động set <code>will-change: transform</code> khi detect có animation — bạn không cần làm thủ công.",
  },
] as const;

const motionBPVsRows = [
  {
    criterion: "Ecosystem",
    framerMotion: "React-only (v10+ có vanilla)",
    gsap: "Vanilla JS + mọi framework",
  },
  {
    criterion: "Layout animation",
    framerMotion: "✅ Built-in layout / layoutId",
    gsap: "❌ Cần Flip plugin",
  },
  {
    criterion: "Exit animations",
    framerMotion: "✅ AnimatePresence built-in",
    gsap: "❌ Manual với onComplete",
  },
  {
    criterion: "Gestures",
    framerMotion: "✅ whileHover/Tap/Drag built-in",
    gsap: "❌ Tự add event listeners",
  },
  {
    criterion: "Timeline sequencing",
    framerMotion: "🟡 Cơ bản (useAnimate)",
    gsap: "✅ Mạnh hơn nhiều",
  },
  {
    criterion: "ScrollTrigger",
    framerMotion: "🟡 useScroll (basic)",
    gsap: "✅ ScrollTrigger plugin (best)",
  },
  {
    criterion: "SVG morphing",
    framerMotion: "❌ Không có",
    gsap: "✅ MorphSVG plugin",
  },
  {
    criterion: "Bundle size",
    framerMotion: "~34kb (LazyMotion ~18kb)",
    gsap: "~30kb core",
  },
  {
    criterion: "Learning curve",
    framerMotion: "Thấp — React-native API",
    gsap: "Trung bình",
  },
  {
    criterion: "Performance",
    framerMotion: "Excellent (MotionValue)",
    gsap: "Excellent",
  },
  {
    criterion: "Best for",
    framerMotion: "UI micro-interactions, layout",
    gsap: "Complex sequences, SVG, scroll",
  },
] as const;

const panelTabsCode: Record<MotionBPTab, string> = {
  "dos & don'ts": `
    <span class="c">// ✅ variants ngoài component — stable reference</span><br>
    <span class="k">const</span> cardVariants = { <span class="p">hidden</span>:{<span class="p">opacity</span>:<span class="v">0</span>}, <span class="p">visible</span>:{<span class="p">opacity</span>:<span class="v">1</span>} };<br>
    <span class="k">function</span> <span class="fn">Card</span>() {<br>
    &nbsp;&nbsp;<span class="k">const</span> shouldReduce = <span class="fn">useReducedMotion</span>();<br>
    &nbsp;&nbsp;<span class="k">return</span> <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">variants</span>={shouldReduce ? {} : cardVariants} <span class="tag">/&gt;</span>;<br>
    }
  `,
  performance: `
    <span class="c">// LazyMotion: giảm bundle size</span><br>
    <span class="k">import</span> { LazyMotion, domAnimation, m } <span class="k">from</span> <span class="s">'framer-motion'</span>;<br>
    <span class="tag">&lt;<span class="fn">LazyMotion</span> <span class="p">features</span>={domAnimation}&gt;</span><br>
    &nbsp;&nbsp;<span class="tag">&lt;<span class="fn">m.div</span></span> <span class="p">animate</span>={{ <span class="p">x</span>:<span class="v">100</span> }} <span class="tag">/&gt;</span>&nbsp;&nbsp;<span class="c">// dùng m.div thay motion.div</span><br>
    <span class="tag">&lt;/<span class="fn">LazyMotion</span>&gt;</span>
  `,
  "vs GSAP": `
    <span class="c">// Rule of thumb:</span><br>
    <span class="c">// React project + layout animations + gestures → Framer Motion</span><br>
    <span class="c">// Complex sequences + ScrollTrigger + SVG morphing → GSAP</span><br>
    <span class="c">// Cả hai: GSAP cho heavy animations, Motion cho UI micro-interactions</span>
  `,
};

export {
  motionBPTabs,
  motionBPDosDonts,
  motionBPTips,
  motionBPVsRows,
  panelTabsCode,
};
export type { MotionBPTab };
