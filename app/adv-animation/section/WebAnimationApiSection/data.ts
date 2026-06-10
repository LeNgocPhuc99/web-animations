const webAnimationApiTabs = [
  { label: "element.animate()", value: "element.animate()" },
  { label: "KeyframeEffect", value: "KeyframeEffect" },
  { label: "playback control", value: "playback control" },
  { label: "vs CSS vs GSAP", value: "vs CSS vs GSAP" },
] as const;

type WebAnimationAPITab = (typeof webAnimationApiTabs)[number]["value"];

const panelTabsCode: Record<WebAnimationAPITab, string> = {
  "element.animate()": `
    <span class="c">// element.animate(keyframes, options)</span><br>
    <span class="k">const</span> anim = el.<span class="fn">animate</span>([<br>
    &nbsp;&nbsp;{ <span class="p">transform</span>: <span class="s">'translateX(0)'</span>, <span class="p">opacity</span>: <span class="v">0</span> },<br>
    &nbsp;&nbsp;{ <span class="p">transform</span>: <span class="s">'translateX(200px)'</span>, <span class="p">opacity</span>: <span class="v">1</span> }<br>
    ], { <span class="p">duration</span>: <span class="v">600</span>, <span class="p">easing</span>: <span class="s">'ease-out'</span>, <span class="p">fill</span>: <span class="s">'forwards'</span> });
  `,
  KeyframeEffect: `
    <span class="c">// tách keyframes khỏi element</span><br>
    <span class="k">const</span> effect = <span class="k">new</span> <span class="fn">KeyframeEffect</span>(<br>
    &nbsp;&nbsp;el,<br>
    &nbsp;&nbsp;[<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{ <span class="p">transform</span>: <span class="s">'scale(0) rotate(-180deg)'</span>, <span class="p">opacity</span>: <span class="v">0</span> },<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{ <span class="p">transform</span>: <span class="s">'scale(1.2) rotate(10deg)'</span>, <span class="p">opacity</span>: <span class="v">1</span>, <span class="p">offset</span>: <span class="v">0.7</span> },<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{ <span class="p">transform</span>: <span class="s">'scale(1) rotate(0deg)'</span>, <span class="p">opacity</span>: <span class="v">1</span> }<br>
    &nbsp;&nbsp;],<br>
    &nbsp;&nbsp;{ <span class="p">duration</span>: <span class="v">700</span>, <span class="p">easing</span>: <span class="s">'cubic-bezier(0.34,1.56,0.64,1)'</span>, <span class="p">fill</span>: <span class="s">'both'</span> }<br>
    );<br>
    <span class="k">const</span> anim = <span class="k">new</span> <span class="fn">Animation</span>(effect, document.timeline);<br>
    anim.<span class="fn">play</span>();
  `,
  "playback control": `
    <span class="c">// WAAPI animation object</span><br>
    <span class="k">const</span> anim = el.<span class="fn">animate</span>([...], {<br>
    &nbsp;&nbsp;<span class="p">duration</span>: <span class="v">2000</span>,<br>
    &nbsp;&nbsp;<span class="p">easing</span>: <span class="s">'cubic-bezier(0.37,0,0.63,1)'</span>,<br>
    &nbsp;&nbsp;<span class="p">iterations</span>: <span class="k">Infinity</span><br>
    });<br>
    anim.<span class="fn">play</span>();<br>
    anim.<span class="fn">pause</span>();<br>
    anim.<span class="fn">reverse</span>();<br>
    anim.currentTime = <span class="v">500</span>;<br>
    anim.<span class="fn">finish</span>();
  `,
  "vs CSS vs GSAP": `
    <span class="c">/* Rule of thumb */</span><br>
    <span class="c">// Simple hover/transition → CSS</span><br>
    <span class="c">// Needs JS control + no library → WAAPI</span><br>
    <span class="c">// Complex sequences + timeline → GSAP</span><br>
    <span class="c">// React + gestures + layout → Framer Motion</span>
  `,
};

export { webAnimationApiTabs, panelTabsCode };
export type { WebAnimationAPITab };
