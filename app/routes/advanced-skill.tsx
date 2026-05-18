import type { Route } from "./+types/advanced-skill";

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
    <ComingSoonPage
      title="Advanced Skill"
      description="Orchestration, reusable animation systems, state-driven motion, and debugging workflows will live here."
    />
  );
}
