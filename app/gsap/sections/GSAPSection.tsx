import type { ReactNode } from "react";

import { Section } from "~/components";

import type { GSAPLessonId } from "../types";

const GSAPSection = ({
  id,
  children,
}: {
  id: GSAPLessonId;
  children: ReactNode;
}) => {
  return <div>GSAPSection</div>;
};

export default GSAPSection;
