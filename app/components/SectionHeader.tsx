import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  num?: string | number;
  styles?: {
    titleClass?: string;
    numClass?: string;
    descClass?: string;
  };
}

const SectionHeader = ({
  title,
  num,
  description,
  styles,
}: SectionHeaderProps) => {
  const { titleClass, numClass, descClass } = styles ?? {};
  return (
    <>
      <div className={ui.sectionLabel}>
        {num !== undefined && (
          <span className={cn(ui.sectionNum, numClass)}>{num}</span>
        )}
        <h2 className={cn(ui.sectionTitle, titleClass)}>{title}</h2>
      </div>
      {description && (
        <p
          className={cn(ui.sectionDesc, descClass)}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
    </>
  );
};

export default SectionHeader;
