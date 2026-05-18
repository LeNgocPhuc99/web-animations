import type { Route } from "./+types/motion";

import ComingSoonPage from "~/coming-soon/ComingSoonPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Motion | Web Animations" },
    {
      name: "description",
      content: "Framer Motion lessons and demos for React animation patterns.",
    },
  ];
}

export default function MotionRoute() {
  return (
    <ComingSoonPage
      title="Motion"
      description="Framer Motion examples for variants, layout animation, gestures, and page transitions will live here."
    />
  );
}
