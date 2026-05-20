import { useState } from "react";

import { ui } from "~/css-animations/classes";
import { DemoCard } from "~/css-animations/components";
import { TabItem, TabList, TabPanel, Tabs } from "~/components/Tabs";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./keyframes.css";

const tabs = [
  { label: "anatomy", value: "anatomy" },
  { label: "multi-step %", value: "multi-step" },
  { label: "fill-mode", value: "fill-mode" },
  { label: "iteration & direction", value: "iteration" },
  { label: "stagger", value: "stagger" },
  { label: "real-world patterns", value: "real-world" },
] as const;

type KeyframeTab = (typeof tabs)[number]["value"];

const keyframeBars = [80, 52, 112, 68, 96, 44, 104, 72, 60] as const;
const keyframeWords = [
  "Animation",
  "brings",
  "interfaces",
  "to",
  "life.",
] as const;

const panelCode: Record<KeyframeTab, string> = {
  anatomy: `
    <span class="c">/* cú pháp đầy đủ */</span><br>
    <span class="k">@keyframes</span> <span class="p">bounce</span> {<br>
    &nbsp;&nbsp;<span class="v">from</span> { <span class="p">transform</span>: translateY(0); }<br>
    &nbsp;&nbsp;<span class="v">to</span>&nbsp;&nbsp; { <span class="p">transform</span>: translateY(-50px); }<br>
    }<br>
    <span class="k">.el</span> { <span class="p">animation</span>: <span class="v">bounce 1s ease infinite alternate</span>; }
  `,
  "multi-step": `
    <span class="c">/* overshoot: 0→60% scale up vượt, 80% bounce back */</span><br>
    <span class="k">@keyframes</span> <span class="p">bounceIn</span> {<br>
    &nbsp;&nbsp;<span class="v">0%</span>&nbsp;&nbsp; { <span class="p">transform</span>: scale(<span class="v">0</span>); }<br>
    &nbsp;&nbsp;<span class="v">60%</span>&nbsp; { <span class="p">transform</span>: scale(<span class="v">1.2</span>); }<br>
    &nbsp;&nbsp;<span class="v">80%</span>&nbsp; { <span class="p">transform</span>: scale(<span class="v">0.9</span>); }<br>
    &nbsp;&nbsp;<span class="v">100%</span> { <span class="p">transform</span>: scale(<span class="v">1</span>); }<br>
    }<br>
    <span class="c">/* gộp 2 mốc cùng trạng thái */</span><br>
    <span class="v">0%, 100%</span> { <span class="p">background</span>: <span class="v">blue</span>; } <span class="v">50%</span> { <span class="p">background</span>: <span class="v">red</span>; }
  `,
  "fill-mode": `
    <span class="c">/* forwards: giữ trạng thái to{} sau khi xong */</span><br>
    <span class="k">.el</span> { <span class="p">opacity</span>: <span class="v">0</span>; <span class="p">animation</span>: <span class="v">flyIn 0.6s ease 1s forwards</span>; }<br>
    <span class="c">/* both = backwards + forwards — pattern chuẩn nhất */</span><br>
    <span class="k">.el</span> { <span class="p">opacity</span>: <span class="v">0</span>; <span class="p">animation</span>: <span class="v">flyIn 0.6s ease 1s both</span>; }
  `,
  iteration: `
    <span class="c">/* alternate: lần 1 xuôi, lần 2 ngược — không cần 2 @keyframes */</span><br>
    <span class="p">animation</span>: <span class="v">swing 0.7s ease-in-out infinite alternate</span>;<br>
    <span class="c">/* pause bằng CSS */</span><br>
    <span class="k">.el</span>:<span class="p">hover</span> { <span class="p">animation-play-state</span>: <span class="v">paused</span>; }<br>
    <span class="c">/* pause bằng JS */</span><br>
    el.style.animationPlayState = <span class="v">'paused'</span>;
  `,
  stagger: `
    <span class="c">/* CSS: nth-child — đơn giản khi số item cố định */</span><br>
    <span class="k">.bar:nth-child(n)</span> { <span class="p">animation-delay</span>: <span class="v">calc(n * 0.07s)</span>; }<br>
    <span class="c">/* JS: linh hoạt hơn khi số item động */</span><br>
    items.forEach((el, i) => el.style.animationDelay = (i * <span class="v">0.07</span>) + <span class="v">'s'</span>);
  `,
  "real-world": `
    <span class="c">/* shake: thêm class → lắng nghe animationend → xoá class */</span><br>
    el.classList.add(<span class="v">'shaking'</span>);<br>
    el.addEventListener(<span class="v">'animationend'</span>, () => el.classList.remove(<span class="v">'shaking'</span>), { <span class="p">once</span>: <span class="v">true</span> });<br>
    <span class="c">/* force-restart: void el.offsetWidth trước khi thêm class lại */</span>
  `,
};

