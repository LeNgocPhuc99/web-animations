import type { ReactNode } from "react";

import { Section } from "~/components";

import type { LessonId } from "../types";
import { lessonById } from "../utils";

const LessonSection = ({
  id,
  children,
}: {
  id: LessonId;
  children: ReactNode;
}) => {
  const lesson = lessonById(id);

  return (
    <Section
      id={id}
      title={lesson.title}
      num={lesson.num}
      description={lesson.desc}
    >
      {children}
    </Section>
  );
};

export default LessonSection;
