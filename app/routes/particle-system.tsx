import type { Route } from "./+types/particle-system";

import ParticleSystemLab from "~/particle-system/ParticleSystemLab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Hệ hạt | Web Animations" },
    {
      name: "description",
      content:
        "Phòng thí nghiệm tương tác về hệ hạt để học emitter Canvas 2D, vòng lặp update và các mẫu render.",
    },
  ];
}

export default function ParticleSystemRoute() {
  return <ParticleSystemLab />;
}
