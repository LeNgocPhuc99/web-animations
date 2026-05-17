import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";

import {
  laneBallClass,
  laneClass,
  laneNameClass,
  laneTrackClass,
  navLinkClass,
  pillClass,
  sidebarLinkClass,
  ui,
} from "./classes";
import {
  lessons,
  scrollConcepts,
  sectionLinks,
  staggerBars,
  staggerWords,
  timings,
} from "./data";
import {
  createRipple,
  useActiveSection,
  useMagneticButton,
  useProgress,
  useScrollReveal,
} from "./interactions";

import {
  LessonSection,
  TimingSection,
  TransformSection,
  TransitionsSection,
} from "./sections";

function StaggerSection() {
  const [runId, setRunId] = useState(0);
  const active = runId > 0;

  return (
    <LessonSection id="stagger">
      <DemoCard
        code={`
          <span class="c">/* CSS: delay tăng theo index */</span><br>
          <span class="k">.bar</span>:nth-child(n) { <span class="p">transition-delay</span>: <span class="v">calc(n * 0.06s)</span>; }<br>
          <span class="c">/* GSAP: */</span> gsap.to(".bar", { <span class="p">stagger</span>: <span class="v">0.06</span>, scaleY: <span class="v">1</span> });
        `}
        action={
          <button
            className={ui.button}
            onClick={() => setRunId((value) => value + 1)}
            type="button"
          >
            Play
          </button>
        }
      >
        <div className={`${ui.demoArea} flex-col gap-6`}>
          <div className={ui.stack}>
            <div className={ui.caption}>bar chart stagger</div>
            <div className="flex items-end gap-2">
              {staggerBars.map((height, index) => (
                <div
                  className="w-8 origin-bottom rounded-t bg-[#5b8dee] transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                  key={`${height}-${index}-${runId}`}
                  style={{
                    height,
                    opacity: active ? 1 : 0,
                    transform: active ? "scaleY(1)" : "scaleY(0)",
                    transitionDelay: `${index * 0.06}s`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1.5 text-2xl font-bold">
            {staggerWords.map((word, index) => (
              <span
                className="inline-block transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                key={`${word}-${runId}`}
                style={{
                  opacity: active ? 1 : 0,
                  transform: active ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 0.08 + 0.6}s`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
}

function ScrollSection() {
  const { itemRefs, rootRef, visibleItems } = useScrollReveal(
    scrollConcepts.length,
  );

  return (
    <LessonSection id="scroll">
      <DemoCard
        code={`
          <span class="k">const</span> obs = <span class="k">new</span> <span class="p">IntersectionObserver</span>((entries) => {<br>
          &nbsp;&nbsp;entries.forEach(e => e.target.classList.toggle(<span class="v">"visible"</span>, e.isIntersecting));<br>
          }, { <span class="p">threshold</span>: <span class="v">0.25</span>, <span class="p">root</span>: scrollContainer });
        `}
      >
        <div className={`${ui.demoArea} p-0`}>
          <div
            className="h-80 w-full overflow-y-auto rounded-md bg-[#1a1a24]"
            ref={rootRef}
          >
            <div className="p-8">
              <div className="flex h-[72px] items-center justify-center">
                <div className={ui.caption}>Cuộn xuống trong khung này</div>
              </div>
              {scrollConcepts.map(([title, copy], index) => (
                <article
                  className={`scroll-item mb-6 translate-x-[-24px] rounded-md border-l-2 border-[#5b8dee] bg-[#111118] px-5 py-4 opacity-0 transition duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${visibleItems.has(index) ? "visible" : ""}`}
                  key={title}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                >
                  <h3 className="mb-1 text-[15px] font-bold text-[#e8e8f0]">
                    {title}
                  </h3>
                  <p className="m-0 text-[13px] text-[#85859a]">{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
}

function PerformanceSection() {
  const [running, setRunning] = useState(false);

  return (
    <LessonSection id="performance">
      <DemoCard
        code={`
          <span class="c">/* Avoid */</span> <span class="p">left</span>: <span class="v">100%</span><br>
          <span class="c">/* Prefer */</span> <span class="p">transform</span>: <span class="v">translateX(300px)</span>
        `}
        action={
          <button
            className={ui.button}
            onClick={() => setRunning((value) => !value)}
            type="button"
          >
            Start / Stop
          </button>
        }
      >
        <div className={ui.demoArea}>
          <div className="grid w-full gap-3.5">
            <div className="font-mono text-[11px] text-[#85859a]">
              Avoid: animate <code>left</code> vì dễ trigger layout reflow
            </div>
            <div className="relative h-20 overflow-hidden rounded-md bg-[#1a1a24]">
              <div
                className={`bad absolute left-0 top-1/2 mt-[-32px] flex h-16 w-16 items-center justify-center rounded-lg border border-[#e24b4a] bg-[#e24b4a44] font-mono text-[10px] text-white ${running ? "moving" : ""}`}
              >
                left
                <span className="absolute -right-2 -top-2 rounded-full bg-[#e24b4a] px-1.5 py-0.5 font-mono text-[9px] text-white">
                  CPU
                </span>
              </div>
            </div>
            <div className="font-mono text-[11px] text-[#85859a]">
              Prefer: animate <code>transform</code> để browser composite tốt
              hơn
            </div>
            <div className="relative h-20 overflow-hidden rounded-md bg-[#1a1a24]">
              <div
                className={`good relative top-1/2 mt-[-32px] flex h-16 w-16 items-center justify-center rounded-lg border border-[#5b8dee] bg-[#5b8dee44] font-mono text-[10px] text-white ${running ? "moving" : ""}`}
              >
                transform
                <span className="absolute -right-2 -top-2 rounded-full bg-[#5beeb4] px-1.5 py-0.5 font-mono text-[9px] text-black">
                  GPU
                </span>
              </div>
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
}

function MagneticButton() {
  const magnetic = useMagneticButton();

  return (
    <button
      className="inline-block cursor-pointer rounded-lg border border-white/15 bg-[#1a1a24] px-7 py-3 font-mono text-[13px] text-[#e8e8f0] transition hover:border-[#5b8dee] hover:bg-[#5b8dee] hover:text-white"
      type="button"
      {...magnetic}
    >
      magnetic
    </button>
  );
}

function MicroSection() {
  const [toggleOn, setToggleOn] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <LessonSection id="micro">
      <DemoCard
        code={`
          <span class="c">/* ripple: tạo element, animate, remove */</span><br>
          <span class="k">const</span> r = document.createElement(<span class="v">"span"</span>);<br>
          btn.appendChild(r); setTimeout(() => r.remove(), <span class="v">700</span>);
        `}
      >
        <div className={ui.demoArea}>
          <div className="flex flex-wrap items-center justify-center gap-7">
            <div className={ui.stack}>
              <MagneticButton />
              <span className={ui.caption}>magnetic hover</span>
            </div>
            <div className={ui.stack}>
              <button
                aria-label="Toggle demo"
                className={`toggle relative h-7 w-[52px] cursor-pointer rounded-full border border-white/15 bg-[#1a1a24] transition ${toggleOn ? "on" : ""}`}
                onClick={() => setToggleOn((value) => !value)}
                type="button"
              >
                <span className="toggle-knob absolute left-0.5 top-0.5 h-[22px] w-[22px] rounded-full bg-[#e8e8f0] shadow transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]" />
              </button>
              <span className={ui.caption}>spring toggle</span>
            </div>
            <div className={ui.stack}>
              <button
                aria-label="Like demo"
                className={`like-btn flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-[#1a1a24] text-xl leading-none text-[#ee5b8d] transition hover:scale-110 ${liked ? "liked" : ""}`}
                onClick={() => setLiked((value) => !value)}
                type="button"
              >
                {liked ? "♥" : "♡"}
              </button>
              <span className={ui.caption}>like button</span>
            </div>
            <div className={ui.stack}>
              <input
                className="w-[200px] rounded-lg border border-white/15 bg-[#1a1a24] px-3.5 py-2.5 text-sm text-[#e8e8f0] outline-none transition focus:-translate-y-px focus:border-[#5b8dee] focus:shadow-[0_0_0_3px_rgba(91,141,238,0.2)]"
                placeholder="focus me..."
                type="text"
              />
              <span className={ui.caption}>focus lift</span>
            </div>
            <div className={ui.stack}>
              <button
                className="relative cursor-pointer overflow-hidden rounded-lg border border-[#5b8dee] bg-transparent px-6 py-2.5 font-mono text-[13px] text-[#5b8dee] transition hover:bg-[#5b8dee14]"
                onClick={createRipple}
                type="button"
              >
                ripple click
              </button>
              <span className={ui.caption}>material ripple</span>
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
}

function LoadingSection() {
  const progress = useProgress();

  return (
    <LessonSection id="loading">
      <DemoCard
        code={`
          <span class="k">@keyframes</span> shimmer {<br>
          &nbsp;&nbsp;<span class="v">from</span> { <span class="p">background-position</span>: <span class="v">200% 0</span>; }<br>
          &nbsp;&nbsp;<span class="v">to</span>&nbsp;&nbsp; { <span class="p">background-position</span>: <span class="v">-200% 0</span>; }<br>
          }
        `}
      >
        <div className={ui.demoArea}>
          <div className="flex flex-wrap items-center justify-center gap-9">
            <div className={ui.stack}>
              <div className="spinner h-10 w-10 rounded-full border-[3px] border-[#1a1a24] border-t-[#5b8dee]" />
              <span className={ui.caption}>spinner</span>
            </div>
            <div className={ui.stack}>
              <div className="flex gap-1.5">
                <div className="dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
                <div className="dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
                <div className="dot h-2.5 w-2.5 rounded-full bg-[#ee5b8d]" />
              </div>
              <span className={ui.caption}>typing dots</span>
            </div>
            <div className={ui.stack}>
              <div className="flex w-[200px] flex-col gap-2">
                <div className="skel h-4 w-full rounded" />
                <div className="skel h-3 w-3/4 rounded" />
                <div className="skel h-3 w-full rounded" />
                <div className="skel h-3 w-1/2 rounded" />
              </div>
              <span className={ui.caption}>skeleton shimmer</span>
            </div>
            <div className={ui.stack}>
              <div className="w-[200px]">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#1a1a24]">
                  <div
                    className="h-full rounded-full bg-[#5beeb4] transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress.value}%` }}
                  />
                </div>
                <div className="mt-1.5 text-center font-mono text-[11px] text-[#85859a]">
                  {Math.round(progress.value)}%
                </div>
              </div>
              <button
                className={ui.button}
                disabled={progress.running}
                onClick={progress.run}
                type="button"
              >
                Run
              </button>
              <span className={ui.caption}>progress bar</span>
            </div>
          </div>
        </div>
      </DemoCard>
    </LessonSection>
  );
}

export function CSSAnimationsLab() {
  const activeId = useActiveSection(lessonIds);

  return (
    <div className="css-lab min-h-screen bg-[#0a0a0f] font-sans text-[15px] leading-relaxed text-[#e8e8f0]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0a0a0fe0] backdrop-blur">
        <div className="mx-auto flex min-h-[60px] max-w-[1180px] items-center justify-between gap-5 px-6 max-md:flex-col max-md:items-start max-md:py-3">
          <Link
            className="flex items-center gap-2.5 whitespace-nowrap text-lg font-extrabold text-[#e8e8f0]"
            to="/"
          >
            <span className="lab-logo-dot h-2 w-2 rounded-full bg-[#5b8dee]" />
            Animation Lab
          </Link>
          <nav
            aria-label="Section nhanh"
            className="lab-top-nav flex gap-1 overflow-x-auto [scrollbar-width:none] max-md:w-full"
          >
            {sectionLinks.map(([id, label]) => (
              <a className={navLinkClass} href={`#${id}`} key={id}>
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-6 pb-18 pt-11 max-sm:px-4">
        <section className="relative overflow-hidden py-14 text-center">
          <div className="lab-hero-grid absolute inset-0" />
          <div className="relative z-10">
            <div className="lab-fade-0 mb-3.5 font-mono text-xs uppercase tracking-[0.12em] text-[#5b8dee]">
              // css animation foundations
            </div>
            <p className="lab-fade-2 mx-auto mb-7 max-w-157.5 text-[17px] text-[#85859a]">
              Mỗi section là một demo tương tác: hover, click, cuộn, stagger và
              loading state. Nền tảng này giúp bạn đọc GSAP dễ hơn khi chuyển
              sang timeline, tween và ScrollTrigger.
            </p>
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
            className="sticky top-21 rounded-lg border border-white/10 bg-[#111118] p-3.5 max-lg:static"
          >
            <p className="mb-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#b7b7c8]">
              Learning path
            </p>
            <nav className="lab-section-list grid gap-1 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {lessons.map((lesson) => (
                <a
                  className={`${sidebarLinkClass} ${activeId === lesson.id ? "is-active" : ""}`}
                  href={`#${lesson.id}`}
                  key={lesson.id}
                >
                  <span className="font-mono text-[10px] text-[#5b8dee]">
                    {lesson.num}
                  </span>
                  {lesson.title}
                </a>
              ))}
            </nav>
          </aside>

          <div className="grid gap-[52px]">
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

      <footer className="border-t border-white/10 px-6 py-7 text-center font-mono text-xs text-[#85859a]">
        Animation Lab · CSS foundations before GSAP
      </footer>
    </div>
  );
}
