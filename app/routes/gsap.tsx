import type { Route } from "./+types/gsap";

import GSAPLab from "~/gsap/GSAPLab";

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
  return <GSAPLab />;
}
