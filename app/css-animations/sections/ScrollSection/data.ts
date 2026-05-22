const scrollPanelCode = `
          <span class="k">const</span> obs = <span class="k">new</span> <span class="p">IntersectionObserver</span>((entries) => {<br>
          &nbsp;&nbsp;entries.forEach(e => e.target.classList.toggle(<span class="v">"visible"</span>, e.isIntersecting));<br>
          }, { <span class="p">threshold</span>: <span class="v">0.25</span>, <span class="p">root</span>: scrollContainer });
        `;

export { scrollPanelCode };
