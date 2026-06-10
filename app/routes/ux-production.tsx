import type { Route } from "./+types/ux-production";

import ComingSoonPage from "~/coming-soon/ComingSoonPage";

import ParticleSystemDemo from "~/particle-system/ParticleSystemDemo";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "UX & Production | Web Animations" },
    {
      name: "description",
      content: "UX, accessibility, and production guidance for web animation.",
    },
  ];
}

export default function UxProductionRoute() {
  return (
    <ParticleSystemDemo initialMode='rain' />
    // <ComingSoonPage
    //   title="UX & Production"
    //   description="Reduced motion, accessibility, performance budgets, and production animation checklists will live here."
    // />
  );
}
