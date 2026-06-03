import type { ReactNode } from "react";
import { Section } from "~/components";

import { lessonById } from "../utils";
import type { MotionLessonId } from "../data";

const MotionSectionWrapper = ({
  id,
  children,
}: {
  id: MotionLessonId;
  children: ReactNode;
}) => {
  const lesson = lessonById(id);
  return (
    <Section
      id={id}
      title={lesson.title}
      styles={{
        numClass: "text-motion/75",
      }}
      description={lesson.desc}
    >
      {children}
    </Section>
  );
};

export default MotionSectionWrapper;
