const realWorldTabs = [
  { label: "page entrance", value: "page entrance" },
  { label: "hover card", value: "hover card" },
  { label: "counter", value: "counter" },
  { label: "nav reveal", value: "nav reveal" },
] as const;

type RealWorldTab = (typeof realWorldTabs)[number]["value"];

const panelTabsCode: Record<RealWorldTab, string> = {
  "page entrance": `
    <span class="c">// entrance sequence — fromTo đảm bảo predictable</span><br>
    <span class="k">const</span> tl = gsap.<span class="fn">timeline</span>();<br>
    tl.<span class="fn">fromTo</span>(<span class="s">'#title'</span>, { <span class="p">y</span>:<span class="v">28</span>, <span class="p">opacity</span>:<span class="v">0</span>},{ <span class="p">y</span>:<span class="v">0</span>, <span class="p">opacity</span>:<span class="v">1</span>, <span class="p">duration</span>:<span class="v">0.7</span> })<br>
    &nbsp;&nbsp;.<span class="fn">fromTo</span>(<span class="s">'#sub'</span>, { <span class="p">y</span>:<span class="v">28</span>, <span class="p">opacity</span>:<span class="v">0</span>}, { <span class="p">y</span>:<span class="v">0</span>, <span class="p">opacity</span>:<span class="v">1</span>, <span class="p">duration</span>:<span class="v">0.5</span> }, <span class="s">'-=0.3'</span>)<br>
    &nbsp;&nbsp;.<span class="fn">fromTo</span>(<span class="s">'#btns'</span>, { <span class="p">y</span>:<span class="v">28</span>, <span class="p">opacity</span>:<span class="v">0</span>}, { <span class="p">y</span>:<span class="v"></span>, <span class="p">opacity</span>:<span class="v">1</span>, <span class="p">duration</span>:<span class="v">0.4</span> }, <span class="s">'-=0.2'</span>);
  `,
  "hover card": `
    <span class="c">// GSAP xử lý interrupt tốt hơn CSS transition</span><br>
    el.addEventListener(<span class="s">'mouseenter'</span>, () => {<br>
    &nbsp;&nbsp;<span class="fn">gsap.to</span>(el, { <span class="p">y</span>: <span class="v">-7</span>, <span class="p">scale</span>: <span class="v">1.02</span>, <span class="p">duration</span>: <span class="v">0.35</span>, <span class="p">ease</span>: <span class="s">'back.out(2)'</span> });<br>
    });<br>
    el.addEventListener(<span class="s">'mouseleave'</span>, () => {<br>
    &nbsp;&nbsp;<span class="fn">gsap.to</span>(el, { <span class="p">y</span>: <span class="v">0</span>,  <span class="p">scale</span>: <span class="v">1</span>, <span class="p">duration</span>: <span class="v">0.3</span>, <span class="p">ease</span>: <span class="s">'power2.out'</span> });<br>
    });
  `,
  counter: `
    <span class="c">// animate object thuần — GSAP interpolates value</span><br>
    <span class="k">const</span> obj = { val: <span class="v">0</span> };<br>
    <span class="fn">gsap.to</span>(obj, {<br>
    &nbsp;&nbsp;<span class="p">val</span>: <span class="v">12450</span>, <span class="p">duration</span>: <span class="v">2</span>, <span class="p">ease</span>: <span class="s">'power2.out'</span>,<br>
    &nbsp;&nbsp;<span class="p">onUpdate</span>: () => el.textContent = obj.val.<span class="fn">toLocaleString</span>(<span class="s">'vi'</span>, {maximumFractionDigits:<span class="v">0</span>})<br>
    });
  `,
  "nav reveal": `
    <span class="c">// sidebar/menu reveal với stagger</span><br>
    <span class="fn">gsap.from</span>(<span class="s">'.nav-item'</span>, {<br>
    &nbsp;&nbsp;<span class="p">x</span>: <span class="v">-24</span>, <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">duration</span>: <span class="v">0.4</span>,<br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'power2.out'</span>,<br>
    &nbsp;&nbsp;<span class="p">stagger</span>: <span class="v">0.07</span>,<br>
    &nbsp;&nbsp;<span class="p">clearProps</span>: <span class="s">'all'</span>&nbsp;&nbsp;<span class="c">// clean up sau khi xong</span><br>
    });
  `,
};

const navItems = [
  {
    icon: "📁",
    label: "Projects",
  },
  {
    icon: "🔔",
    label: "Notifications",
  },
  {
    icon: "⚙️",
    label: "Settings",
  },
  {
    icon: "📊",
    label: "Analytics",
  },
  {
    icon: "👤",
    label: "Profile",
  },
];

export { realWorldTabs, panelTabsCode, navItems };

export type { RealWorldTab };
