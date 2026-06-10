export const advAnimationLessons = [
  {
    id: "svg",
    num: "01",
    title: "SVG Animation",
    desc: `SVG animation là backbone của icon animations, data visualizations, và logo reveals. Ba technique quan trọng nhất: <strong>stroke-dasharray/dashoffset</strong> (draw-on effect), <strong>path morphing</strong> (shape transform), và <strong>clip-path</strong> (reveal transitions).`,
  },
  {
    id: "canvas",
    num: "02",
    title: "Canvas & RAF",
    desc: "Canvas API vẽ trực tiếp lên bitmap — phù hợp cho particle systems, game loops, và generative art. <code>requestAnimationFrame</code> đồng bộ với browser refresh (60fps). Performance tốt hơn DOM cho số lượng lớn objects.",
  },
  {
    id: "waapi",
    num: "03",
    title: "Web Animation API",
    desc: `WAAPI là browser-native API: không cần library, run on compositor thread (như CSS), nhưng có programmable control như GSAP. Tốt cho interactive animations cần <code>pause/reverse/seek</code> mà không muốn thêm dependency.`,
  },
  {
    id: "bestpractices",
    num: "07",
    title: "Best Practices",
    desc: `Chọn đúng công cụ, tối ưu hiệu năng ở quy mô lớn, và mental model cho animation production.`,
  },
] as const;

export type AdvAnimationLesson = (typeof advAnimationLessons)[number];
export type AdvAnimationLessonId = AdvAnimationLesson["id"];
export type AdvSectionLink = readonly [id: AdvAnimationLessonId, label: string];

export const advSectionLinks = [
  ["svg", "SVG Animation"],
  ["canvas", "Canvas & RAF"],
  ["waapi", "Web Animation API"],
  ["bestpractices", "Best Practices"],
] as const satisfies readonly AdvSectionLink[];

export const advSectionIds = advAnimationLessons.map((lesson) => lesson.id);

export const advAnimationPill = [
  "stroke-dasharray",
  "SVG morphing",
  "clip-path",
  "requestAnimationFrame",
  "Canvas particles",
  "WAAPI",
];
