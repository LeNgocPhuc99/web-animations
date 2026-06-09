import { gsapLessons } from "./data";

export function lessonById(id: string) {
  return gsapLessons.find((lesson) => lesson.id === id)!;
}
