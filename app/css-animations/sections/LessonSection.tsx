import type { ReactNode } from "react";

import type { LessonId } from "../types";

import { ui } from "../classes";

import { SectionHeader } from "../components";

const LessonSection = ({
  id,
  children,
}: {
  id: LessonId;
  children: ReactNode;
}) => {
  return (
    <section className={ui.section} id={id}>
      <SectionHeader id={id} />
      {children}
    </section>
  );
};

export default LessonSection;
