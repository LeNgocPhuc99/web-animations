import { useEffect, useRef, useState, type ReactNode } from "react";

import type { SvgTab } from "./data";

const MORPH_SHAPES = [
  "M28 8 L48 48 L8 48 Z",
  "M28 8 C44 8 48 44 28 48 C8 44 12 8 28 8",
  "M8 8 L48 8 L48 48 L8 48 Z",
  "M28 4 L42 20 L56 24 L46 36 L48 52 L28 44 L8 52 L10 36 L0 24 L14 20 Z",
];

const useSvgAnimationSection = () => {
  const [activeTab, setActiveTab] = useState<SvgTab>("stroke draw-on");
  const morphTimerRef = useRef<number | null>(null);
  const morphIndexRef = useRef(0);
  const orbitTweenRef = useRef<any>(null);
  const orbitTickerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      if (morphTimerRef.current !== null) {
        window.clearTimeout(morphTimerRef.current);
        morphTimerRef.current = null;
      }

      const gsap = (window as any).gsap;
      if (orbitTickerRef.current && gsap?.ticker) {
        gsap.ticker.remove(orbitTickerRef.current);
      }
      orbitTickerRef.current = null;

      if (orbitTweenRef.current?.kill) {
        orbitTweenRef.current.kill();
      }
      orbitTweenRef.current = null;
    };
  }, []);

  const runStrokeDraw = () => {
    const configs = [
      { id: "checkPath", dur: 0.9, delay: 0 },
      { id: "circlePath", dur: 1.1, delay: 0.15 },
      { id: "signPath", dur: 1.0, delay: 0.35 },
    ];

    configs.forEach(({ id, dur, delay }) => {
      const el = document.getElementById(id);
      if (!el) return;

      let len = 300;
      try {
        len = (el as unknown as SVGGeometryElement).getTotalLength();
      } catch {
        // keep fallback length
      }

      el.style.transition = "none";
      el.style.strokeDasharray = `0 ${len + 10}`;
      void el.getBoundingClientRect();

      window.setTimeout(() => {
        el.style.transition = `stroke-dasharray ${dur}s cubic-bezier(0.4,0,0.2,1)`;
        el.style.strokeDasharray = `${len} 0`;
      }, delay * 1000 + 30);
    });
  };

  const runMorphDemo = () => {
    const p1 = document.getElementById("morphPath");
    const p2 = document.getElementById("morphPath2");
    if (!p1 || !p2) return;

    if (morphTimerRef.current !== null) {
      window.clearTimeout(morphTimerRef.current);
      morphTimerRef.current = null;
    }

    p1.style.animation = "none";
    void p1.getBoundingClientRect();
    p1.style.animation = "morphShape 4s ease-in-out infinite";

    const gsap = (window as any).gsap;
    const morphSequence = () => {
      morphIndexRef.current = (morphIndexRef.current + 1) % MORPH_SHAPES.length;
      const next = MORPH_SHAPES[morphIndexRef.current];

      if (gsap?.to) {
        gsap.to(
          { progress: 0 },
          {
            progress: 1,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
              p2.setAttribute("d", next);
              morphTimerRef.current = window.setTimeout(morphSequence, 400);
            },
          },
        );
        return;
      }

      p2.setAttribute("d", next);
      morphTimerRef.current = window.setTimeout(morphSequence, 1300);
    };

    morphSequence();
  };

  const runClipReveal = () => {
    const el1 = document.getElementById("clipEl1");
    const el2 = document.getElementById("clipEl2");
    const el3 = document.getElementById("clipEl3");
    const txt = document.getElementById("clipText");

    if (!el1 || !el2 || !el3 || !txt) return;

    el1.style.transition = "none";
    el1.style.clipPath = "inset(0 100% 0 0)";
    el2.style.transition = "none";
    el2.style.clipPath = "circle(0% at 50% 50%)";
    el3.style.transition = "none";
    el3.style.clipPath = "polygon(0 0,0 0,0 100%,0 100%)";
    txt.style.transition = "none";
    txt.style.transform = "translateY(110%)";

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        el1.style.transition = "clip-path 0.8s cubic-bezier(.77,0,.18,1)";
        el1.style.clipPath = "inset(0 0% 0 0)";

        window.setTimeout(() => {
          el2.style.transition = "clip-path 0.7s cubic-bezier(.34,1.56,.64,1)";
          el2.style.clipPath = "circle(75% at 50% 50%)";
        }, 150);

        window.setTimeout(() => {
          el3.style.transition = "clip-path 0.8s cubic-bezier(.77,0,.18,1)";
          el3.style.clipPath = "polygon(0 0,100% 0,100% 100%,0 100%)";
        }, 300);

        window.setTimeout(() => {
          txt.style.transition = "transform 0.7s cubic-bezier(.22,1,.36,1)";
          txt.style.transform = "translateY(0)";
        }, 450);
      });
    });
  };

  const updateRing = (val: number) => {
    const r = 45;
    const c = 2 * Math.PI * r;
    const filled = (val / 100) * c;
    const ring = document.getElementById("ring1");
    const txt = document.getElementById("ring1txt");
    const ringVal = document.getElementById("ringVal");

    if (!ring || !txt || !ringVal) return;

    ring.style.transition = "stroke-dasharray 0.5s cubic-bezier(.4,0,.2,1)";
    ring.style.strokeDasharray = `${filled} ${c - filled}`;
    txt.textContent = `${val}%`;
    ringVal.textContent = `${val}%`;
  };

  const animateRings = () => {
    let v = 0;
    const step = () => {
      v += 1.5;
      if (v <= 75) {
        updateRing(Math.round(v));
        window.requestAnimationFrame(step);
      }
    };

    const slider = document.getElementById("ringSlider") as HTMLInputElement | null;
    if (slider) slider.value = "0";
    updateRing(0);
    step();

    const r = 45;
    const c = 2 * Math.PI * r;
    const segs = [
      { id: "ring2seg1", pct: 40, offset: 0 },
      { id: "ring2seg2", pct: 30, offset: 40 },
      { id: "ring2seg3", pct: 20, offset: 72 },
    ];

    segs.forEach((s, i) => {
      const el = document.getElementById(s.id);
      if (!el) return;

      el.style.transition = "none";
      el.style.strokeDasharray = "0 283";
      el.style.strokeDashoffset = "0";

      window.setTimeout(() => {
        const filled = (s.pct / 100) * c;
        const gap = 4;
        el.style.transition = `stroke-dasharray 0.8s cubic-bezier(.4,0,.2,1) ${i * 0.2}s`;
        el.style.strokeDasharray = `${filled - gap} ${c - (filled - gap)}`;
        el.style.strokeDashoffset = `${-((s.offset / 100) * c)}`;
      }, 100);
    });
  };

  const runGsapSvg = () => {
    const gsap = (window as any).gsap;
    if (!gsap) return;

    if (orbitTickerRef.current) {
      gsap.ticker.remove(orbitTickerRef.current);
      orbitTickerRef.current = null;
    }
    if (orbitTweenRef.current?.kill) {
      orbitTweenRef.current.kill();
    }

    const planet = document.getElementById("planet");
    const moon = document.getElementById("moon");
    if (!planet || !moon) return;

    gsap.set(planet, { transformOrigin: "50px 50px" });
    gsap.set(moon, { transformOrigin: "50px 50px" });

    orbitTweenRef.current = gsap.timeline({ repeat: -1 });
    orbitTweenRef.current
      .to(planet, { rotation: 360, duration: 4, ease: "none", transformOrigin: "50px 50px" }, 0)
      .to(moon, { rotation: -720, duration: 2, ease: "none", transformOrigin: "50px 50px" }, 0);

    orbitTickerRef.current = () => {
      const t = gsap.ticker.time;
      const angle = (t * Math.PI * 2) / 4;
      const cx = 50 + 30 * Math.cos(angle);
      const cy = 50 + 30 * Math.sin(angle);
      planet.setAttribute("cx", `${cx}`);
      planet.setAttribute("cy", `${cy}`);

      const ma = (t * Math.PI * 2) / 1.5;
      moon.setAttribute("cx", `${cx + 8 * Math.cos(ma)}`);
      moon.setAttribute("cy", `${cy + 8 * Math.sin(ma)}`);
    };

    gsap.ticker.add(orbitTickerRef.current);
  };

  const action: ReactNode = (() => {
    switch (activeTab) {
      case "stroke draw-on":
        return (
          <button className="btn btn-adv" onClick={runStrokeDraw}>
            ▶ Draw
          </button>
        );
      case "path morphing":
        return (
          <button className="btn btn-adv" onClick={runMorphDemo}>
            ▶ Morph
          </button>
        );
      case "clip-path reveal":
        return (
          <button className="btn btn-adv" onClick={runClipReveal}>
            ▶ Reveal
          </button>
        );
      case "progress ring":
        return (
          <button className="btn btn-adv" onClick={animateRings}>
            ▶ Animate
          </button>
        );
      case "GSAP + SVG":
        return (
          <button className="btn btn-adv" onClick={runGsapSvg}>
            ▶ Orbit
          </button>
        );
      default:
        return undefined;
    }
  })();

  return {
    activeTab,
    action,
    animateRings,
    runClipReveal,
    runGsapSvg,
    runMorphDemo,
    runStrokeDraw,
    setActiveTab,
    updateRing,
  };
};

export default useSvgAnimationSection;
