import type { Route } from "./+types/motion";

import MotionLab from "~/motion/MotionLab";

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
  return <MotionLab />;
}
