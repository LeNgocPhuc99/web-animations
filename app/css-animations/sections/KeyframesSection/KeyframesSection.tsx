import { useState } from "react";

import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { TabItem, TabList, TabPanel, Tabs } from "~/components/Tabs";

import LessonSection from "../LessonSection";

import { cn } from "~/lib/utils";

import "./keyframes.css";

import {
  kfTabs,
  kfPanelCode,
  keyframeBars,
  keyframeWords,
  type KeyframeTab,
} from "./data";

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
      <DemoCard code={kfPanelCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as KeyframeTab)}
        >
          <TabList>
            {kfTabs.map((tab) => (
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
                      "kf-orb h-15 w-15 rounded-full bg-primary",
                      playing && "playing",
                    )}
                  />
                </div>
                <div className={ui.caption}>bounce + color</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "kf-spin h-12 w-12 rounded-full border-[3px] border-white/15 border-t-success",
                    playing && "playing",
                  )}
                />
                <div className={ui.caption}>spin linear</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "kf-flash rounded-lg border border-white/15 bg-bg-surface px-6 py-2.5 font-mono text-[13px] text-text-base",
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
                    "ms-box bg-primary",
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
                <div className="ms-box playing-pop bg-success">
                  0%,100%
                  <br />= same
                </div>
                <div className={ui.caption}>pulse loop</div>
              </div>
              <div className={ui.stack}>
                <div className="ms-box playing-walk bg-warning">
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
              <div className="font-mono text-xs text-text-muted">
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
                  className="fm-both outline outline-offset-3 outline-secondary"
                  label="both"
                  note="dung nhieu nhat"
                  noteClassName="text-secondary"
                />
              </div>
            </div>
          </TabPanel>

          <TabPanel value="iteration">
            <div className={cn("min-h-45 gap-10", ui.demoArea)}>
              <div className={ui.stack}>
                <div className="id-box spin-inf bg-success)">inf</div>
                <div className={ui.caption}>infinite</div>
              </div>
              <div className={ui.stack}>
                <div
                  className={cn(
                    "id-box bg-secondary",
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
                <div className="id-box hover-pause bg-warning text-[9px]">
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
              <div className="font-mono text-xs text-text-muted">
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
              <div className="mt-1 font-mono text-xs text-text-muted">
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
                <div className="mt-1 font-mono text-[10px] text-text-muted">
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
                  className={cn("px-3 py-1.5 text-xs", ui.button)}
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
                  className={cn("px-3 py-1.5 text-xs", ui.button)}
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
