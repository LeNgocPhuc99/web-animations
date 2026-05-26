import { cn } from "~/lib/utils";

import type { EaseFamilyCardData, EasingFamily } from "./data";

interface EasingFamilyCardProps extends EaseFamilyCardData {
  isActive?: boolean;
  onSelect?: (family: EasingFamily) => void;
}

const EasingFamilyCard = ({
  desc,
  name,
  family,
  isActive,
  onSelect,
}: EasingFamilyCardProps) => {
  return (
    <div
      className={cn("ease-fam", isActive && "active")}
      onClick={() => onSelect?.(family)}
    >
      <div className="ef-name">{name}</div>
      <div className="ef-desc">{desc}</div>
    </div>
  );
};

export default EasingFamilyCard;
