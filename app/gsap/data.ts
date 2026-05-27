export const gsapLessons = [
  {
    id: "tween",
    num: "01",
    title: "Tween",
    desc: "Ba hàm cốt lõi của GSAP. <code>to()</code> animate từ trạng thái hiện tại đến target. <code>from()</code> animate từ target về trạng thái hiện tại. <code>fromTo()</code> kiểm soát cả điểm đầu lẫn điểm cuối — không phụ thuộc trạng thái CSS.",
  },
  {
    id: "properties",
    num: "02",
    title: "Properties",
    desc: "GSAP dùng shorthand riêng cho transform: <code>x</code>, <code>y</code>, <code>rotation</code>, <code>scale</code> thay vì viết cả chuỗi <code>transform: ...</code>. Ngoài ra còn hỗ trợ animate bất kỳ CSS property, attribute, và cả object thuần.",
  },
  {
    id: "easing",
    num: "03",
    title: "Easing",
    desc: "GSAP có hệ thống ease phong phú hơn CSS nhiều lần. Mỗi family có 3 variant: <code>.in</code>, <code>.out</code>, <code>.inOut</code>. Một số ease nhận parameter để tinh chỉnh cường độ.",
  },
  {
    id: "callbacks",
    num: "04",
    title: "Callbacks",
    desc: "GSAP tween là object có thể lưu vào biến — từ đó <code>pause()</code>, <code>resume()</code>, <code>reverse()</code>, <code>seek()</code>, và nhận callbacks tại mỗi giai đoạn vòng đời animation.",
  },
  {
    id: "stagger",
    num: "05",
    title: "Stagger",
    desc: "",
  },
  {
    id: "overwrite",
    num: "06",
    title: "Overwrite",
    desc: "",
  },
  {
    id: "real-world",
    num: "07",
    title: "Real World",
    desc: "",
  },
  {
    id: "timeline",
    num: "08",
    title: "Timeline",
    desc: "",
  },
  {
    id: "context",
    num: "09",
    title: "Context",
    desc: "",
  },
  {
    id: "scroll-trigger",
    num: "10",
    title: "ScrollTrigger",
    desc: "",
  },
  {
    id: "best-practices",
    num: "11",
    title: "Best Practices",
    desc: "",
  },
];

export type GSAPLesson = (typeof gsapLessons)[number];
export type GSAPLessonId = GSAPLesson["id"];
export type GSAPSectionLink = readonly [id: GSAPLessonId, label: string];

export const gsapSectionLinks = [
  ["tween", "Tween"],
  ["properties", "Properties"],
  ["easing", "Easing"],
  ["callbacks", "Callbacks"],
  ["stagger", "Stagger"],
  ["overwrite", "Overwrite"],
  ["real-world", "Real World"],
  ["timeline", "Timeline"],
  ["context", "Context"],
  ["scroll-trigger", "ScrollTrigger"],
  ["best-practices", "Best Practices"],
] as const satisfies readonly GSAPSectionLink[];
