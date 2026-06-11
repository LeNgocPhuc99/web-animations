import { Navbar } from "~/components";
import { cn } from "~/lib/utils";
import { useActiveSection } from "~/hooks";
import { pillClass, sidebarLinkClass } from "~/styles/classes";

import { uxHeroPills, uxSectionIds, uxSectionLinks } from "./data";
import {
  AccessibilitySection,
  AnimationUxSection,
  DesignSystemSection,
  PerformanceSection,
} from "./section";

const UxProductionLab = () => {
  const activeId = useActiveSection(uxSectionIds);

  return (
    <div className="min-h-screen bg-bg-main font-sans text-sm leading-relaxed text-text-base">
      <Navbar
        links={uxSectionLinks}
        logo="UX & Production"
        logoColor="bg-accent-orange"
      />

      <main className="mx-auto w-full max-w-295 px-6 pb-18 max-sm:px-4">
        <section className="relative overflow-hidden py-14 text-center">
          <div className="lab-hero-grid absolute inset-0" />
          <div className="relative z-10">
            <div className="lab-fade-0 font-mono text-xs uppercase tracking-[0.12em] text-accent-orange">
              // animation cho sản phẩm production
            </div>
            <div className="lab-fade-3 mt-4 flex flex-wrap justify-center gap-2">
              {uxHeroPills.map((pill) => (
                <span className={pillClass} key={pill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-6 grid grid-cols-[250px_minmax(0,1fr)] items-start gap-8 max-lg:grid-cols-1">
          <aside
            aria-label="Mục lục UX Production"
            className="sticky top-21 rounded-lg border border-white/10 bg-bg-main p-3.5 max-lg:static"
          >
            <p className="mb-2.5 font-mono text-xs uppercase tracking-[0.08em] text-text-muted">
              Lộ trình học
            </p>
            <nav className="lab-section-list grid gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {uxSectionLinks.map(([id, label], index) => (
                <a
                  className={cn(
                    sidebarLinkClass,
                    activeId === id && "is-active",
                  )}
                  href={`#${id}`}
                  key={id}
                >
                  <span className="font-mono text-[10px] text-accent-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {label}
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-13">
            <AnimationUxSection />
            <AccessibilitySection />
            <PerformanceSection />
            <DesignSystemSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default UxProductionLab;
