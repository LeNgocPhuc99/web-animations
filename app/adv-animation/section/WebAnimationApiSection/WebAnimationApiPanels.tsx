import type { RefObject } from "react";

import { TabPanel } from "~/components";

import { cn } from "~/lib/utils";
import { ui } from "~/styles/classes";

type WebAnimationApiPanelsProps = {
  box1Ref: RefObject<HTMLDivElement | null>;
  box2Ref: RefObject<HTMLDivElement | null>;
  box3Ref: RefObject<HTMLDivElement | null>;
  box4Ref: RefObject<HTMLDivElement | null>;
  box5Ref: RefObject<HTMLDivElement | null>;
  ctrlBoxRef: RefObject<HTMLDivElement | null>;
  ctrlStateRef: RefObject<HTMLSpanElement | null>;
  ctrlTimeRef: RefObject<HTMLSpanElement | null>;
  ctrlSliderRef: RefObject<HTMLInputElement | null>;
  seekControl: (value: number) => void;
};

const WebAnimationApiPanels = ({
  box1Ref,
  box2Ref,
  box3Ref,
  box4Ref,
  box5Ref,
  ctrlBoxRef,
  ctrlStateRef,
  ctrlTimeRef,
  ctrlSliderRef,
  seekControl,
}: WebAnimationApiPanelsProps) => {
  return (
    <>
      <TabPanel value="element.animate()">
        <div className={cn(ui.demoArea, "gap-10 flex-wrap")}>
          <div className="text-center flex flex-col items-center gap-2">
            <div ref={box1Ref} className="waapi-box bg-adv">
              fade
            </div>
            <code style={{ fontSize: 10 }}>opacity</code>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <div ref={box2Ref} className="waapi-box bg-blue-500">
              slide
            </div>
            <code style={{ fontSize: 10 }}>transform</code>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <div ref={box3Ref} className="waapi-box bg-purple-500">
              color
            </div>
            <code style={{ fontSize: 10 }}>background</code>
          </div>
          <div className="text-center flex flex-col items-center gap-2">
            <div ref={box4Ref} className="waapi-box bg-teal-400 text-black">
              spring
            </div>
            <code style={{ fontSize: 10 }}>easing</code>
          </div>
        </div>
      </TabPanel>

      <TabPanel value="KeyframeEffect">
        <div className={cn(ui.demoArea, "gap-8 flex-wrap")}>
          <div ref={box5Ref} className="waapi-box bg-pink-400">
            effect
          </div>
          <div className="max-w-64 text-sm leading-8 text-text-muted">
            <code>KeyframeEffect</code> tách keyframes khỏi element, cho phép
            tái sử dụng blueprint animation và tạo <code>Animation</code> riêng.
          </div>
        </div>
      </TabPanel>

      <TabPanel value="playback control">
        <div className={cn(ui.demoArea, "gap-6 flex-wrap")}>
          <div
            ref={ctrlBoxRef}
            className="waapi-box bg-adv text-[9px]"
            style={{ willChange: "transform" }}
          >
            ctrl
          </div>
          <div className="flex min-w-52 flex-1 flex-col gap-2 ml-72">
            <div className="font-mono text-[11px] text-text-muted">
              state:{" "}
              <span ref={ctrlStateRef} className="text-adv">
                idle
              </span>
            </div>
            <div className="font-mono text-[11px] text-text-muted">
              currentTime:{" "}
              <span ref={ctrlTimeRef} className="text-text-base">
                0ms
              </span>
            </div>
            <input
              ref={ctrlSliderRef}
              type="range"
              min="0"
              max="1000"
              defaultValue="0"
              style={{ width: "100%" }}
              onInput={(event) => {
                seekControl(Number((event.target as HTMLInputElement).value));
              }}
            />
          </div>
        </div>
      </TabPanel>

      <TabPanel value="vs CSS vs GSAP">
        <div className={cn(ui.demoArea, "flex-col items-stretch p-6")}>
          <div className="overflow-x-auto">
            <table className="cmp-table min-w-125">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="text-blue-400">CSS</th>
                  <th className="text-adv">WAAPI</th>
                  <th className="text-green-400">GSAP</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Syntax", "@keyframes", "el.animate()", "gsap.to()"],
                  [
                    "Playback ctrl",
                    "CSS only",
                    "play/pause/seek",
                    "full control",
                  ],
                  ["Runtime JS", "No", "Yes", "Yes"],
                  ["GPU composite", "Always", "Always", "transform/opacity"],
                  ["Dependencies", "None", "None (native)", "~30kb"],
                  ["Browser support", "All", "Chrome/FF/Safari", "All"],
                  [
                    "Easing",
                    "cubic-bezier",
                    "cubic-bezier/steps",
                    "30+ ease types",
                  ],
                  ["Stagger", "Manual delay", "Manual", "Built-in"],
                  ["SVG animation", "Yes", "Yes", "Yes + plugins"],
                ].map((row, index) => (
                  <tr key={row[0]} className={index % 2 ? "bg-white/1" : ""}>
                    <td className="font-mono text-[11px] text-text-muted">
                      {row[0]}
                    </td>
                    <td className="text-center text-[12px]">{row[1]}</td>
                    <td className="text-center text-[12px]">{row[2]}</td>
                    <td className="text-center text-[12px]">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </TabPanel>
    </>
  );
};

export default WebAnimationApiPanels;
