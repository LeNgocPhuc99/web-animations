import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("css-animations", "routes/css-animations.tsx"),
] satisfies RouteConfig;
