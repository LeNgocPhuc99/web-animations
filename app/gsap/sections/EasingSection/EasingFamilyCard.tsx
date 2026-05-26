import { cn } from "~/lib/utils";

interface EasingFamilyCardProps {
  title: string;
  desc: string;
  isActive?: boolean;
}

const EasingFamilyCard = ({ title, desc, isActive }: EasingFamilyCardProps) => {
  return (
    <div className={cn("ease-fam", isActive && "active")}>
      <div className="ef-name">{title}</div>
      <div className="ef-desc">{desc}</div>
    </div>
  );
};

export default EasingFamilyCard;
