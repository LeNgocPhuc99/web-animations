import { cssAnimationLessons } from "./data";

import type { CssAnimationLessonId } from "./data";

export function lessonById(id: CssAnimationLessonId) {
  return cssAnimationLessons.find((lesson) => lesson.id === id)!;
}
