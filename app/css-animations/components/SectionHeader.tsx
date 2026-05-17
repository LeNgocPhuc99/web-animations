import type { LessonId } from "../types";

import { lessonById } from "../utils";

import { ui } from "../classes";

const SectionHeader = ({ id }: { id: LessonId }) => {
  const lesson = lessonById(id);

  return (
    <>
      <div className={ui.sectionLabel}>
        <span className={ui.sectionNum}>{lesson.num}</span>
        <h2 className={ui.sectionTitle}>{lesson.title}</h2>
      </div>
      <p
        className={ui.sectionDesc}
        dangerouslySetInnerHTML={{ __html: lesson.desc }}
      />
    </>
  );
};

export default SectionHeader;
