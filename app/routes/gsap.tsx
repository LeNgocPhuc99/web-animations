import type { Route } from "./+types/gsap";

import GSAPLab from "~/gsap/GSAPLab";
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
    <GSAPLab />
  );
}
