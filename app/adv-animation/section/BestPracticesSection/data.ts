const bestPracticesTabs = [
  { label: "chọn đúng tool", value: "chọn đúng tool" },
  { label: "hiệu năng ở quy mô lớn", value: "performance at scale" },
  { label: "khả năng truy cập", value: "accessibility" },
] as const;

type BestPracticesTab = (typeof bestPracticesTabs)[number]["value"];

const toolRows = [
  {
    useCase: "Hover/transition đơn giản",
    tool: "CSS transition",
    bundle: "0kb",
    complexity: "⭐",
    note: "Không cần JavaScript",
  },
  {
    useCase: "Loading spinner / skeleton",
    tool: "CSS @keyframes",
    bundle: "0kb",
    complexity: "⭐",
    note: "Thuần CSS",
  },
  {
    useCase: "React UI + gesture + layout",
    tool: "Framer Motion",
    bundle: "34kb",
    complexity: "⭐⭐",
    note: "Phù hợp nhất cho React",
  },
  {
    useCase: "Timeline phức tạp + scroll",
    tool: "GSAP",
    bundle: "30kb",
    complexity: "⭐⭐⭐",
    note: "Mạnh nhất",
  },
  {
    useCase: "Điều khiển bằng JS, không phụ thuộc",
    tool: "WAAPI",
    bundle: "0kb",
    complexity: "⭐⭐",
    note: "Native của trình duyệt",
  },
  {
    useCase: "Animation từ After Effects do designer tạo",
    tool: "Lottie",
    bundle: "60kb",
    complexity: "⭐",
    note: "+ JSON file",
  },
  {
    useCase: "Hơn 100 object DOM được animate",
    tool: "Canvas 2D",
    bundle: "0kb",
    complexity: "⭐⭐⭐",
    note: "Cần rAF",
  },
  {
    useCase: "3D / WebGL / particle art",
    tool: "Three.js",
    bundle: "600kb",
    complexity: "⭐⭐⭐⭐",
    note: "Có thể dùng với React Three Fiber",
  },
  {
    useCase: "Animation icon SVG",
    tool: "CSS / GSAP DrawSVG",
    bundle: "0–30kb",
    complexity: "⭐⭐",
    note: "Thủ thuật dasharray",
  },
  {
    useCase: "10.000+ object được animate",
    tool: "WebGL / Three.js",
    bundle: "600kb",
    complexity: "⭐⭐⭐⭐⭐",
    note: "InstancedMesh",
  },
] as const;

const performanceCards = [
  {
    tone: "tip",
    title: "Đo trước khi tối ưu",
    body: "Mở tab Performance của Chrome DevTools -> record -> tìm long tasks > 50ms. Đừng tối ưu trước khi đo.",
  },
  {
    tone: "tip",
    title: "60fps = 16.6ms/frame",
    body: "Trình duyệt cần <10ms để paint. Giữ JS work <6ms/frame. Batch DOM reads, không xen kẽ read/write.",
  },
  {
    tone: "good",
    title: "GPU layers",
    body: "Đặt will-change: transform trước animation phức tạp. Gỡ sau khi xong. Tránh tạo quá nhiều layer.",
  },
  {
    tone: "good",
    title: "Tách bundle",
    body: "Lazy load Three.js, GSAP plugins. Kích thước bundle ảnh hưởng TTI - animation không chạy trước khi tải xong.",
  },
  {
    tone: "warn",
    title: "Intersection Observer",
    body: "Tạm dừng animation khi phần tử ra khỏi viewport. Đặc biệt quan trọng với Canvas và Three.js - tiết kiệm GPU/CPU.",
  },
  {
    tone: "warn",
    title: "OffscreenCanvas",
    body: "Chuyển render Canvas sang Web Worker để giải phóng main thread. Hỗ trợ Chrome/Firefox, có fallback hợp lý.",
  },
] as const;

