import { useState } from "react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { cn } from "~/lib/utils";

import { tweenTabs, tweenPanelCode, type TweenTab } from "./data";

import "./tween.css";

const TweenSection = () => {
  const [activeTab, setActiveTab] = useState<TweenTab>("gsap.from()");
  
  return <div>TweenSection</div>;
};

export default TweenSection;
