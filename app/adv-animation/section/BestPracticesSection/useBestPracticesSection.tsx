import { useState } from "react";

import type { BestPracticesTab } from "./data";

const useBestPracticesSection = () => {
  const [activeTab, setActiveTab] = useState<BestPracticesTab>("chọn đúng tool");

  return { activeTab, setActiveTab };
};

export default useBestPracticesSection;
