const propertiesTabs = [
  { label: "transform shortcuts", value: "transform shortcuts" },
  { label: "CSS properties", value: "CSS properties" },
  { label: "special values", value: "special values" },
] as const;

type PropertiesTab = (typeof propertiesTabs)[number]["value"];

const propertiesPanelCode: Record<PropertiesTab, string> = {
  "transform shortcuts": `
    <span class="c">// GSAP shorthand — tự động tổng hợp thành transform string</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">100</span>, <span class="p">y</span>: <span class="v">-20</span>, <span class="p">rotation</span>: <span class="v">45</span>, <span class="p">scale</span>: <span class="v">1.2</span> });<br>
    <span class="c">// tương đương CSS:</span><br>
    <span class="c">// transform: translateX(100px) translateY(-20px) rotate(45deg) scale(1.2)</span>
  `,
  "CSS properties": `
    <span class="c">// camelCase cho CSS props với dấu gạch nối</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">backgroundColor</span>: <span class="s">'#ff0'</span>, <span class="p">borderRadius</span>: <span class="v">'50%'</span> });<br>
    <span class="c">// animate object thuần (counter, progress, v.v.)</span><br>
    <span class="fn">gsap.to</span>(obj, { <span class="p">value</span>: <span class="v">100</span>, <span class="p">onUpdate</span>: () => el.textContent = obj.value.toFixed(0) });<br>
    <span class="c">// SVG attributes</span><br>
    <span class="fn">gsap.to</span>(circle, { <span class="p">attr</span>: { <span class="p">r</span>: <span class="v">40</span>, <span class="p">'stroke-dasharray'</span>: <span class="s">'126 0'</span> } });
  `,
  "special values": `
    <span class="c">// relative: += hoặc -= từ giá trị hiện tại</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="s">'+=100'</span>, <span class="p">rotation</span>: <span class="s">'+=45'</span> });<br>
    <span class="c">// snap: làm tròn đến giá trị gần nhất trong array</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">300</span>, <span class="p">snap</span>: { <span class="p">x</span>: <span class="v">100</span> } });<span class="c"> // snap mỗi 100px</span><br>
    <span class="c">// random: gsap.utils.random(min, max)</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="fn">gsap.utils.random</span>(<span class="v">-100</span>, <span class="v">100</span>) });<br>
    <span class="c">// function-based: nhận (index, target, targets)</span><br>
    <span class="fn">gsap.to</span>(els, { <span class="p">x</span>: (i) => i * <span class="v">60</span> });
  `,
};

const propertyCards = [
  {
    name: "x / y",
    desc: "translateX / translateY — px mặc định<br><code>x: 100</code> = <code>translateX(100px)</code>",
    transformPros: "x",
  },
  {
    name: "rotation / rotationX / rotationY",
    desc: "translateX / translateY — px mặc định<br><code>x: 100</code> = <code>translateX(100px)</code>",
    transformPros: "rotation",
  },
  {
    name: "scale / scaleX / scaleY",
    desc: "<code>scale: 1.5</code> tương đương <code>scale(1.5)</code><br>Animate từ 0→1 cho pop-in effect",
    transformPros: "scale",
  },
  {
    name: "skewX / skewY",
    desc: ">Đơn vị deg. Dùng cho kinetic typography<br>hoặc velocity-feel animations",
    transformPros: "skew",
  },
] as const;
export { propertiesTabs, propertiesPanelCode, propertyCards };
export type { PropertiesTab };
