import { useEffect, useRef, useState, type MouseEvent } from "react";

export function useActiveSection(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

export function useScrollReveal(itemCount: number) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => new Set());

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const index = itemRefs.current.indexOf(entry.target as HTMLElement);
          if (index < 0) return;

          window.setTimeout(() => {
            setVisibleItems((current) => new Set(current).add(index));
          }, index * 80);
        });
      },
      { threshold: 0.25, root },
    );

    itemRefs.current.slice(0, itemCount).forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, [itemCount]);

  return { rootRef, itemRefs, visibleItems };
}

export function useProgress() {
  const [value, setValue] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const run = () => {
    if (running) return;

    setValue(0);
    setRunning(true);

    timerRef.current = window.setInterval(() => {
      setValue((current) => {
        const next = Math.min(100, current + Math.random() * 4 + 1);

        if (next >= 100) {
          window.clearInterval(timerRef.current);
          setRunning(false);
        }

        return next;
      });
    }, 80);
  };

  return { value, running, run };
}

export function useMagneticButton() {
  const [transform, setTransform] = useState("");

  const onMouseMove = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (event.clientX - centerX) * 0.28;
    const dy = (event.clientY - centerY) * 0.28;
    setTransform(`translate(${dx}px, ${dy}px)`);
  };

  return {
    style: transform ? { transform } : undefined,
    onMouseMove,
    onMouseLeave: () => setTransform(""),
  };
}

export function createRipple(event: MouseEvent<HTMLButtonElement>) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();
  const size = Math.max(button.clientWidth, button.clientHeight) * 2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;
  const ripple = document.createElement("span");

  ripple.className = "ripple";
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  button.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 700);
}
