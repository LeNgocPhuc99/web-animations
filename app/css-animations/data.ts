export const timings = [
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "cubic-bezier(0.34,1.56,0.64,1)",
] as const;

export const sectionLinks = [
  ["transitions", "Transition"],
  ["keyframes", "Keyframes"],
  ["transform", "Transform"],
  ["timing", "Timing"],
  ["stagger", "Stagger"],
  ["scroll", "Scroll"],
  ["performance", "Performance"],
  ["micro", "Micro"],
  ["loading", "Loading"],
] as const;

export const lessons = [
  {
    id: "transitions",
    num: "01",
    title: "CSS Transitions",
    desc: "<code>transition</code> tạo animation khi property thay đổi, ví dụ hover hoặc đổi class. Cú pháp cốt lõi là <code>property duration timing delay</code>.",
  },
  {
    id: "keyframes",
    num: "02",
    title: "@keyframes Animation",
    desc: "<code>@keyframes</code> định nghĩa nhiều bước animation. Dùng khi animation cần tự chạy, lặp lại, hoặc không phụ thuộc trực tiếp vào hover.",
  },
  {
    id: "transform",
    num: "03",
    title: "CSS Transform",
    desc: "<code>transform</code> là nền tảng của animation mượt. Ưu tiên <code>translate</code>, <code>scale</code>, <code>rotate</code> thay cho <code>left/top/width</code>.",
  },
  {
    id: "timing",
    num: "04",
    title: "Timing Functions",
    desc: "Timing function quyết định cảm giác chuyển động. Cùng duration nhưng <code>linear</code>, <code>ease-out</code>, và spring curve cho cảm nhận rất khác nhau.",
  },
  {
    id: "stagger",
    num: "05",
    title: "Stagger Animation",
    desc: "Stagger là delay tăng dần giữa các phần tử. CSS làm được bằng delay theo index; GSAP biến nó thành option <code>stagger</code> rất gọn.",
  },
  {
    id: "scroll",
    num: "06",
    title: "Scroll-triggered Animation",
    desc: "Dùng <code>IntersectionObserver</code> để trigger animation khi element xuất hiện trong viewport. Đây là bước đệm tốt trước khi học GSAP ScrollTrigger.",
  },
  {
    id: "performance",
    num: "07",
    title: "Performance",
    desc: "Animation tốt thường chỉ thay đổi <code>transform</code> và <code>opacity</code>. Animate layout property dễ gây reflow và làm rơi frame.",
  },
  {
    id: "micro",
    num: "08",
    title: "Micro-interactions",
    desc: "Những animation nhỏ tạo feedback tức thì: hover, toggle, like, focus, ripple. Đây là nhóm pattern dùng rất nhiều trong UI thực tế.",
  },
  {
    id: "loading",
    num: "09",
    title: "Loading States",
    desc: "Loading animation giúp người dùng hiểu hệ thống đang xử lý. Skeleton thường tốt hơn spinner vì giữ bố cục ổn định.",
  },
] as const;

export const staggerBars = [80, 50, 110, 65, 90, 45, 100, 75] as const;
export const staggerWords = [
  "Animation",
  "is",
  "how",
  "interfaces",
  "come",
  "to",
  "life.",
] as const;

export const scrollConcepts = [
  [
    "Concept 01: Translate + Fade",
    "Element trượt vào từ trái, đồng thời opacity tăng từ 0 lên 1.",
  ],
  [
    "Concept 02: Staggered reveal",
    "Mỗi card có delay khác nhau để tạo cảm giác từng item xuất hiện theo lượt.",
  ],
  [
    "Concept 03: Spring easing",
    "Dùng cubic-bezier(0.34, 1.56, 0.64, 1) để có overshoot nhẹ.",
  ],
  [
    "Concept 04: Intersection threshold",
    "Có thể cấu hình bao nhiêu phần tử vào viewport thì trigger animation.",
  ],
  [
    "Concept 05: Once or repeat",
    "Có thể animate một lần hoặc lặp lại mỗi lần scroll qua.",
  ],
] as const;
