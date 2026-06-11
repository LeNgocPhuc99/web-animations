import { uxProductionLessons } from "./data";
import type { UxProductionLessonId } from "./data";

export function lessonById(id: UxProductionLessonId) {
  return uxProductionLessons.find((lesson) => lesson.id === id)!;
}

