import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("css-animations", "routes/css-animations.tsx"),
  route("gsap", "routes/gsap.tsx"),
  route("motion", "routes/motion.tsx"),
  route("advanced-skill", "routes/advanced-skill.tsx"),
  route("ux-production", "routes/ux-production.tsx"),
] satisfies RouteConfig;
