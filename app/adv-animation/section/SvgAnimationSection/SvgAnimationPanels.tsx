import { cn } from "~/lib/utils";
import { ui } from "~/styles/classes";
import { TabPanel } from "~/components";

type SvgAnimationPanelsProps = {
  onRingInput: (value: number) => void;
};

const SvgAnimationPanels = ({ onRingInput }: SvgAnimationPanelsProps) => {
  return (
    <>
      <TabPanel value="stroke draw-on">
        <div className={cn(ui.demoArea, "flex-col gap-4 items-start")}>
          <div className="flex items-center gap-10 mx-auto">
            <div className="svg-stage w-40 h-40">
              <svg viewBox="0 0 56 56" width="140" height="140">
                <path
                  id="checkPath"
                  d="M12 28 L22 38 L44 16"
                  fill="none"
                  stroke="var(--color-green-500)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="stroke-path"
                />
              </svg>
            </div>
            <div className="svg-stage w-40 h-40">
              <svg viewBox="0 0 56 56" width="140" height="140">
                <circle
                  id="circlePath"
                  cx="28"
                  cy="28"
                  r="20"
                  fill="none"
                  stroke="var(--color-adv)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-path"
                />
              </svg>
            </div>
            <div className="svg-stage w-40 h-40">
              <svg viewBox="0 0 100 100" width="140" height="140">
                <path
                  id="signPath"
                  d="M10,50 Q25,20 40,50 T70,50 T100,50"
                  fill="none"
                  stroke="var(--color-blue-500)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="stroke-path"
                />
              </svg>
            </div>
          </div>
          <p className={ui.demoLabel}>
            Kỹ thuật tạo hiệu ứng đường line được vẽ dần ra, phù hợp với: icon
            outline, loading line, map route animate handwriting effect
          </p>
        </div>
      </TabPanel>

      <TabPanel value="path morphing">
        <div className={cn(ui.demoArea, "gap-10")}>
          <div className="svg-stage w-40 h-40">
            <svg id="morphSvg" viewBox="0 0 56 56" width="140" height="140">
              <path
                id="morphPath"
                d="M28 8 L48 48 L8 48 Z"
                fill="none"
                stroke="var(--color-purple-500)"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="morph-shape"
              />
            </svg>
          </div>
          <div className="svg-stage w-40 h-40">
            <svg id="morphSvg2" viewBox="0 0 56 56" width="140" height="140">
              <path
                id="morphPath2"
                d="M28 8 L48 48 L8 48 Z"
                fill="var(--color-adv)"
                fillOpacity="0.15"
                stroke="var(--color-adv)"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="max-w-52 text-sm leading-7 text-text-muted">
            Path morphing: animate <code>d</code> attribute giữa 2+ path có cùng
            số điểm.
          </div>
        </div>
      </TabPanel>

      <TabPanel value="clip-path reveal">
        <div className={cn(ui.demoArea, "gap-10")}>
          <div className="text-center flex flex-col items-center gap-2">
            <div className="clip-el" id="clipEl1">
              slide reveal
            </div>
            <div className={ui.demoLabel}>inset(0 100% 0 0)</div>
          </div>

          <div className="text-center flex flex-col items-center gap-2">
            <div id="clipEl2" className="clip-circle">
              circle
            </div>
            <div className={ui.demoLabel}>circle(0% to 75%)</div>
          </div>

          <div className="text-center flex flex-col items-center gap-2">
            <div id="clipEl3" className="clip-polygon">
              polygon
            </div>
            <div className={ui.demoLabel}>polygon wipe</div>
          </div>

          <div className="text-center flex flex-col items-center gap-2">
            <div className="clip-text-wrap">
              <div id="clipText" className="clip-text">
                Advanced
              </div>
            </div>
            <div className={ui.demoLabel}>text slide up</div>
          </div>
        </div>
      </TabPanel>

      <TabPanel value="progress ring">
        <div className={cn(ui.demoArea, "gap-10")}>
          <div className="text-center flex flex-col items-center gap-2.5">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle className="ring-track" cx="50" cy="50" r="45" />
              <circle
                id="ring1"
                className="ring-fill"
                cx="50"
                cy="50"
                r="45"
                style={{ strokeDasharray: "0 283" }}
              />
              <text
                id="ring1txt"
                x="50"
                y="56"
                textAnchor="middle"
                fill="var(--color-adv)"
                fontFamily="DM Mono,monospace"
                fontSize="18"
                fontWeight="600"
              >
                0%
              </text>
            </svg>
            <div className={ui.demoLabel}>CSS transition</div>
          </div>

          <div className="text-center flex flex-col items-center gap-2.5">
            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-bg-subtle)"
                strokeWidth="8"
              />
              <circle
                id="ring2seg1"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-adv)"
                strokeWidth="8"
                strokeLinecap="butt"
                strokeDasharray="0 283"
              />
              <circle
                id="ring2seg2"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-accent-purple)"
                strokeWidth="8"
                strokeLinecap="butt"
                strokeDasharray="0 283"
              />
              <circle
                id="ring2seg3"
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="var(--color-accent-teal)"
                strokeWidth="8"
                strokeLinecap="butt"
                strokeDasharray="0 283"
              />
            </svg>
            <div className={ui.demoLabel}>segmented ring</div>
          </div>

          <div className="flex flex-col gap-2.5">
            <div className={ui.demoLabel} style={{ marginBottom: 4 }}>
              ring 1 value
            </div>
            <input
              id="ringSlider"
              type="range"
              min="0"
              max="100"
              defaultValue="0"
              style={{ width: 160 }}
              onInput={(event) => {
                onRingInput(Number((event.target as HTMLInputElement).value));
              }}
            />
            <span className="font-mono text-xs text-text-base" id="ringVal">
              0%
            </span>
          </div>
        </div>
      </TabPanel>

      <TabPanel value="GSAP + SVG">
        <div className={cn(ui.demoArea, "gap-8")}>
          <div className="svg-stage w-52 h-52">
            <svg id="gsapSvg" viewBox="0 0 100 100" width="190" height="190">
              <defs>
                <linearGradient id="svgGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="var(--color-adv)" />
                  <stop offset="100%" stopColor="var(--color-pink-400)" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="30"
                fill="none"
                stroke="var(--color-bg-subtle)"
                strokeWidth="1"
              />
              <circle id="planet" cx="80" cy="50" r="6" fill="url(#svgGrad)" />
              <circle
                id="moon"
                cx="80"
                cy="50"
                r="3"
                fill="var(--color-blue-500)"
              />
              <circle
                cx="50"
                cy="50"
                r="12"
                fill="var(--color-adv)"
                fillOpacity="0.2"
                stroke="var(--color-adv)"
                strokeWidth="1.5"
              />
              <text
                x="50"
                y="54"
                textAnchor="middle"
                fill="var(--color-adv)"
                fontSize="8"
                fontFamily="DM Mono,monospace"
              >
                ☀
              </text>
              <path
                id="orbitPath"
                d="M80,50 A30,30 0 1,1 79.99,50"
                fill="none"
                stroke="none"
              />
            </svg>
          </div>

          <div className="min-w-52 max-w-80 flex-1">
            <div className="rounded-md border border-white/10 bg-bg-surface px-4 py-3 text-sm leading-7 text-text-muted">
              <strong className="text-adv">GSAP SVG tips:</strong>
              <br />- Dung{" "}
              <code>
                gsap.to(el, {"{"} attr: {"{"} cx, cy, r {"}"} {"}"})
              </code>{" "}
              cho SVG attrs
              <br />- <code>transformOrigin: "50% 50%"</code> la center cua SVG
              viewport
              <br />- Plugin <code>MotionPathPlugin</code> de animate doc theo
              path
              <br />- <code>DrawSVGPlugin</code> thay the cho dasharray trick
            </div>
          </div>
        </div>
      </TabPanel>
    </>
  );
};

export default SvgAnimationPanels;
