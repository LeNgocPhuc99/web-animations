export const uxProductionLessons = [
  {
    id: "animation-ux",
    num: "01",
    title: "UX cho animation",
    desc: `Animation tốt không phải animation đẹp, mà là animation <code>có mục đích</code>. Mỗi motion cần trả lời: nó giúp người dùng hiểu gì, làm gì, hay cảm thấy gì? Duration, easing và 12 nguyên tắc là công cụ để đạt điều đó.`,
  },
  {
    id: "accessibility",
    num: "02",
    title: "Khả năng truy cập",
    desc: `Animation có thể gây khó chịu cho người dùng có rối loạn tiền đình, động kinh hoặc hạn chế nhận thức. <code>prefers-reduced-motion</code> là media query bắt buộc. ARIA live region giúp screen reader biết khi nội dung thay đổi.`,
  },
  {
    id: "performance",
    num: "03",
    title: "Kiểm tra hiệu năng",
    desc: `Animation ảnh hưởng trực tiếp đến Core Web Vitals: <strong>CLS</strong>, <strong>INP</strong> và <strong>FPS</strong>. Tab Performance của DevTools là công cụ chính để profile và tìm jank.`,
  },
  {
    id: "design-system",
    num: "04",
    title: "Hệ thống motion",
    desc: `Animation cần được chuẩn hoá như màu sắc hoặc typography. Thang duration, thang easing và các pattern phản hồi giúp team giữ motion nhất quán trong production.`,
  },
] as const;

export type UxProductionLesson = (typeof uxProductionLessons)[number];
export type UxProductionLessonId = UxProductionLesson["id"];
export type UxSectionLink = readonly [id: UxProductionLessonId, label: string];

export const uxSectionLinks = [
  ["animation-ux", "UX cho animation"],
  ["accessibility", "Khả năng truy cập"],
  ["performance", "Hiệu năng"],
  ["design-system", "Hệ thống motion"],
] as const satisfies readonly UxSectionLink[];

export const uxSectionIds = uxProductionLessons.map((lesson) => lesson.id);

export const uxHeroPills = [
  "motion có mục đích",
  "12 nguyên tắc",
  "prefers-reduced-motion",
  "ARIA live",
  "CLS · INP · FPS",
  "phân tích DevTools",
  "token thời lượng",
  "thang easing",
  "motion design system",
] as const;

export const uxPurposefulItems = [
  {
    label: "phản hồi khi đổi trạng thái",
    note: "Motion nên giải thích điều gì đã thay đổi.",
  },
  {
    label: "chỉ báo tải",
    note: "Dùng motion để thể hiện tiến trình, không phải để trang trí.",
  },
  {
    label: "phản hồi lỗi",
    note: "Chỉ rung hoặc highlight khi nó thực sự giúp người dùng sửa lỗi.",
  },
] as const;

export const uxDecorativeItems = [
  {
    label: "xoay vô hạn",
    note: "Không có nhiệm vụ, không có ý nghĩa, không có điểm dừng.",
  },
  {
    label: "nảy ngẫu nhiên",
    note: "Chuyển động không mang thông tin chỉ tạo ra nhiễu.",
  },
  {
    label: "quá nhiều chuyển động",
    note: "Nhiều motion hơn không đồng nghĩa với rõ ràng hơn.",
  },
] as const;

export const uxDurationRows = [
  ["< 150ms", "Micro-interaction: nhấn nút, checkbox, ripple."],
  ["150-400ms", "Transition UI: modal, drawer, tooltip."],
  ["400-800ms", "Transition trang hoặc hero với cảm giác có chủ đích."],
] as const;

export const uxPrinciples = [
  ["Squash & Stretch", "Tạo cảm giác khối lượng và năng lượng. Hợp với trạng thái UI vui nhộn."],
  ["Anticipation", "Chuẩn bị cho người dùng trước thay đổi tiếp theo."],
  ["Follow Through", "Giữ motion có cảm giác vật lý khi nó dừng lại."],
  ["Ease In/Out", "Khiến transition bớt máy móc."],
  ["Timing", "Điều khiển nhịp, mức độ khẩn cấp và mức độ quan trọng được cảm nhận."],
  ["Staging", "Dẫn sự chú ý vào đúng phần tử."],
] as const;

export const uxFeedbackPatterns = [
  ["Đang tải", "Spinner, skeleton hoặc progress bar. Không để màn hình im lặng."],
  ["Thành công", "Phóng to nhẹ, đổi màu hoặc xác nhận tinh tế."],
  ["Lỗi", "Rung nhẹ, đổi border hoặc hiển thị thông báo ngắn inline."],
  ["Nguy hiểm", "Tạm dừng và xác nhận. Không tự động animate các hành động phá huỷ."],
] as const;

export const uxReducedMotionSnippet = `<span class="k">@media</span> (prefers-reduced-motion: reduce) {
  <span class="k">*</span>, <span class="k">*</span>::before, <span class="k">*</span>::after {
    <span class="p">animation-duration</span>: <span class="v">0.01ms</span> !important;
    <span class="p">transition-duration</span>: <span class="v">0.01ms</span> !important;
  }
}`;

export const uxAriaSnippet = `&lt;<span class="t">div</span> <span class="p">aria-live</span>=<span class="s">"polite"</span>&gt;{count} items&lt;/<span class="t">div</span>&gt;
&lt;<span class="t">div</span> <span class="p">role</span>=<span class="s">"status"</span> <span class="p">aria-live</span>=<span class="s">"assertive"</span>&gt;Saved&lt;/<span class="t">div</span>&gt;`;

export const uxPerformanceSnippet = `<span class="k">new</span> <span class="fn">PerformanceObserver</span>((list) => {
  <span class="c">// inspect layout shifts or long tasks</span>
});`;

export const uxMotionTokens = [
  ["--dur-instant", "50ms"],
  ["--dur-fast", "100ms"],
  ["--dur-normal", "200ms"],
  ["--dur-moderate", "300ms"],
  ["--dur-slow", "500ms"],
  ["--ease-standard", "cubic-bezier(0.4, 0, 0.2, 1)"],
] as const;

