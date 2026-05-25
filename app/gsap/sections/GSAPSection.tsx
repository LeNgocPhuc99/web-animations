import type { ReactNode } from "react";

import { Section } from "~/components";

import { lessonById } from "../utils";
import type { GSAPLessonId } from "../types";

const GSAPSection = ({
  id,
  children,
}: {
  id: GSAPLessonId;
  children: ReactNode;
}) => {
  const lesson = lessonById(id);

  return (
    <Section
      id={id}
      title={lesson.title}
      num={lesson.num}
      styles={{
        numClass: "text-gsap/75",
      }}
      description={lesson.desc}
    >
      {children}
    </Section>
  );
};

export default GSAPSection;
