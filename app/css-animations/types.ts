import { lessons } from "./data";

const lessonIds = lessons.map((lesson) => lesson.id);

type LessonId = (typeof lessons)[number]["id"];

export type { LessonId };
export { lessonIds };
