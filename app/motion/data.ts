export const motionLessons = [
  {
    id: "motion",
    num: "01",
    title: "motion",
    desc: `
    <code>motion.div</code>, <code>motion.span</code>, <code>motion.button</code>... là wrapper của HTML elements. Ba prop cốt lõi: <code>initial</code> (trạng thái bắt đầu), <code>animate</code> (trạng thái đích), <code>transition</code> (cấu hình animation). Đây là building block của mọi animation trong Framer Motion.
    `,
  },
  {
    id: "variants",
    num: "02",
    title: "Variants",
    desc: "",
  },
  {
    id: "animate-presence",
    num: "03",
    title: "AnimatePresence",
    desc: "",
  },
  {
    id: "hooks",
    num: "04",
    title: "Hooks",
    desc: "",
  },
  {
    id: "gestures",
    num: "05",
    title: "Gestures",
    desc: "",
  },
  {
    id: "layout",
    num: "06",
    title: "Layout",
    desc: "",
  },
  {
    id: "best-practices",
    num: "07",
    title: "Best Practices",
    desc: "",
  },
];

export type MotionLesson = (typeof motionLessons)[number];
export type MotionLessonId = MotionLesson["id"];
export type MotionSectionLink = readonly [id: MotionLessonId, label: string];

export const motionSectionLinks = [
  ["motion", "motion"],
  ["variants", "Variants"],
  ["animate-presence", "AnimatePresence"],
  ["hooks", "Hooks"],
  ["gestures", "Gestures"],
  ["layout", "Layout"],
  ["best-practices", "Best Practices"],
] as const satisfies readonly MotionSectionLink[];

export const motionLessonIds = motionLessons.map((lesson) => lesson.id);

export const motionHeroPills = [
  "motion.*",
  "animate / initial / exit",
  "variants",
  "AnimatePresence",
  "useScroll",
  "useTransform",
  "useSpring",
  "drag",
  "layout",
  "layoutId",
];
