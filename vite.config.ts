import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  ssr: {
    // Bundle gsap into the server output instead of leaving it as a
    // runtime `node_modules` import. Vercel's Node runtime fails to
    // resolve `gsap/ScrollTrigger`'s named export at runtime
    // (FUNCTION_INVOCATION_FAILED), so let Rollup resolve/inline it at
    // build time instead.
    noExternal: ["gsap", "@gsap/react"],
  },
});
