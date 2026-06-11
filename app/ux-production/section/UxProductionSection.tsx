import type { ReactNode } from "react";
import { Section } from "~/components";

import { lessonById } from "../utils";
import type { UxProductionLessonId } from "../data";

const UxProductionSection = ({
  id,
  children,
}: {
  id: UxProductionLessonId;
  children: ReactNode;
}) => {
  const lesson = lessonById(id);

  return (
    <Section id={id} num={lesson.num} title={lesson.title} description={lesson.desc}>
      {children}
    </Section>
  );
};

export default UxProductionSection;

