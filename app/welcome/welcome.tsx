import { Link } from "react-router";

export function Welcome() {
  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-5 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-medium text-teal-800 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-200">
              Web Animations
            </span>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-medium text-amber-800 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200">
              Learning Roadmap
            </span>
          </div>
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-semibold tracking-normal sm:text-5xl">
              Animation practice lab
            </h1>
          </div>
        </header>

        <nav aria-label="Project pages" className="grid gap-4 sm:grid-cols-2">
          {pages.map((page) => (
            <Link
              key={page.href}
              to={page.href}
              className="group flex min-h-44 flex-col justify-between rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-teal-700 dark:focus:ring-offset-zinc-950"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-md bg-zinc-100 px-2.5 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                    {page.step}
                  </span>
                  <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                    {page.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold">{page.title}</h2>
                  <p className="leading-7 text-zinc-600 dark:text-zinc-300">
                    {page.description}
                  </p>
                </div>
              </div>
              <span className="mt-6 text-sm font-semibold text-zinc-950 group-hover:text-teal-700 dark:text-zinc-50 dark:group-hover:text-teal-300">
                Open page
              </span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}

const pages = [
  {
    step: "01",
    title: "CSS Animation",
    href: "/css-animations",
    status: "Ready",
    description:
      "Nen tang transition, transform, keyframes, loading, scroll effects va performance voi CSS.",
  },
  {
    step: "02",
    title: "GSAP",
    href: "/gsap",
    status: "Ready",
    description:
      "Timeline, sequencing, scroll-driven animation va cac workflow phuc tap bang GSAP.",
  },
  {
    step: "03",
    title: "Motion",
    href: "/motion",
    status: "Ready",
    description:
      "Framer Motion patterns cho React: variants, layout animation, gestures va page transitions.",
  },
  {
    step: "04",
    title: "Advanced Skill",
    href: "/advanced-skill",
    status: "Ready",
    description:
      "Ky thuat nang cao: orchestration, state-driven animation, reusable patterns va debugging.",
  },
  {
    step: "05",
    title: "UX & Production",
    href: "/ux-production",
    status: "Next",
    description:
      "Accessibility, reduced motion, performance budgets va checklist khi ship animation that.",
  },
];
