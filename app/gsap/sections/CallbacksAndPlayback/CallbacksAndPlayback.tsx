import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ui } from "~/styles/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { gBox, gsapDemoLabel } from "~/gsap/classes";

import { cn } from "~/lib/utils";

import {
  callbacksTabs,
  panelTabsCode,
  cbRepeatData,
  type CallbackTab,
} from "./data";

import GSAPSection from "../GSAPSection";

import "./callbacks-and-playback.css";

interface CallbackLog {
  msg: string;
  cls: string;
}

function CallbacksAndPlayback() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const ctrlBoxRef = useRef<HTMLDivElement>(null);
  const ctrlTweenRef = useRef<gsap.core.Tween | null>(null);
  const [activeTab, setActiveTab] = useState<CallbackTab>("callbacks");
  const [seekCbValue, setSeekCbValue] = useState<number>(0);
  const [ctrlState, setCtrlState] = useState("idle");
  const [ctrlProgress, setCtrlProgress] = useState("0");
  const [cbLogs, setCbLogs] = useState<CallbackLog[]>([
    { msg: "bấm Play để xem callbacks", cls: "" },
  ]);

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const addCbLog = (msg: string, cls = "") => {
    const time = new Date().toLocaleTimeString("vi", { hour12: false });
    setCbLogs((prev) => [...prev, { msg: `[${time}] ${msg}`, cls }]);
  };

  const clearCallbackLog = contextSafe(() => {
    gsap.killTweensOf("#cbBox");
    gsap.set("#cbBox", { x: 0, opacity: 1 });
    setCbLogs([]);
  });

  const runCallbackDemo = contextSafe(() => {
    gsap.killTweensOf("#cbBox");
    gsap.set("#cbBox", { x: 0, opacity: 1 });
    clearCallbackLog();

    gsap.to("#cbBox", {
      x: 200,
      duration: 1.5,
      ease: "power2.inOut",
      onStart: () => addCbLog("onStart — animation bắt đầu", "hi"),
      onUpdate(this: gsap.core.Tween) {
        addCbLog(`onUpdate — progress: ${this.progress().toFixed(2)}`);
      },
      onComplete: () => addCbLog("onComplete ✓ — animation kết thúc", "hi"),
    });
  });

  const initCtrlTween = () => {
    const ctrlBox = ctrlBoxRef.current;
    if (!ctrlBox) return null;

    if (ctrlTweenRef.current?.targets()[0] === ctrlBox) {
      return ctrlTweenRef.current;
    }

    ctrlTweenRef.current?.kill();
    gsap.set(ctrlBox, { x: 0 });

    ctrlTweenRef.current = gsap.to(ctrlBox, {
      x: 300,
      duration: 2.5,
      ease: "power1.inOut",
      paused: true,
      onUpdate(this: gsap.core.Tween) {
        const progress = this.progress();
        setCtrlProgress(progress.toFixed(3));
        setSeekCbValue(progress * 100);
      },
      onComplete: () => {
        setCtrlState("complete");
      },
      onReverseComplete: () => {
        setCtrlState("idle");
      },
    });

    return ctrlTweenRef.current;
  };

  const ctrlPlay = contextSafe(() => {
    const ctrlTween = initCtrlTween();
    ctrlTween?.play();
    setCtrlState("playing");
  });

  const ctrlPause = contextSafe(() => {
    const ctrlTween = initCtrlTween();
    ctrlTween?.pause();
    setCtrlState("paused");
  });

  const ctrlReverse = contextSafe(() => {
    const ctrlTween = initCtrlTween();
    ctrlTween?.reverse();
    setCtrlState("reversing");
  });

  const ctrlRestart = contextSafe(() => {
    const ctrlTween = initCtrlTween();
    ctrlTween?.restart();
    setCtrlState("playing");
  });

  const seekTween = contextSafe((value: number) => {
    const ctrlTween = initCtrlTween();
    const progress = value / 100;

    ctrlTween?.progress(progress).pause();
    setSeekCbValue(value);
    setCtrlProgress(progress.toFixed(3));
    setCtrlState("seeked");
  });

  const runRepeatDemo = contextSafe(() => {
    gsap.fromTo(
      "#delayBox",
      { x: 0 },
      { x: 140, duration: 0.6, ease: "power2.out", delay: 0.6 },
    );
    gsap.fromTo(
      "#repeatBox",
      { x: 0 },
      { x: 140, duration: 0.6, ease: "power2.out", repeat: 2 },
    );
    gsap.fromTo(
      "#yoyoBox",
      { x: 0 },
      { x: 140, duration: 0.6, ease: "power2.inOut", repeat: 4, yoyo: true },
    );
    gsap.to("#infBox", {
      rotation: 360,
      duration: 1.2,
      ease: "none",
      repeat: -1,
    });
  });

  const resetRepeatDemo = contextSafe(() => {
    gsap.killTweensOf("#delayBox");
    gsap.set("#delayBox", {
      x: 0,
    });

    gsap.killTweensOf("#repeatBox");
    gsap.set("#repeatBox", {
      x: 0,
    });

    gsap.killTweensOf("#yoyoBox");
    gsap.set("#yoyoBox", {
      x: 0,
    });

    gsap.killTweensOf("#infBox");
    gsap.set("#infBox", {
      rotation: 0,
    });
  });

  const action = (() => {
    switch (activeTab) {
      case "callbacks":
        return (
          <div className="flex items-center gap-2">
            <button
              className="btn btn-green"
              onClick={runCallbackDemo}
              type="button"
            >
              ▶ Play
            </button>
            <button className="btn" onClick={clearCallbackLog} type="button">
              clear log
            </button>
          </div>
        );
      case "playback control":
        return (
          <div className="flex flex-wrap items-center gap-2">
            <button className="btn btn-green" onClick={ctrlPlay} type="button">
              play
            </button>
            <button className="btn" onClick={ctrlPause} type="button">
              pause
            </button>
            <button className="btn" onClick={ctrlReverse} type="button">
              reverse
            </button>
            <button className="btn" onClick={ctrlRestart} type="button">
              restart
            </button>
          </div>
        );
      case "delay & repeat":
        return (
          <div className="flex items-center gap-2">
            <button className="btn btn-green" onClick={runRepeatDemo}>
              ▶ Play All
            </button>
            <button className="btn" onClick={resetRepeatDemo}>
              Reset
            </button>
          </div>
        );
      default:
        return undefined;
    }
  })();

  return (
    <GSAPSection id="callbacks">
      <DemoCard code={panelTabsCode[activeTab]} action={action}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as CallbackTab)}
        >
          <TabList>
            {callbacksTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="callbacks">
              <div className={cn(ui.demoArea, "gap-6 flex-wrap")}>
                <div className="min-w-60 flex-1">
                  <div id="cbBox" className={cn(gBox)}>
                    anim
                  </div>
                </div>
                <div className="flex-1 space-y-2">
                  <p className={cn(gsapDemoLabel)}>event log</p>
                  <div className="cb-log">
                    {cbLogs.map((log, index) => (
                      <div
                        key={`${log.msg}-${index}`}
                        className={cn("log-line", log.cls)}
                      >
                        {log.msg}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="playback control">
              <div className={cn(ui.demoArea)}>
                <div className="flex-1">
                  <div id="ctrlBox" ref={ctrlBoxRef} className={cn(gBox)}>
                    ctrl
                  </div>
                </div>
                <div className="flex-1  flex flex-col min-w-60">
                  <div className={gsapDemoLabel}>
                    tween state:
                    <span id="ctrlState" className="text-gsap ml-1/2">
                      {ctrlState}
                    </span>
                  </div>
                  <div className={gsapDemoLabel}>
                    progress:
                    <span id="ctrlProgress" className="text-text-base ml-1/2">
                      {ctrlProgress}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center mt-2">
                    <span className={gsapDemoLabel}>seek</span>
                    <input
                      min={0}
                      max={100}
                      type="range"
                      id="seekSlider"
                      value={seekCbValue}
                      className="flex-1"
                      onChange={(e) => seekTween(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="delay & repeat">
              <div className={cn(ui.demoArea, "flex-col items-start")}>
                {cbRepeatData.map((cb) => (
                  <div
                    key={`${cb.id}`}
                    className="flex flex-col items-start gap-1"
                  >
                    <div
                      id={cb.id}
                      className={cn(gBox, "text-center")}
                      style={{
                        background: `var(${cb.bg})`,
                      }}
                    >
                      {cb.name}
                    </div>
                    <p className={gsapDemoLabel}>{cb.desc}</p>
                  </div>
                ))}
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
}

export default CallbacksAndPlayback;