const KeyframesSection = () => {
  const [activeTab, setActiveTab] = useState<KeyframeTab>("anatomy");
  const [playing, setPlaying] = useState(false);
  const [bounceRunId, setBounceRunId] = useState(0);
  const [fillRunId, setFillRunId] = useState(0);
  const [spinRunId, setSpinRunId] = useState(0);
  const [staggerRunId, setStaggerRunId] = useState(0);
  const [shakeRunId, setShakeRunId] = useState(0);
  const [heroRunId, setHeroRunId] = useState(0);

  const action = (() => {
    if (activeTab === "anatomy") {
      return (
        <button
          className={ui.button}
          onClick={() => setPlaying((value) => !value)}
          type="button"
        >
          Play / Pause
        </button>
      );
    }

    if (activeTab === "multi-step") {
      return (
        <button
          className={ui.button}
          onClick={() => setBounceRunId((value) => value + 1)}
          type="button"
        >
          BounceIn
        </button>
      );
    }

    if (activeTab === "fill-mode") {
      return (
        <button
          className={ui.button}
          onClick={() => setFillRunId((value) => value + 1)}
          type="button"
        >
          Play
        </button>
      );
    }

    if (activeTab === "stagger") {
      return (
        <button
          className={ui.button}
          onClick={() => setStaggerRunId((value) => value + 1)}
          type="button"
        >
          Play
        </button>
      );
    }

    return undefined;
  })();

  return (
    <LessonSection id="keyframes">
      <DemoCard code={panelCode[activeTab]} action={action}>
        <Tabs
          onValueChange={(value) => setActiveTab(value as KeyframeTab)}
          value={activeTab}
        >
          <TabList className="flex flex-wrap gap-1 border-b border-white/10 px-6 pt-4">
            {tabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>

          <TabPanel value="anatomy">
            <div className={cn("min-h-48 gap-12", ui.demoArea)}>
              <div className={ui.stack}>
                <div className="flex h-20 items-end">
                  <div
                    className={cn(
                      "kf-orb h-15 w-15 rounded-full bg-[#5b8dee]",
                      playing && "playing",
                    )}
                  />
                </div>
                <div className={ui.caption}>bounce + color</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "kf-spin h-12 w-12 rounded-full border-[3px] border-white/15 border-t-[#5beeb4]",
                    playing && "playing",
                  )}
                />
                <div className={ui.caption}>spin linear</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "kf-flash rounded-lg border border-white/15 bg-[#1a1a24] px-6 py-2.5 font-mono text-[13px] text-[#e8e8f0]",
                    playing && "playing",
                  )}
                >
                  flash!
                </div>
                <div className={ui.caption}>color flash</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "kf-shake inline-block font-mono text-2xl",
                    playing && "playing",
                  )}
                >
                  ⚠️
                </div>
                <div className={ui.caption}>shake</div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="multi-step">
            <div className={cn("min-h-48 gap-12", ui.demoArea)}>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "ms-box bg-[#5b8dee]",
                    bounceRunId > 0 && "playing-bounce",
                  )}
                  key={bounceRunId}
                >
                  0%-60%
                  <br />
                  -80%-100%
                </div>
                <div className={ui.caption}>bounceIn</div>
              </div>
              <div className={ui.stack}>
                <div className="ms-box playing-pop bg-[#5beeb4]">
                  0%,100%
                  <br />= same
                </div>
                <div className={ui.caption}>pulse loop</div>
              </div>
              <div className={ui.stack}>
                <div className="ms-box playing-walk bg-[#eec85b]">
                  4-step
                  <br />
                  walk
                </div>
                <div className={ui.caption}>multi-keyframe</div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="fill-mode">
            <div
              className={cn(
                "flex-col items-start gap-5 px-8 py-6",
                ui.demoArea,
              )}
            >
              <div className="font-mono text-[11px] text-[#85859a]">
                delay = 0.7s - quan sat truoc delay va sau khi animation ket
                thuc
              </div>
              <div
                className={cn("fm-row", fillRunId > 0 && "fm-running")}
                key={fillRunId}
              >
                <FillModeItem
                  className="fm-none"
                  label="none"
                  note="quay ve CSS goc"
                />
                <FillModeItem
                  className="fm-forwards"
                  label="forwards"
                  note="giu frame cuoi"
                />
                <FillModeItem
                  className="fm-backwards"
                  label="backwards"
                  note="an trong delay"
                />
                <FillModeItem
                  className="fm-both outline outline-offset-3 outline-[#ee5b8d]"
                  label="both"
                  note="dung nhieu nhat"
                  noteClassName="text-[#ee5b8d]"
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="iteration">
            <div className={cn("min-h-45 gap-10", ui.demoArea)}>
              <div className={ui.stack}>
                <div className="id-box spin-inf bg-[#5beeb4]">inf</div>
                <div className={ui.caption}>infinite</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "id-box bg-[#ee5b8d]",
                    spinRunId > 0 && "spin-3",
                  )}
                  key={spinRunId}
                >
                  3x
                </div>
                <div className={ui.caption}>count: 3</div>
                <button
                  className={cn("px-2.5 py-1 text-[10px]", ui.button)}
                  onClick={() => setSpinRunId((value) => value + 1)}
                  type="button"
                >
                  Play
                </button>
              </div>
              <div className={ui.stack}>
                <span className="id-swing alt text-3xl">note</span>
                <div className={ui.caption}>alternate</div>
              </div>
              <div className={ui.stack}>
                <span className="id-swing alt-rev text-3xl">bell</span>
                <div className={ui.caption}>alt-reverse</div>
              </div>
              <div className={ui.stack}>
                <div className="id-box hover-pause bg-[#eec85b] text-[9px]">
                  hover
                  <br />
                  pause
                </div>
                <div className={ui.caption}>CSS pause</div>
              </div>
            </div>
          </TabPanel>

          <TabPanel value="stagger">
            <div
              className={cn(
                "flex-col items-start gap-5 px-8 py-6",
                ui.demoArea,
              )}
            >
              <div className="font-mono text-[11px] text-[#85859a]">
                bar chart - moi cot delay tang them 0.07s
              </div>
              <div className="kf-stagger-grid" key={`bars-${staggerRunId}`}>
                {keyframeBars.map((height, index) => (
                  <div
                    className={cn(
                      "kf-stagger-bar",
                      staggerRunId > 0 && "revealed",
                    )}
                    key={`${height}-${index}`}
                    style={{
                      height,
                      animationDelay: `${index * 0.07}s`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#85859a]">
                word reveal - stagger bang JS
              </div>
              <div
                className="flex flex-wrap gap-2 text-xl font-bold"
                key={`words-${staggerRunId}`}
              >
                {keyframeWords.map((word, index) => (
                  <span
                    className={cn(
                      "kf-word-reveal",
                      staggerRunId > 0 && "revealed",
                    )}
                    key={word}
                    style={{ animationDelay: `${index * 0.1 + 0.7}s` }}
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </TabPanel>

          <TabPanel value="real-world">
            <div className={cn("gap-10", ui.demoArea)}>
              <div className="flex flex-col items-start gap-1.5">
                <div className="rw-skeleton w-40" />
                <div className="rw-skeleton w-30" />
                <div className="rw-skeleton w-35" />
                <div className="rw-skeleton w-20" />
                <div className="mt-1 font-mono text-[10px] text-[#85859a]">
                  skeleton shimmer
                </div>
              </div>
              <div className={ui.stack}>
                <div className="rw-spinner" />
                <div className={ui.caption}>spinner</div>
              </div>
              <div className={ui.stack}>
                <div className="rw-dots">
                  <div className="rw-dot" />
                  <div className="rw-dot" />
                  <div className="rw-dot" />
                </div>
                <div className={ui.caption}>typing dots</div>
              </div>
              <div className={ui.stack}>
                <input
                  className={cn(
                    "rw-shake-input",
                    shakeRunId > 0 && "error shaking",
                  )}
                  key={shakeRunId}
                  readOnly
                  value="wrong-pass"
                />
                <button
                  className={cn("px-3 py-1.5 text-[11px]", ui.button)}
                  onClick={() => setShakeRunId((value) => value + 1)}
                  type="button"
                >
                  Shake
                </button>
                <div className={ui.caption}>error shake</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="rw-hero" key={heroRunId}>
                  <span>Build</span>&nbsp;<span>great</span>&nbsp;
                  <span>UX.</span>
                </div>
                <button
                  className={cn("px-3 py-1.5 text-[11px]", ui.button)}
                  onClick={() => setHeroRunId((value) => value + 1)}
                  type="button"
                >
                  Replay
                </button>
                <div className={ui.caption}>hero word reveal</div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </LessonSection>
  );
};

const FillModeItem = ({
  className,
  label,
  note,
  noteClassName,
}: {
  className: string;
  label: string;
  note: string;
  noteClassName?: string;
}) => (
  <div className="fm-col">
    <div className={cn("fm-box", className)}>{label}</div>
    <div className="fm-label">
      {label}
      <br />
      <span className={noteClassName}>{note}</span>
    </div>
  </div>
);

export default KeyframesSection;
