import { ui } from "~/styles/classes";
import { DemoCard } from "~/components";
import { useProgress } from "~/css-animations/interactions";

import LessonSection from "../LessonSection";

import { ldPanelCode } from "./data";
import "./loading.css";

const LoadingSection = () => {
  const progress = useProgress();

  return (
    <LessonSection id="loading">
      <DemoCard code={ldPanelCode}>
        <div className={ui.demoArea}>
          <div className="flex flex-wrap items-center justify-center gap-9">
            <div className={ui.stack}>
              <div className="loading-spin h-10 w-10 rounded-full border-[3px] border-border-subtle border-t-primary" />
              <span className={ui.caption}>spinner</span>
            </div>
            <div className={ui.stack}>
              <div className="flex gap-1.5">
                <div className="loading-dot h-2.5 w-2.5 rounded-full bg-secondary" />
                <div className="loading-dot h-2.5 w-2.5 rounded-full bg-secondary" />
                <div className="loading-dot h-2.5 w-2.5 rounded-full bg-secondary" />
              </div>
              <span className={ui.caption}>typing dots</span>
            </div>
            <div className={ui.stack}>
              <div className="flex w-50 flex-col gap-2">
                <div className="loading-skel h-4 w-full rounded" />
                <div className="loading-skel h-3 w-3/4 rounded" />
                <div className="loading-skel h-3 w-full rounded" />
                <div className="loading-skel h-3 w-1/2 rounded" />
              </div>
              <span className={ui.caption}>skeleton shimmer</span>
            </div>
            <div className={ui.stack}>
              <div className="w-50">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-bg-surface">
                  <div
                    className="h-full rounded-full bg-success transition-[width] duration-100 ease-linear"
                    style={{ width: `${progress.value}%` }}
                  />
                </div>
                <div className="mt-1.5 text-center font-mono text-xs text-text-base/70">
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
};

export default LoadingSection;
