import { motionLessons } from "./data";
import type { MotionLessonId } from "./data";

export function lessonById(id: MotionLessonId) {
  return motionLessons.find((lesson) => lesson.id === id)!;
}
