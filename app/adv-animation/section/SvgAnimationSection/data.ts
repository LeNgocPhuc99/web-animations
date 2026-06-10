const svgTabs = [
  { label: "stroke draw-on", value: "stroke draw-on" },
  { label: "path morphing", value: "path morphing" },
  { label: "clip-path reveal", value: "clip-path reveal" },
  { label: "progress ring", value: "progress ring" },
  { label: "GSAP + SVG", value: "GSAP + SVG" },
] as const;

type SvgTab = (typeof svgTabs)[number]["value"];

const panelTabsCode: Record<SvgTab, string> = {
  "stroke draw-on": `
    <span class="c">/* stroke draw-on: reset dash length, then animate dasharray to full */</span><br>
    <span class="k">const</span> configs = [<br>
    &nbsp;&nbsp;{ id: <span class="s">'checkPath'</span>, dur: <span class="v">0.9</span>, delay: <span class="v">0</span> },<br>
    &nbsp;&nbsp;{ id: <span class="s">'circlePath'</span>, dur: <span class="v">1.1</span>, delay: <span class="v">0.15</span> },<br>
    &nbsp;&nbsp;{ id: <span class="s">'signPath'</span>, dur: <span class="v">1.0</span>, delay: <span class="v">0.35</span> },<br>
    ];<br>
    configs.<span class="fn">forEach</span>(({ id, dur, delay }) => {<br>
    &nbsp;&nbsp;<span class="k">const</span> el = document.<span class="fn">getElementById</span>(id);<br>
    &nbsp;&nbsp;<span class="k">let</span> len = <span class="v">300</span>;<br>
    &nbsp;&nbsp;<span class="k">try</span> { len = el.<span class="fn">getTotalLength</span>(); } <span class="k">catch</span> {}<br>
    &nbsp;&nbsp;el.style.<span class="p">transition</span> = <span class="s">'none'</span>;<br>
    &nbsp;&nbsp;el.style.<span class="p">strokeDasharray</span> = <span class="s">\`0 \${len + 10}\`</span>;<br>
    &nbsp;&nbsp;<span class="k">void</span> el.<span class="fn">getBoundingClientRect</span>();<br>
    &nbsp;&nbsp;<span class="fn">setTimeout</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">transition</span> = <span class="s">\`stroke-dasharray \${dur}s cubic-bezier(0.4,0,0.2,1)\`</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">strokeDasharray</span> = <span class="s">\`\${len} 0\`</span>;<br>
    &nbsp;&nbsp;}, delay * <span class="v">1000</span> + <span class="v">30</span>);<br>
    });
  `,
  "path morphing": `
    <span class="c">/* CSS morph on the first path, timed shape cycling on the second */</span><br>
    <span class="k">const</span> MORPH_SHAPES = [<br>
    &nbsp;&nbsp;<span class="s">"M28 8 L48 48 L8 48 Z"</span>,<br>
    &nbsp;&nbsp;<span class="s">"M28 8 C44 8 48 44 28 48 C8 44 12 8 28 8"</span>,<br>
    &nbsp;&nbsp;<span class="s">"M8 8 L48 8 L48 48 L8 48 Z"</span>,<br>
    &nbsp;&nbsp;<span class="s">"M28 4 L42 20 L56 24 L46 36 L48 52 L28 44 L8 52 L10 36 L0 24 L14 20 Z"</span>,<br>
    ];<br>
    <span class="k">let</span> morphIndex = <span class="v">0</span>;<br>
    <span class="k">let</span> morphTimer = <span class="k">null</span>;<br>
    <span class="k">function</span> runMorphDemo() {<br>
    &nbsp;&nbsp;<span class="c">// restart CSS animation on morphPath</span><br>
    &nbsp;&nbsp;p1.style.<span class="p">animation</span> = <span class="s">'none'</span>;<br>
    &nbsp;&nbsp;<span class="k">void</span> p1.<span class="fn">getBoundingClientRect</span>();<br>
    &nbsp;&nbsp;p1.style.<span class="p">animation</span> = <span class="s">'morphShape 4s ease-in-out infinite'</span>;<br>
    <br>
    &nbsp;&nbsp;<span class="c">// cycle morphPath2 through a shape list</span><br>
    &nbsp;&nbsp;<span class="k">const</span> morphSequence = () => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;morphIndex = (morphIndex + <span class="v">1</span>) % MORPH_SHAPES.length;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> next = MORPH_SHAPES[morphIndex];<br>
    &nbsp;&nbsp;&nbsp;&nbsp;p2.<span class="fn">setAttribute</span>(<span class="s">'d'</span>, next);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;morphTimer = <span class="fn">setTimeout</span>(morphSequence, <span class="v">1300</span>);<br>
    &nbsp;&nbsp;};<br>
    &nbsp;&nbsp;morphSequence();<br>
    }
  `,
  "clip-path reveal": `
    <span class="c">/* reset to initial hidden state */</span><br>
    <span class="k">function</span> runClipReveal() {<br>
    &nbsp;&nbsp;<span class="k">const</span> el1 = document.<span class="fn">getElementById</span>(<span class="s">'clipEl1'</span>);<br>
    &nbsp;&nbsp;<span class="k">const</span> el2 = document.<span class="fn">getElementById</span>(<span class="s">'clipEl2'</span>);<br>
    &nbsp;&nbsp;<span class="k">const</span> el3 = document.<span class="fn">getElementById</span>(<span class="s">'clipEl3'</span>);<br>
    &nbsp;&nbsp;<span class="k">const</span> txt = document.<span class="fn">getElementById</span>(<span class="s">'clipText'</span>);<br>
    <br>
    &nbsp;&nbsp;el1.style.<span class="p">transition</span> = <span class="s">'none'</span>;&nbsp;el1.style.<span class="p">clipPath</span> = <span class="s">'inset(0 100% 0 0)'</span>;<br>
    &nbsp;&nbsp;el2.style.<span class="p">transition</span> = <span class="s">'none'</span>;&nbsp;el2.style.<span class="p">clipPath</span> = <span class="s">'circle(0% at 50% 50%)'</span>;<br>
    &nbsp;&nbsp;el3.style.<span class="p">transition</span> = <span class="s">'none'</span>;&nbsp;el3.style.<span class="p">clipPath</span> = <span class="s">'polygon(0 0,0 0,0 100%,0 100%)'</span>;<br>
    &nbsp;&nbsp;txt.style.<span class="p">transition</span> = <span class="s">'none'</span>;&nbsp;txt.style.<span class="p">transform</span> = <span class="s">'translateY(110%)'</span>;<br>
    <br>
    &nbsp;&nbsp;<span class="fn">requestAnimationFrame</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">requestAnimationFrame</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el1.style.<span class="p">transition</span> = <span class="s">'clip-path 0.8s cubic-bezier(.77,0,.18,1)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el1.style.<span class="p">clipPath</span> = <span class="s">'inset(0 0% 0 0)'</span>;<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">setTimeout</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el2.style.<span class="p">transition</span> = <span class="s">'clip-path 0.7s cubic-bezier(.34,1.56,.64,1)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el2.style.<span class="p">clipPath</span> = <span class="s">'circle(75% at 50% 50%)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <span class="v">150</span>);<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">setTimeout</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el3.style.<span class="p">transition</span> = <span class="s">'clip-path 0.8s cubic-bezier(.77,0,.18,1)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el3.style.<span class="p">clipPath</span> = <span class="s">'polygon(0 0,100% 0,100% 100%,0 100%)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <span class="v">300</span>);<br>
    <br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">setTimeout</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txt.style.<span class="p">transition</span> = <span class="s">'transform 0.7s cubic-bezier(.22,1,.36,1)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;txt.style.<span class="p">transform</span> = <span class="s">'translateY(0)'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, <span class="v">450</span>);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;});<br>
    &nbsp;&nbsp;});<br>
    }
  `,
  "progress ring": `
    <span class="c">/* circumference = 2π × r = 2×3.14159×45 ≈ 283 */</span><br>
    <span class="k">function</span> updateRing(val) {<br>
    &nbsp;&nbsp;<span class="k">const</span> r = <span class="v">45</span>;<br>
    &nbsp;&nbsp;<span class="k">const</span> c = <span class="v">2</span> * Math.PI * r;&nbsp;<span class="c">// 282.74</span><br>
    &nbsp;&nbsp;<span class="k">const</span> filled = (val / <span class="v">100</span>) * c;<br>
    &nbsp;&nbsp;<span class="k">const</span> ring = document.<span class="fn">getElementById</span>(<span class="s">'ring1'</span>);<br>
    &nbsp;&nbsp;<span class="k">const</span> txt = document.<span class="fn">getElementById</span>(<span class="s">'ring1txt'</span>);<br>
    &nbsp;&nbsp;ring.style.<span class="p">transition</span> = <span class="s">'stroke-dasharray 0.5s cubic-bezier(.4,0,.2,1)'</span>;<br>
    &nbsp;&nbsp;ring.style.<span class="p">strokeDasharray</span> = <span class="s">\`\${filled} \${c - filled}\`</span>;<br>
    &nbsp;&nbsp;txt.textContent = val + <span class="s">'%'</span>;<br>
    &nbsp;&nbsp;document.<span class="fn">getElementById</span>(<span class="s">'ringVal'</span>).textContent = val + <span class="s">'%'</span>;<br>
    }<br>
    <br>
    <span class="c">/* segmented ring */</span><br>
    <span class="k">function</span> animateRings() {<br>
    &nbsp;&nbsp;<span class="c">// ring 1 - smooth to 75%</span><br>
    &nbsp;&nbsp;<span class="k">let</span> v = <span class="v">0</span>;<br>
    &nbsp;&nbsp;<span class="k">const</span> step = () => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;v += <span class="v">1.5</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">if</span>(v <= <span class="v">75</span>) { updateRing(Math.round(v)); requestAnimationFrame(step); }<br>
    &nbsp;&nbsp;};<br>
    &nbsp;&nbsp;document.<span class="fn">getElementById</span>(<span class="s">'ringSlider'</span>).value = <span class="v">0</span>;<br>
    &nbsp;&nbsp;updateRing(<span class="v">0</span>);<br>
    &nbsp;&nbsp;step();<br>
    <br>
    &nbsp;&nbsp;<span class="c">// ring 2 - segmented</span><br>
    &nbsp;&nbsp;<span class="k">const</span> r = <span class="v">45</span>, c = <span class="v">2</span> * Math.PI * r;<br>
    &nbsp;&nbsp;<span class="k">const</span> segs = [<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{ id: <span class="s">'ring2seg1'</span>, pct: <span class="v">40</span>, offset: <span class="v">0</span> },<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{ id: <span class="s">'ring2seg2'</span>, pct: <span class="v">30</span>, offset: <span class="v">40</span> },<br>
    &nbsp;&nbsp;&nbsp;&nbsp;{ id: <span class="s">'ring2seg3'</span>, pct: <span class="v">20</span>, offset: <span class="v">72</span> },<br>
    &nbsp;&nbsp;];<br>
    &nbsp;&nbsp;segs.<span class="fn">forEach</span>((s, i) => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> el = document.<span class="fn">getElementById</span>(s.id);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">transition</span> = <span class="s">'none'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">strokeDasharray</span> = <span class="s">'0 283'</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">strokeDashoffset</span> = <span class="v">0</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">setTimeout</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> filled = (s.pct / <span class="v">100</span>) * c;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> gap = <span class="v">4</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">transition</span> = <span class="s">\`stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1) \${i*0.2}s\`</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">strokeDasharray</span> = <span class="s">\`\${filled-gap} \${c-(filled-gap)}\`</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// offset to position after previous segment</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;el.style.<span class="p">strokeDashoffset</span> = -((s.offset / <span class="v">100</span>) * c);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;}, <span class="v">100</span>);<br>
    &nbsp;&nbsp;});<br>
    }
  `,
  "GSAP + SVG": `
    <span class="c">/* GSAP orbit: rotate two circles around a center and update cx/cy */</span><br>
    <span class="k">import</span> gsap from <span class="s">"gsap"</span>;<br>
    <span class="k">let</span> orbitTween = <span class="k">null</span>;<br>
    <span class="k">let</span> orbitTicker = <span class="k">null</span>;<br>
    <span class="k">function</span> runGsapSvg() {<br>
    &nbsp;&nbsp;<span class="k">if</span> (orbitTicker) gsap.ticker.<span class="fn">remove</span>(orbitTicker);<br>
    &nbsp;&nbsp;<span class="k">if</span> (orbitTween) orbitTween.<span class="fn">kill</span>();<br>
    &nbsp;&nbsp;gsap.<span class="fn">set</span>(planet, { <span class="p">transformOrigin</span>: <span class="s">'50px 50px'</span> });<br>
    &nbsp;&nbsp;gsap.<span class="fn">set</span>(moon, { <span class="p">transformOrigin</span>: <span class="s">'50px 50px'</span> });<br>
    &nbsp;&nbsp;orbitTween = gsap.<span class="fn">timeline</span>({ <span class="p">repeat</span>: <span class="v">-1</span> });<br>
    &nbsp;&nbsp;orbitTween.<span class="fn">to</span>(planet, { <span class="p">rotation</span>: <span class="v">360</span>, <span class="p">duration</span>: <span class="v">4</span>, <span class="p">ease</span>: <span class="s">'none'</span> }, <span class="v">0</span>).<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">to</span>(moon, { <span class="p">rotation</span>: <span class="v">-720</span>, <span class="p">duration</span>: <span class="v">2</span>, <span class="p">ease</span>: <span class="s">'none'</span> }, <span class="v">0</span>);<br>
    &nbsp;&nbsp;orbitTicker = () => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> t = gsap.ticker.<span class="fn">time</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> angle = t * Math.PI * <span class="v">2</span> / <span class="v">4</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> cx = <span class="v">50</span> + <span class="v">30</span> * Math.<span class="fn">cos</span>(angle);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> cy = <span class="v">50</span> + <span class="v">30</span> * Math.<span class="fn">sin</span>(angle);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;planet.<span class="fn">setAttribute</span>(<span class="s">'cx'</span>, cx);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;planet.<span class="fn">setAttribute</span>(<span class="s">'cy'</span>, cy);<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="k">const</span> ma = t * Math.PI * <span class="v">2</span> / <span class="v">1.5</span>;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;moon.<span class="fn">setAttribute</span>(<span class="s">'cx'</span>, cx + <span class="v">8</span> * Math.<span class="fn">cos</span>(ma));<br>
    &nbsp;&nbsp;&nbsp;&nbsp;moon.<span class="fn">setAttribute</span>(<span class="s">'cy'</span>, cy + <span class="v">8</span> * Math.<span class="fn">sin</span>(ma));<br>
    &nbsp;&nbsp;};<br>
    &nbsp;&nbsp;gsap.ticker.<span class="fn">add</span>(orbitTicker);<br>
    }
  `,
};

export { svgTabs, panelTabsCode };
export type { SvgTab };
