import type { ReactNode } from "react";
import { Section } from "~/components";

import { lessonById } from "../utils";
import type { AdvAnimationLessonId } from "../data";

const AdvAnimationSection = ({
  id,
  children,
}: {
  id: AdvAnimationLessonId;
  children: ReactNode;
}) => {
  const lesson = lessonById(id);
  return (
    <Section
      id={id}
      title={lesson.title}
      styles={{
        numClass: "text-adv/75",
      }}
      description={lesson.desc}
    >
      {children}
    </Section>
  );
};

export default AdvAnimationSection;
