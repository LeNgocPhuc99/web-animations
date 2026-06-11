import type { Route } from "./+types/particle-system";

import ParticleSystemLab from "~/particle-system/ParticleSystemLab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Particle System | Web Animations" },
    {
      name: "description",
      content:
        "Interactive particle system lab for learning Canvas 2D emitters, update loops, and rendering patterns.",
    },
  ];
}

export default function ParticleSystemRoute() {
  return <ParticleSystemLab />;
}
