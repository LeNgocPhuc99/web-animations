import { ui } from "~/styles/classes";

interface SectionHeaderProps {
  title: string;
  num?: string | number;
  description?: string;
}

const SectionHeader = ({ title, num, description }: SectionHeaderProps) => {
  return (
    <>
      <div className={ui.sectionLabel}>
        {num !== undefined && <span className={ui.sectionNum}>{num}</span>}
        <h2 className={ui.sectionTitle}>{title}</h2>
      </div>
      {description && (
        <p
          className={ui.sectionDesc}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </>
  );
};

export default SectionHeader;
