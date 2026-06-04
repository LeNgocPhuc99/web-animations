import { cn } from "~/lib/utils";
import { Navbar } from "~/components";
import { useActiveSection } from "~/hooks";
import { pillClass, sidebarLinkClass } from "~/styles/classes";

import {
  motionLessons,
  motionLessonIds,
  motionHeroPills,
  motionSectionLinks,
} from "./data";

// ** sections
import { MotionSection } from "./sections/MotionSection";
import { VariantsSection } from "./sections/VariantsSection";

const MotionLab = () => {
  const activeId = useActiveSection(motionLessonIds);

  return (
    <div className="min-h-screen bg-bg-main font-sans text-sm leading-relaxed text-text-base">
      <Navbar
        links={motionSectionLinks}
        logo="Motion Labs"
        logoColor="bg-motion"
      />
      <main className="mx-auto w-full max-w-295 px-6 pb-18 max-sm:px-4">
        <section className="relative overflow-hidden py-14 text-center">
          <div className="lab-hero-grid absolute inset-0" />
          <div className="relative z-10">
            <div className="lab-fade-0 mb-3.5 font-mono text-xs uppercase tracking-[0.12em] text-motion">
              // framer motion · react animation library
            </div>
            <div className="lab-fade-3 flex flex-wrap justify-center gap-2">
              {motionHeroPills.map((pill) => (
                <span className={pillClass} key={pill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>
        <div className="mt-6 grid grid-cols-[250px_minmax(0,1fr)] items-start gap-8 max-lg:grid-cols-1">
          <aside
            aria-label="Mục lục Motion Animation"
            className="sticky top-21 rounded-lg border border-white/10 bg-bg-main p-3.5 max-lg:static"
          >
            <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
              Learning path
            </p>
            <nav className="lab-section-list grid gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {motionLessons.map((lesson) => (
                <a
                  className={cn(
                    sidebarLinkClass,
                    activeId === lesson.id && "is-active",
                  )}
                  href={`#${lesson.id}`}
                  key={lesson.id}
                >
                  <span className="font-mono text-[10px] text-motion">
                    {lesson.num}
                  </span>
                  {lesson.title}
                </a>
              ))}
            </nav>
          </aside>
          <div className="grid gap-13">
            <MotionSection />
            <VariantsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MotionLab;
