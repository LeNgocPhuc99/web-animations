const contextTabs = [
  { label: "vấn đề không cleanup", value: "vấn đề không cleanup" },
  { label: "gsap.context()", value: "gsap.context()" },
  { label: "useGSAP hook", value: "useGSAP hook" },
  { label: "scope selector", value: "scope selector" },
] as const;

type ContextTab = (typeof contextTabs)[number]["value"];

const panelTabsCode: Record<ContextTab, string> = {
  "vấn đề không cleanup": `
    <span class="c">// ❌ Không cleanup — phổ biến nhất khi mới học</span><br>
    <span class="k">useEffect</span>(() => {<br>
    &nbsp;&nbsp;<span class="fn">gsap.to</span>(<span class="s">'.box'</span>, { <span class="p">x</span>:<span class="v">100</span>, <span class="p">repeat</span>:<span class="v">-1</span> });<br>
    &nbsp;&nbsp;<span class="c">// không return cleanup → zombie khi unmount</span><br>
    }, []);
  `,
  "gsap.context()": `
    <span class="c">// ✅ gsap.context() — vanilla JS & class components</span><br>
    <span class="k">useEffect</span>(() => {<br>
    &nbsp;&nbsp;<span class="k">const</span> ctx = <span class="fn">gsap.context</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">gsap.to</span>(<span class="s">'.box'</span>, { <span class="p">x</span>:<span class="v">100</span>, <span class="p">repeat</span>:<span class="v">-1</span> });<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">gsap.from</span>(<span class="s">'.title'</span>, { <span class="p">opacity</span>:<span class="v">0</span> });<br>
    &nbsp;&nbsp;}, containerRef);&nbsp;&nbsp;<span class="c">// scope: containerRef.current</span><br>
    &nbsp;&nbsp;<span class="k">return</span> () => ctx.<span class="fn">revert</span>();&nbsp;&nbsp;<span class="c">// cleanup tự động</span><br>
    }, []);
  `,
  "useGSAP hook": `
    <span class="c">// npm install @gsap/react</span><br>
    <span class="k">import</span> { useGSAP } <span class="k">from</span> <span class="s">'@gsap/react'</span>;<br>
    <br>
    <span class="k">function</span> <span class="fn">MyComponent</span>() {<br>
    &nbsp;&nbsp;<span class="k">const</span> container = <span class="fn">useRef</span>();<br>
    &nbsp;&nbsp;<span class="fn">useGSAP</span>(() => {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">gsap.from</span>(<span class="s">'.box'</span>, { <span class="p">y</span>:<span class="v">30</span>, <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">stagger</span>:<span class="v">0.1</span> });<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// không cần return cleanup — hook tự xử lý</span><br>
    &nbsp;&nbsp;}, { <span class="p">scope</span>: container });<br>
    &nbsp;&nbsp;<span class="k">return</span> &lt;div ref={container}&gt;...&lt;/div&gt;;<br>
    }
  `,
  "scope selector": `
    <span class="c">// callback chạy sau useGSAP() phải bọc bằng contextSafe()</span><br>
    <span class="k">const</span> scopeRef = <span class="fn">useRef</span>(<span class="v">null</span>);<br>
    <span class="k">const</span> { contextSafe } = <span class="fn">useGSAP</span>({ <span class="p">scope</span>: scopeRef });<br>
    <br>
    <span class="k">const</span> runScopeDemo = <span class="fn">contextSafe</span>(() => {<br>
    &nbsp;&nbsp;<span class="fn">gsap.set</span>([<span class="s">'.scope-box-a'</span>, <span class="s">'.scope-box-b'</span>], { <span class="p">x</span>:<span class="v">0</span>, <span class="p">opacity</span>:<span class="v">1</span> });<br>
    &nbsp;&nbsp;<span class="fn">gsap.from</span>(<span class="s">'.scope-box-a'</span>, { <span class="p">x</span>:<span class="v">-30</span>, <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">stagger</span>:<span class="v">0.1</span>, <span class="p">duration</span>:<span class="v">0.5</span>, <span class="p">ease</span>:<span class="s">'back.out(2)'</span> });<br>
    &nbsp;&nbsp;<span class="fn">gsap.from</span>(<span class="s">'.scope-box-b'</span>, { <span class="p">x</span>:<span class="v">30</span>, <span class="p">opacity</span>:<span class="v">0</span>, <span class="p">stagger</span>:<span class="v">0.1</span>, <span class="p">duration</span>:<span class="v">0.5</span>, <span class="p">ease</span>:<span class="s">'elastic.out(1,0.5)'</span>, <span class="p">delay</span>:<span class="v">0.3</span> });<br>
    });<br>
    <br>
    <span class="k">return</span> &lt;div ref={scopeRef}&gt;&lt;button onClick={runScopeDemo}&gt;Demo&lt;/button&gt;...&lt;/div&gt;;
  `,
};

export { contextTabs, panelTabsCode };

export type { ContextTab };
