import type { Route } from "./+types/gsap";

import ComingSoonPage from "~/coming-soon/ComingSoonPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "GSAP | Web Animations" },
    {
      name: "description",
      content: "GSAP lessons and demos for timeline-based web animations.",
    },
  ];
}

export default function GsapRoute() {
  return (
    <ComingSoonPage
      title="GSAP"
      description="Timeline, sequencing, ScrollTrigger patterns, and production-friendly animation workflows will live here."
    />
  );
}
