import { lessons } from "./data";

const lessonIds = lessons.map((lesson) => lesson.id);
const heroPills = [
  "transition",
  "@keyframes",
  "transform",
  "cubic-bezier",
  "stagger",
  "scroll-trigger",
  "micro-interactions",
];

type LessonId = (typeof lessons)[number]["id"];

export type { LessonId };
export { heroPills, lessonIds };
