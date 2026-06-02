const scrollTriggerTabs = [
  { label: "trigger cơ bản", value: "trigger cơ bản" },
  { label: "scrub", value: "scrub" },
  { label: "markers & debug", value: "markers & debug" },
  { label: "pin", value: "pin" },
] as const;

type ScrollTriggerTab = (typeof scrollTriggerTabs)[number]["value"];

const panelTabsCode: Record<ScrollTriggerTab, string> = {
  "trigger cơ bản": `
    <span class="c">// cần đăng ký plugin trước</span><br>
    <span class="fn">gsap.registerPlugin</span>(ScrollTrigger);<br>
    <br>
    <span class="fn">gsap.from</span>(<span class="s">'.card'</span>, {<br>
    &nbsp;&nbsp;<span class="p">y</span>: <span class="v">40</span>, <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">stagger</span>: <span class="v">0.1</span>,<br>
    &nbsp;&nbsp;<span class="p">scrollTrigger</span>: {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">trigger</span>: <span class="s">'.card'</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// element kích hoạt</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">start</span>:   <span class="s">"top 80%"</span>,&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// trigger khi top của .card đến 80%vh</span><br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">once</span>:    <span class="k">true</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// chỉ trigger 1 lần</span><br>
    &nbsp;&nbsp;}<br>
    });
  `,
  scrub: `
    <span class="c">// scrub: true — animation timeline theo scroll position</span><br>
    <span class="fn">gsap.to</span>(el, {<br>
    &nbsp;&nbsp;<span class="p">x</span>:<span class="v">300</span>, <span class="p">rotation</span>:<span class="v">360</span>, <span class="p">scale</span>:<span class="v">2</span>,<br>
    &nbsp;&nbsp;<span class="p">scrollTrigger</span>: {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">trigger</span>: el,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">start</span>: <span class="s">"top center"</span>,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">end</span>:   <span class="s">"bottom top"</span>,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">scrub</span>: <span class="v">1</span>&nbsp;&nbsp;&nbsp;<span class="c">// số = smoothing giây (0=instant)</span><br>
    &nbsp;&nbsp;}<br>
    });
  `,
  "markers & debug": `
    <span class="p">scrollTrigger</span>: {<br>
    &nbsp;&nbsp;<span class="p">trigger</span>: <span class="s">'.el'</span>,<br>
    &nbsp;&nbsp;<span class="p">start</span>: <span class="s">"top 80%"</span>,&nbsp;&nbsp;<span class="c">// "element-edge viewport-edge"</span><br>
    &nbsp;&nbsp;<span class="p">end</span>:   <span class="s">"bottom 20%"</span>,<br>
    &nbsp;&nbsp;<span class="p">markers</span>: <span class="k">true</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// chỉ dùng khi dev!</span><br>
    &nbsp;&nbsp;<span class="p">id</span>: <span class="s">'my-trigger'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// để debug bằng getById</span><br>
    }
  `,
  pin: `
    <span class="c">// horizontal scroll với pin</span><br>
    <span class="fn">gsap.to</span>(panels, {<br>
    &nbsp;&nbsp;<span class="p">xPercent</span>: <span class="v">-100</span> * (panels.length - <span class="v">1</span>),<br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'none'</span>,<br>
    &nbsp;&nbsp;<span class="p">scrollTrigger</span>: {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">trigger</span>: container,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">pin</span>: <span class="k">true</span>,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">scrub</span>: <span class="v">1</span>,<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">snap</span>: <span class="v">1</span> / (panels.length - <span class="v">1</span>)<br>
    &nbsp;&nbsp;}<br>
    });
  `,
};

const scrollItems = [
  {
    title: `trigger: start "top 80%"`,
    desc: `Animate khi top của element đến 80% chiều cao viewport (từ trên xuống).`,
  },
  {
    title: `toggleClass: "active"`,
    desc: `Thêm/xoá class khi element vào/ra viewport — không cần JS phức tạp.`,
  },
  {
    title: `once: true`,
    desc: `Animation chỉ trigger một lần. Sau đó observer được remove, tiết kiệm memory.`,
  },
  {
    title: `batch() — cho multiple elements`,
    desc: `Thay vì tạo ScrollTrigger riêng cho từng element, batch() xử lý chúng cùng lúc.`,
  },
  {
    title: `callbacks: onEnter, onLeave, onEnterBack`,
    desc: `Chạy code tại từng threshold của scroll — enter, leave, enter back, leave back.`,
  },
];

const scrubDemo = [
  { label: "rotation", id: "sf-rot" },
  { label: "scale", id: "sf-sc" },
  { label: "opacity", id: "sf-op" },
] as const;

const pinData = [
  {
    title: "pin: true",
    titleColor: "--color-gsap",
    desc: "Element bị pin (sticky) trong khi trigger active. Thường dùng cho horizontal scroll sections.",
  },
  {
    title: "pinSpacing: false",
    titleColor: "--color-blue-500",
    desc: "Không thêm space sau element bị pin — dùng khi pin header hoặc sticky sidebar.",
  },
  {
    title: "anticipatePin: 1",
    titleColor: "--color-pink-500",
    desc: "Tránh jitter khi pin bắt đầu — thêm khi thấy element nhảy lúc scroll.",
  },
  {
    title: `pinType: "transform"`,
    titleColor: "--color-yellow-500",
    desc: "Dùng transform thay position:fixed khi element ở trong container có transform.",
  },
];

export { scrollTriggerTabs, panelTabsCode, scrubDemo, scrollItems, pinData };

export type { ScrollTriggerTab };
