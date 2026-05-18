import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Web Animations" },
    { name: "description", content: "Welcome to Web animations lab" },
  ];
}

export default function Home() {
  return <Welcome />;
}
