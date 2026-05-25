import type { ReactNode } from "react";

import { ui } from "~/styles/classes";

import SectionHeader from "./SectionHeader";

interface SectionProps {
  id?: string;
  title: string;
  num?: string | number;
  description?: string;
  children: ReactNode;
  styles?: {
    titleClass?: string;
    numClass?: string;
    descClass?: string;
  };
}

const Section = ({
  id,
  title,
  num,
  description,
  children,
  styles,
}: SectionProps) => {
  return (
    <section className={ui.section} id={id}>
      <SectionHeader
        num={num}
        title={title}
        styles={styles}
        description={description}
      />
      {children}
    </section>
  );
};

export default Section;
