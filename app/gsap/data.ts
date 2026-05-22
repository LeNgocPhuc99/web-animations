export const gsapLessons = [
  {
    id: "tween",
    num: "01",
    title: "Tween",
    decs: "",
  },
  {
    id: "properties",
    num: "02",
    title: "Properties",
    decs: "",
  },
  {
    id: "easing",
    num: "03",
    title: "Easing",
    decs: "",
  },
  {
    id: "callbacks",
    num: "04",
    title: "Callbacks",
    decs: "",
  },
  {
    id: "stagger",
    num: "05",
    title: "Stagger",
    decs: "",
  },
  {
    id: "overwrite",
    num: "06",
    title: "Overwrite",
    decs: "",
  },
  {
    id: "real-world",
    num: "07",
    title: "Real World",
    decs: "",
  },
  {
    id: "timeline",
    num: "08",
    title: "Timeline",
    decs: "",
  },
  {
    id: "context",
    num: "09",
    title: "Context",
    decs: "",
  },
  {
    id: "scroll-trigger",
    num: "10",
    title: "ScrollTrigger",
    decs: "",
  },
  {
    id: "best-practices",
    num: "11",
    title: "Best Practices",
    decs: "",
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
