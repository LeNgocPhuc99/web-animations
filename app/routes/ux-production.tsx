import type { Route } from "./+types/ux-production";

import UxProductionLab from "~/ux-production/UxProductionLab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "UX & Production | Web Animations" },
    {
      name: "description",
      content:
        "Hướng dẫn animation sẵn sàng cho production, tập trung vào UX, accessibility, performance và motion system.",
    },
  ];
}

export default function UxProductionRoute() {
  return <UxProductionLab />;
}
