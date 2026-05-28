const staggerTabs = [
  {
    label: "stagger cơ bản",
    value: "stagger cơ bản",
  },
  {
    label: "stagger object",
    value: "stagger object",
  },
  {
    label: "from: center / end",
    value: "from: center / end",
  },
] as const;

const staggerBars = [90, 55, 120, 70, 100, 48, 110, 80];

type StaggerTab = (typeof staggerTabs)[number]["value"];

const panelTabsCode: Record<StaggerTab, string> = {
  "stagger cơ bản": `
    <span class="c">// stagger: số giây delay giữa mỗi phần tử</span><br>
    <span class="fn">gsap.from</span>(<span class="s">'.bar'</span>, {<br>
    &nbsp;&nbsp;<span class="p">scaleY</span>: <span class="v">0</span>, <span class="p">opacity</span>: <span class="v">0</span>, <span class="p">duration</span>: <span class="v">0.6</span>,<br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'back.out(1.5)'</span>,<br>
    &nbsp;&nbsp;<span class="p">stagger</span>: <span class="v">0.07</span>&nbsp;&nbsp;<span class="c">// mỗi bar delay thêm 0.07s</span><br>
    });
  `,
  "stagger object": `
    <span class="c">// stagger object — kiểm soát chi tiết hơn</span><br>
    <span class="p">stagger</span>: {<br>
    &nbsp;&nbsp;<span class="p">each</span>: <span class="v">0.1</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// delay giữa các phần tử</span><br>
    &nbsp;&nbsp;<span class="c">// hoặc:</span><br>
    &nbsp;&nbsp;<span class="p">amount</span>: <span class="v">0.5</span>,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// tổng stagger chia đều cho tất cả</span><br>
    &nbsp;&nbsp;<span class="p">ease</span>: <span class="s">'power2.in'</span>,&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// ease của chính stagger timing</span><br>
    &nbsp;&nbsp;<span class="p">from</span>: <span class="s">'center'</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// điểm bắt đầu stagger</span><br>
    }
  `,
  "from: center / end": `
    <span class="c">// from: chỉ định phần tử nào animate trước</span><br>
    <span class="p">stagger</span>: { <span class="p">each</span>: <span class="v">0.05</span>, <span class="p">from</span>: <span class="s">'start'</span> }&nbsp;&nbsp;<span class="c">// mặc định</span><br>
    <span class="p">stagger</span>: { <span class="p">each</span>: <span class="v">0.05</span>, <span class="p">from</span>: <span class="s">'end'</span> }&nbsp;&nbsp;&nbsp;<span class="c">// ngược lại</span><br>
    <span class="p">stagger</span>: { <span class="p">each</span>: <span class="v">0.05</span>, <span class="p">from</span>: <span class="s">'center'</span> }&nbsp;<span class="c">// từ giữa ra</span><br>
    <span class="p">stagger</span>: { <span class="p">each</span>: <span class="v">0.05</span>, <span class="p">from</span>: <span class="v">7</span> }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="c">// từ index 7</span>
  `,
};

export { staggerTabs, panelTabsCode, staggerBars };
export type { StaggerTab };
