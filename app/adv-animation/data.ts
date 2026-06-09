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
    id: "integration",
    num: "04",
    title: "Framework Integration",
    desc: `Mỗi framework có cách tích hợp animation riêng — React cần cleanup, Next.js cần handle SSR, Vue có transition system built-in. Pattern cốt lõi: <strong>animate sau khi DOM sẵn sàng, cleanup khi component destroy</strong>.`,
  },
  {
    id: "bestpractices",
    num: "05",
    title: "Best Practices",
    desc: `Picking the right tool, performance at scale, và mental models cho production animation.`,
  },
] as const;

export type AdvAnimationLesson = (typeof advAnimationLessons)[number];
export type AdvAnimationLessonId = AdvAnimationLesson["id"];
export type AdvSectionLink = readonly [id: AdvAnimationLessonId, label: string];

export const advSectionLinks = [
  ["svg", "SVG Animation"],
  ["canvas", "Canvas & RAF"],
  ["waapi", "Web Animation API"],
  ["integration", "Framework Integration"],
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
