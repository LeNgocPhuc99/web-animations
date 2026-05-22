import { lessons, type LessonId } from "./data";

const lessonIds = lessons.map((lesson) => lesson.id);

export type { LessonId };
export { lessonIds };
