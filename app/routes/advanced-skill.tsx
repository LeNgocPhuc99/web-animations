import type { Route } from "./+types/advanced-skill";

import AdvAnimationLabs from "~/adv-animation/AdvAnimationLabs";
import ComingSoonPage from "~/coming-soon/ComingSoonPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Advanced Skill | Web Animations" },
    {
      name: "description",
      content: "Advanced web animation patterns and debugging techniques.",
    },
  ];
}

export default function AdvancedSkillRoute() {
  return (
    <AdvAnimationLabs />
  );
}
