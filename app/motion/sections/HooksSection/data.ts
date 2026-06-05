const hooksTabs = [
  { label: "useMotionValue", value: "useMotionValue" },
  { label: "useTransform", value: "useTransform" },
  { label: "useSpring", value: "useSpring" },
  { label: "useScroll", value: "useScroll" },
] as const;

type HooksTab = (typeof hooksTabs)[number]["value"];

const panelTabsCode: Record<HooksTab, string> = {
  useMotionValue: `
    <span class="c">// useMotionValue: reactive value — cập nhật không trigger re-render</span><br>
    <span class="k">const</span> x = <span class="fn">useMotionValue</span>(<span class="v">0</span>);<br>
    <span class="c">// đọc: x.get() | ghi: x.set(100) | subscribe: x.on('change', cb)</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">style</span>={{ x }} <span class="tag">/&gt;</span>&nbsp;&nbsp;<span class="c">// bind trực tiếp vào style</span>
  `,
  useTransform: `
    <span class="c">// useTransform: map input range → output range</span><br>
    <span class="k">const</span> x = <span class="fn">useMotionValue</span>(<span class="v">0</span>);<br>
    <span class="k">const</span> opacity  = <span class="fn">useTransform</span>(x, [<span class="v">-200</span>, <span class="v">0</span>, <span class="v">200</span>], [<span class="v">0</span>, <span class="v">1</span>, <span class="v">0</span>]);<br>
    <span class="k">const</span> rotate   = <span class="fn">useTransform</span>(x, [<span class="v">-200</span>, <span class="v">200</span>], [<span class="v">-30</span>, <span class="v">30</span>]);<br>
    <span class="k">const</span> scale    = <span class="fn">useTransform</span>(x, [<span class="v">-200</span>, <span class="v">0</span>, <span class="v">200</span>], [<span class="v">0.7</span>, <span class="v">1</span>, <span class="v">0.7</span>]);
  `,
  useSpring: `
    <span class="c">// useSpring: wrap MotionValue với spring physics</span><br>
    <span class="k">const</span> mouseX   = <span class="fn">useMotionValue</span>(<span class="v">0</span>);<br>
    <span class="k">const</span> springX  = <span class="fn">useSpring</span>(mouseX, { <span class="p">stiffness</span>:<span class="v">300</span>, <span class="p">damping</span>:<span class="v">30</span> });<br>
    <span class="c">// khi mouseX thay đổi, springX "đuổi theo" với spring physics</span><br>
    <span class="tag">&lt;<span class="fn">motion.div</span></span> <span class="p">style</span>={{ <span class="p">x</span>: springX }} <span class="tag">/&gt;</span>
  `,
  useScroll: `
    <span class="c">// useScroll: đọc scroll progress (0 → 1)</span><br>
    <span class="k">const</span> { scrollYProgress } = <span class="fn">useScroll</span>();<br>
    <span class="k">const</span> scaleX = <span class="fn">useSpring</span>(scrollYProgress, { <span class="p">stiffness</span>:<span class="v">100</span>, <span class="p">damping</span>:<span class="v">30</span> });<br>
    <span class="c">// containerRef: scroll trong container, không phải window</span><br>
    <span class="k">const</span> { scrollYProgress } = <span class="fn">useScroll</span>({ <span class="p">container</span>: containerRef });
  `,
};

export { hooksTabs, panelTabsCode };
export type { HooksTab };
