import { useRef, useState, type ChangeEvent } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";
import { gBox, gsapDemoLabel } from "~/gsap/classes";
import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import {
  pinData,
  scrubDemo,
  scrollItems,
  panelTabsCode,
  scrollTriggerTabs,
  type ScrollTriggerTab,
} from "./data";

import GSAPSection from "../GSAPSection";

import "./scroll.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const ScrollTriggerSection = () => {
  const scopeRef = useRef<HTMLDivElement>(null);
  const scrubTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const [activeTab, setActiveTab] =
    useState<ScrollTriggerTab>("trigger cơ bản");
  const [scrubProgress, setScrubProgress] = useState(0);

  useGSAP(
    () => {
      if (activeTab !== "trigger cơ bản") return;

      const root = scopeRef.current?.querySelector<HTMLElement>("#stWrap0");
      if (!root) return;

      const items = Array.from(root.querySelectorAll<HTMLElement>(".st-item"));

      gsap.set(items, { autoAlpha: 0, x: -20 });

      ScrollTrigger.batch(items, {
        scroller: root,
        start: "top 80%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            x: 0,
            duration: 0.5,
            ease: "back.out(2)",
            stagger: 0.08,
            overwrite: true,
          });
        },
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [activeTab], scope: scopeRef, revertOnUpdate: true },
  );

  useGSAP(
    () => {
      if (activeTab !== "scrub") return;

      const scrubBox = scopeRef.current?.querySelector<HTMLElement>("#scrubBox");
      const track = scrubBox?.parentElement;

      if (!scrubBox || !track) return;

      scrubTimelineRef.current?.kill();
      scrubTimelineRef.current = gsap
        .timeline({ paused: true })
        .to(scrubBox, {
          x: () => Math.max(track.clientWidth - scrubBox.offsetWidth, 0),
          rotation: 360,
          scale: 1.5,
          duration: 1,
          ease: "none",
        })
        .to(scrubBox, { opacity: 0.4, duration: 1, ease: "none" }, 0)
        .to(
          scrubBox,
          {
            backgroundColor: "var(--color-pink-500)",
            duration: 0.5,
            ease: "none",
          },
          0.5,
        );

      scrubTimelineRef.current.progress(scrubProgress / 100);

      return () => {
        scrubTimelineRef.current?.kill();
        scrubTimelineRef.current = null;
      };
    },
    { dependencies: [activeTab], scope: scopeRef, revertOnUpdate: true },
  );

  const { contextSafe } = useGSAP({ scope: scopeRef });

  const updateScrub = contextSafe((event: ChangeEvent<HTMLInputElement>) => {
    const nextProgress = Number(event.target.value);

    setScrubProgress(nextProgress);
    scrubTimelineRef.current?.progress(nextProgress / 100);
  });

  return (
    <GSAPSection id="scroll-trigger">
      <DemoCard code={panelTabsCode[activeTab]}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as ScrollTriggerTab)}
        >
          <TabList>
            {scrollTriggerTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <div ref={scopeRef}>
            <TabPanel value="trigger cơ bản">
              <div className={cn(ui.demoArea, "p-0 items-stretch")}>
                <div
                  className="st-scroll-wrap w-full items-center flex flex-col"
                  id="stWrap0"
                >
                  <div className="st-scroll-inner">
                    <div className="st-spacer">
                      <div className="st-scroll-hint">
                        ↓ cuộn xuống trong khung này
                      </div>
                    </div>
                    {scrollItems.map((item, index) => (
                      <div key={`${item.title}-${index}`} className="st-item">
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="scrub">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-4 items-stretch py-6 px-8",
                )}
              >
                <p className={gsapDemoLabel}>
                  scrub — animation tied to scroll position (simulate bằng
                  slider)
                </p>
                <div className="flex items-center gap-3">
                  <p className={gsapDemoLabel}>scroll</p>
                  <input
                    id="scrubSlider"
                    type="range"
                    min={0}
                    max={100}
                    value={scrubProgress}
                    className="flex-1"
                    onChange={updateScrub}
                  />
                  <p className={gsapDemoLabel}>end</p>
                </div>
                <div className="bg-bg-surface rounded-md p-4 overflow-hidden">
                  <div id="scrubBox" className={gBox}>
                    scrub
                  </div>
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {scrubDemo.map((demo) => (
                    <div
                      key={`${demo.id}-${demo.label}`}
                      className="flex-1 min-w-45"
                    >
                      <p className={gsapDemoLabel}>{demo.label}</p>
                      <div className="scrub-demo">
                        <div
                          className="scrub-fill"
                          id={demo.id}
                          style={{ width: `${scrubProgress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabPanel>
            <TabPanel value="markers & debug">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-4 items-stretch py-6 px-8",
                )}
              >
                <div className="bg-bg-surface rounded-md p-4 text-text-muted text-sm">
                  <strong className="text-text-base block mb-2">
                    Debug workflow với markers:
                  </strong>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-green-500"></div>
                    <span>
                      <code>scroller-start</code> — đường xanh lá = điểm bắt đầu
                      trên viewport
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-red-400"></div>
                    <span>
                      <code>trigger-end</code> — điểm end trên element
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-blue-400"></div>
                    <span>
                      <code>trigger-start</code> — điểm start trên element
                    </span>
                  </div>
                  <div className="flex gap-2.5 items-center">
                    <div className="w-2 h-2 rounded-full shrink-0 bg-yellow-400"></div>
                    <span>
                      <code>trigger-end</code> — điểm end trên element
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-bg-surface px-3 py-2.5 border-l-2 border-gsap rounded-tr-md rounded-br-md">
                    <p className="font-mono text-xs text-gsap mb-1">
                      console helpers
                    </p>
                    <div className={gsapDemoLabel}>
                      <code>ScrollTrigger.getAll()</code> — list tất cả ST
                      <br />
                      <code>ScrollTrigger.getById('id')</code>
                      <br />
                      <code>st.kill()</code> — destroy một trigger
                    </div>
                  </div>
                  <div className="bg-bg-surface px-3 py-2.5 border-l-2 border-yellow-400 rounded-tr-md rounded-br-md">
                    <p className="font-mono text-xs text-yellow-400">
                      common pitfalls
                    </p>
                    <div className={gsapDemoLabel}>
                      Quên <code>registerPlugin()</code>
                      <br />
                      Tính sai start/end string
                      <br />
                      Không refresh sau layout change
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="pin">
              <div
                className={cn(
                  ui.demoArea,
                  "flex-col gap-4 items-stretch py-6 px-8",
                )}
              >
                <div
                  className={cn("bg-bg-surface rounded-md p-4", gsapDemoLabel)}
                >
                  <strong className="text-text-base block mb-4">
                    pin — giữ element cố định trong khi scroll
                  </strong>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-2">
                    {pinData.map((pin) => (
                      <div
                        key={pin.title}
                        className="bg-bg-subtle rounded-sm py-2.5 px-3"
                      >
                        <p
                          className="font-mono text-xs mb-1"
                          style={{
                            color: `var(${pin.titleColor})`,
                          }}
                        >
                          {pin.title}
                        </p>
                        <p className={gsapDemoLabel}>{pin.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabPanel>
          </div>
        </Tabs>
      </DemoCard>
    </GSAPSection>
  );
};

export default ScrollTriggerSection;
