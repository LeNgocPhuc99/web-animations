import { advAnimationLessons } from "./data";
import type { AdvAnimationLessonId } from "./data";

export function lessonById(id: AdvAnimationLessonId) {
  return advAnimationLessons.find((lesson) => lesson.id === id)!;
}