const accessibilityCards = [
  {
    tone: "good",
    title: "prefers-reduced-motion",
    body: "Media query bắt buộc. Tắt hoặc đơn giản hóa toàn bộ animation trang trí. Giữ lại các animation phản hồi thiết yếu (loading, progress).",
  },
  {
    tone: "good",
    title: "ARIA live regions",
    body: "Khi animation làm thay đổi nội dung -> dùng aria-live=\"polite\" để screen reader thông báo. Toast notifications, counters, status updates.",
  },
  {
    tone: "warn",
    title: "Flashing content",
    body: "WCAG 2.3.1: không flash nhiều hơn 3 lần/giây. Người dùng bị epilepsy có thể bị kích hoạt. Dùng Photosensitive Epilepsy Analysis Tool.",
  },
  {
    tone: "warn",
    title: "Parallax & vestibular",
    body: "Parallax khi cuộn có thể gây chóng mặt cho người có vestibular disorders. Tắt khi prefers-reduced-motion: reduce.",
  },
  {
    tone: "tip",
    title: "Quản lý focus",
    body: "Animation mở modal -> chuyển focus vào modal. Đóng modal -> trả focus về trigger. AnimatePresence của Framer Motion cần xử lý focus thủ công.",
  },
  {
    tone: "tip",
    title: "Kiểm thử với người dùng thật",
    body: "Các kiểm tra tự động không bắt được hết vấn đề accessibility. Hãy test với VoiceOver (Mac/iOS), NVDA (Windows), TalkBack (Android).",
  },
] as const;

const panelTabsCode: Record<BestPracticesTab, string> = {
  "chọn đúng tool": `
    <span class="c">/* Decision tree: */</span><br>
    <span class="c">// Hover, transition đơn giản? -> CSS</span><br>
    <span class="c">// React UI micro-interactions? -> Framer Motion</span><br>
    <span class="c">// Timeline phức tạp + scroll? -> GSAP</span><br>
    <span class="c">// 1000+ object / game? -> Canvas / WebGL</span><br>
    <span class="c">// 3D? -> Three.js</span><br>
    <span class="c">// Animation do designer tạo? -> Lottie</span><br>
    <span class="c">// Không dùng library + cần control cơ bản? -> WAAPI</span><br><br>
    <span class="k">const</span> TOOL_ROWS = [...];<br>
    <span class="k">const</span> table = document.<span class="fn">getElementById</span>(<span class="s">'toolTable'</span>);<br>
    TOOL_ROWS.<span class="fn">forEach</span>((row) => <span class="c">// render từng dòng vào bảng</span>);
  `,
  "performance at scale": `
    <span class="c">// tạm dừng Three.js khi tab không active</span><br>
    document.<span class="fn">addEventListener</span>(<span class="s">'visibilitychange'</span>, () => {<br>
    &nbsp;&nbsp;document.hidden ? renderer.setAnimationLoop(<span class="k">null</span>) : renderer.<span class="fn">setAnimationLoop</span>(loop);<br>
    });<br><br>
    <span class="c">// tạm dừng Canvas khi ra viewport</span><br>
    <span class="k">const</span> obs = <span class="k">new</span> IntersectionObserver(([e]) => {<br>
    &nbsp;&nbsp;e.isIntersecting ? <span class="fn">startLoop</span>() : <span class="fn">stopLoop</span>();<br>
    });<br>
    obs.<span class="fn">observe</span>(canvas);
  `,
  accessibility: `
    <span class="c">/* mẫu animation tuân thủ WCAG */</span><br>
    <span class="k">@media</span> (prefers-reduced-motion: reduce) {<br>
    &nbsp;&nbsp;*,*::before,*::after {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">animation-duration</span>: <span class="v">0.01ms</span> !important;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">animation-iteration-count</span>: <span class="v">1</span> !important;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;<span class="p">transition-duration</span>: <span class="v">0.01ms</span> !important;<br>
    &nbsp;&nbsp;}<br>
    }
  `,
};

export {
  accessibilityCards,
  bestPracticesTabs,
  panelTabsCode,
  performanceCards,
  toolRows,
};
export type { BestPracticesTab };
