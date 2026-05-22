import type { ReactNode } from "react";

import { ui } from "~/styles/classes";

import SectionHeader from "./SectionHeader";

interface SectionProps {
  id?: string;
  title: string;
  num?: string | number;
  description?: string;
  children: ReactNode;
}

const Section = ({ id, title, num, description, children }: SectionProps) => {
  return (
    <section className={ui.section} id={id}>
      <SectionHeader title={title} num={num} description={description} />
      {children}
    </section>
  );
};

export default Section;
