const ldPanelCode = `
          <span class="k">.skel</span> { <span class="p">position</span>: relative; <span class="p">overflow</span>: hidden; }<br>
          <span class="k">.skel::after</span> {<br>
          &nbsp;&nbsp;<span class="p">content</span>: ""; <span class="p">position</span>: absolute; <span class="p">inset</span>: 0;<br>
          &nbsp;&nbsp;<span class="p">transform</span>: translateX(-100%);<br>
          &nbsp;&nbsp;<span class="p">background</span>: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);<br>
          &nbsp;&nbsp;<span class="p">animation</span>: <span class="v">shimmer 1.6s infinite</span>;<br>
          &nbsp;&nbsp;<span class="p">will-change</span>: transform;<br>
          }<br>
          <span class="k">@keyframes</span> shimmer { <span class="v">to</span> { <span class="p">transform</span>: translateX(100%); } }
        `;

export { ldPanelCode };
