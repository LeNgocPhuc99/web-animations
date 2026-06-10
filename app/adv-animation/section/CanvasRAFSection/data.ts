const canvasTabs = [
  { label: "particle system", value: "particle system" },
  { label: "ripple wave", value: "ripple wave" },
  { label: "noise field", value: "noise field" },
  { label: "rAF game loop", value: "rAF game loop" },
] as const;

type CanvasTab = (typeof canvasTabs)[number]["value"];

const panelTabsCode: Record<CanvasTab, string> = {
  "particle system": `
    <span class="k">const</span> demo = <span class="fn">createParticleSystemController</span>({ canvas, fpsLabel });<br>
    <span class="fn">demo.start</span>();<br>
    <span class="fn">button.addEventListener</span>(<span class="s">'click'</span>, demo.toggle);<br>
    <span class="fn">burstBtn.addEventListener</span>(<span class="s">'click'</span>, demo.burst);
  `,
  "ripple wave": `
    <span class="k">const</span> ripple = <span class="fn">createRippleWaveController</span>({ canvas });<br>
    <span class="fn">button.addEventListener</span>(<span class="s">'click'</span>, ripple.toggle);<br>
    <span class="c">// internally: requestAnimationFrame(loop) + stacked sine waves</span>
  `,
  "noise field": `
    <span class="k">const</span> noise = <span class="fn">createNoiseFieldController</span>({ canvas });<br>
    <span class="fn">button.addEventListener</span>(<span class="s">'click'</span>, noise.toggle);<br>
    <span class="c">// flow field loop uses sin/cos to steer particles</span>
  `,
  "rAF game loop": `
    <span class="k">let</span> prev = 0;<br>
    <span class="k">function</span> <span class="fn">loop</span>(ts) {<br>
    &nbsp;&nbsp;<span class="k">const</span> dt = (ts - prev) / <span class="v">1000</span>;&nbsp;&nbsp;<span class="c">// delta giây</span><br>
    &nbsp;&nbsp;prev = ts;<br>
    &nbsp;&nbsp;x += speed * dt;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// dt-based movement</span><br>
    &nbsp;&nbsp;<span class="fn">requestAnimationFrame</span>(loop);<br>
    }<br>
    <span class="fn">requestAnimationFrame</span>(loop);
  `,
};

export { canvasTabs, panelTabsCode };
export type { CanvasTab }
