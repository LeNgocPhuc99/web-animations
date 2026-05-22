const staggerPanelCode = `
          <span class="c">/* CSS: delay tăng theo index */</span><br>
          <span class="k">.bar</span>:nth-child(n) { <span class="p">transition-delay</span>: <span class="v">calc(n * 0.06s)</span>; }<br>
          <span class="c">/* GSAP: */</span> gsap.to(".bar", { <span class="p">stagger</span>: <span class="v">0.06</span>, scaleY: <span class="v">1</span> });
        `;

export { staggerPanelCode };
