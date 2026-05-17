import { lessons } from "./data";

import type { LessonId } from "./types";

export function lessonById(id: LessonId) {
  return lessons.find((lesson) => lesson.id === id)!;
}
