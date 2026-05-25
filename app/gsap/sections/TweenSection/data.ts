const tweenTabs = [
  { label: "gsap.to()", value: "gsap.to()" },
  { label: "gsap.from()", value: "gsap.from()" },
  { label: "gsap.fromTo()", value: "gsap.fromTo()" },
  { label: "so sánh", value: "so sánh" },
] as const;

type TweenTab = (typeof tweenTabs)[number]["value"];

const tweenPanelCode: Record<TweenTab, string> = {
  "gsap.to()": `
    <span class="c">// animate từ vị trí hiện tại → target values</span><br>
    <span class="fn">gsap.to</span>(<span class="s">'#box'</span>, {<br>
    &nbsp;&nbsp;<span class="p">x</span>: <span class="v">200</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// translateX — dùng x thay vì left</span><br>
    &nbsp;&nbsp;<span class="p">rotation</span>: <span class="v">360</span>,<br>
    &nbsp;&nbsp;<span class="p">scale</span>: <span class="v">1.4</span>,<br>
    &nbsp;&nbsp;<span class="p">duration</span>: <span class="v">1</span>,&nbsp;&nbsp;&nbsp;<span class="c">// giây</span><br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'power2.out'</span><br>
  });`,
  "gsap.from()": `
    <span class="c">// animate từ target values → trạng thái CSS hiện tại</span><br>
    <span class="c">// dùng cho enter animations: element appear từ ngoài vào</span><br>
    <span class="fn">gsap.from</span>(<span class="s">'#box'</span>, {<br>
    &nbsp;&nbsp;<span class="p">x</span>: <span class="v">-200</span>,<br>
    &nbsp;&nbsp;<span class="p">opacity</span>: <span class="v">0</span>,<br>
    &nbsp;&nbsp;<span class="p">duration</span>: <span class="v">0.8</span>,<br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'back.out(1.7)'</span><br>
  });`,
  "gsap.fromTo()": `
    <span class="c">// kiểm soát HOÀN TOÀN điểm đầu & điểm cuối</span><br>
    <span class="c">// không phụ thuộc trạng thái CSS — predictable nhất</span><br>
    <span class="fn">gsap.fromTo</span>(<span class="s">'#box'</span>,<br>
    &nbsp;&nbsp;{ <span class="p">x</span>: <span class="v">-160</span>, <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">scale</span>: <span class="v">0.5</span> }, <span class="c">// FROM</span><br>
    &nbsp;&nbsp;{ <span class="p">x</span>: <span class="v">160</span>,&nbsp; <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">scale</span>: <span class="v">1</span>,&nbsp; &nbsp;<span class="c">// TO</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">duration</span>: <span class="v">1</span>, <span class="p">ease</span>: <span class="s">'elastic.out(1,0.5)'</span> }<br>
  );`,
  "so sánh": `
    <span class="c">// to(): không biết điểm đầu, chỉ biết điểm cuối</span><br>
    <span class="fn">gsap.to</span>(el, { <span class="p">x</span>: <span class="v">120</span> });&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// x hiện tại → 120</span><br>
    <span class="c">// from(): không biết điểm cuối, chỉ biết điểm đầu</span><br>
    <span class="fn">gsap.from</span>(el, { <span class="p">x</span>: <span class="v">-120</span> });&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// -120 → x hiện tại</span><br>
    <span class="c">// fromTo(): kiểm soát hoàn toàn — dùng trong Timeline</span><br>
    <span class="fn">gsap.fromTo</span>(el, {<span class="p">x</span>:<span class="v">-120</span>}, {<span class="p">x</span>:<span class="v">120</span>});&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// -120 → 120</span><br>
  `,
};

export { tweenTabs, tweenPanelCode };
export type { TweenTab };
