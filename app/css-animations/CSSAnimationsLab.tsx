import { cn } from "~/lib/utils";
import { Navbar } from "~/components";
import { useActiveSection } from "~/hooks";
import { pillClass, sidebarLinkClass } from "~/styles/classes";

// learning section
import { MicroSection } from "./sections/MicroSection";
import { TimingSection } from "./sections/TimingSection";
import { ScrollSection } from "./sections/ScrollSection";
import { LoadingSection } from "./sections/LoadingSection";
import { StaggerSection } from "./sections/StaggerSection";
import { KeyframesSection } from "./sections/KeyframesSection";
import { TransformSection } from "./sections/TransformSection";
import { TransitionsSection } from "./sections/TransitionsSection";
import { PerformanceSection } from "./sections/PerformanceSection";

import { cssAnimationLessonIds } from "./types";
import { cssAnimationLessons, sectionLinks } from "./data";

const heroPills = [
  "transition",
  "@keyframes",
  "transform",
  "cubic-bezier",
  "stagger",
  "scroll-trigger",
  "micro-interactions",
];

const CSSAnimationsLab = () => {
  const activeId = useActiveSection(cssAnimationLessonIds);

  return (
    <div className="min-h-screen bg-bg-main font-sans text-sm leading-relaxed text-text-base">
      <Navbar links={sectionLinks} />
      <main className="mx-auto w-full max-w-295 px-6 pb-18 max-sm:px-4">
        <section className="relative overflow-hidden py-14 text-center">
          <div className="lab-hero-grid absolute inset-0" />
          <div className="relative z-10">
            <div className="lab-fade-0 mb-3.5 font-mono text-xs uppercase tracking-[0.12em] text-primary">
              // css animation foundations
            </div>
            <div className="lab-fade-3 flex flex-wrap justify-center gap-2">
              {heroPills.map((pill) => (
                <span className={pillClass} key={pill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-[250px_minmax(0,1fr)] items-start gap-8 max-lg:grid-cols-1">
          <aside
            aria-label="Mục lục CSS Animation"
            className="sticky top-21 rounded-lg border border-white/10 bg-bg-main p-3.5 max-lg:static"
          >
            <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
              Learning path
            </p>
            <nav className="lab-section-list grid gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {cssAnimationLessons.map((lesson) => (
                <a
                  className={cn(
                    sidebarLinkClass,
                    activeId === lesson.id && "is-active",
                  )}
                  href={`#${lesson.id}`}
                  key={lesson.id}
                >
                  <span className="font-mono text-[10px] text-primary">
                    {lesson.num}
                  </span>
                  {lesson.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-13">
            <TransitionsSection />
            <KeyframesSection />
            <TransformSection />
            <TimingSection />
            <StaggerSection />
            <ScrollSection />
            <PerformanceSection />
            <MicroSection />
            <LoadingSection />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-7 text-center font-mono text-xs text-text-muted">
        Animation Lab · CSS foundations before GSAP
      </footer>
    </div>
  );
};

export default CSSAnimationsLab;
