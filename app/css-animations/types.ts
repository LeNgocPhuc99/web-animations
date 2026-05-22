import { cssAnimationLessons, type CssAnimationLessonId } from "./data";

const cssAnimationLessonIds = cssAnimationLessons.map((lesson) => lesson.id);

export type { CssAnimationLessonId };
export { cssAnimationLessonIds };
