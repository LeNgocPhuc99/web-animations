import type { Route } from "./+types/css-animations";

import CSSAnimationsLab from "~/css-animations/CSSAnimationsLab";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CSS Animation Lab" },
    {
      name: "description",
      content: "Interactive CSS animation demos before learning GSAP.",
    },
  ];
}

export default function CssAnimationsRoute() {
  return <CSSAnimationsLab />;
}
