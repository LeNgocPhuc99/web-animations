import type { ReactNode } from "react";

import { Section } from "~/components";

import type { CssAnimationLessonId } from "../types";
import { lessonById } from "../utils";

const CSSLessonSection = ({
  id,
  children,
}: {
  id: CssAnimationLessonId;
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

export default CSSLessonSection;
