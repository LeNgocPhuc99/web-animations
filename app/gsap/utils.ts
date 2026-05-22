import { gsapLessons } from "./data";

import type { GSAPLessonId } from "./types";

export function lessonById(id: GSAPLessonId) {
  return gsapLessons.find((lesson) => lesson.id === id);
}
