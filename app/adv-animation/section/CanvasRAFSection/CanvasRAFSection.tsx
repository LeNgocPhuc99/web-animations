import { DemoCard, TabItem, TabList, TabPanel, Tabs } from "~/components";

import { ui } from "~/styles/classes";

import { cn } from "~/lib/utils";

import AdvAnimationSection from "../AdvAnimationSection";

import { canvasTabs, panelTabsCode, type CanvasTab } from "./data";
import useCanvasRAFSection from "./useCanvasRAFSection";

import "./canvas.css";

const CanvasRAFSection = () => {
  const {
    activeTab,
    burstParticles,
    noiseCanvasRef,
    particleCanvasRef,
    particleFpsRef,
    rippleCanvasRef,
    setActiveTab,
    toggleNoise,
    toggleParticles,
    toggleRipple,
  } = useCanvasRAFSection();

  const actions = (() => {
    switch (activeTab) {
      case "particle system":
        return (
          <div className="flex-center gap-4">
            <button className="btn btn-adv" onClick={toggleParticles}>
              ▶ Start / Stop
            </button>
            <button className="btn" onClick={burstParticles}>
              💥 Burst
            </button>
          </div>
        );
      case "ripple wave":
        return (
          <button className="btn btn-adv" onClick={toggleRipple}>
            ▶ Wave
          </button>
        );
      case "noise field":
        return (
          <button className="btn btn-adv" onClick={toggleNoise}>
            ▶ Flow
          </button>
        );
      default:
        return undefined;
    }
  })();

  return (
    <AdvAnimationSection id="canvas">
      <DemoCard code={panelTabsCode[activeTab]} action={actions}>
        <Tabs
          value={activeTab}
          onValueChange={(val) => setActiveTab(val as CanvasTab)}
        >
          <TabList>
            {canvasTabs.map((tab) => (
              <TabItem key={tab.value} value={tab.value}>
                {tab.label}
              </TabItem>
            ))}
          </TabList>
          <TabPanel value="particle system">
            <div
              className={cn(ui.demoArea, "p-0 items-stretch min-h-70 relative")}
            >
              <canvas ref={particleCanvasRef} className="w-full h-70"></canvas>
              <span ref={particleFpsRef} className="fps-label">
                0 fps
              </span>
            </div>
          </TabPanel>
          <TabPanel value="ripple wave">
            <div
              className={cn(ui.demoArea, "p-0 items-stretch min-h-70 relative")}
            >
              <canvas ref={rippleCanvasRef} className="w-full h-70"></canvas>
            </div>
          </TabPanel>
          <TabPanel value="noise field">
            <div
              className={cn(ui.demoArea, "p-0 items-stretch min-h-70 relative")}
            >
              <canvas ref={noiseCanvasRef} className="w-full h-70"></canvas>
            </div>
          </TabPanel>
          <TabPanel value="rAF game loop">
            <div
              className={cn(
                ui.demoArea,
                "flex-col items-stretch pt-6 py-8 gap-4",
              )}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="info-box tip">
                  <strong className="text-adv">requestAnimationFrame</strong>
                  <br />
                  Browser gọi callback trước mỗi repaint (~16.67ms ở 60fps). Tự
                  động throttle khi tab không active. Luôn pass timestamp để
                  tính delta time.
                </div>
                <div className="info-box warn">
                  <strong className="text-yellow-500">
                    setInterval / setTimeout
                  </strong>
                  <br />
                  Không sync với browser refresh → có thể chạy giữa frame →
                  visual tearing, jank. Chỉ dùng cho logic, không dùng cho
                  visual animation.
                </div>
                <div className="info-box good">
                  <strong className="text-green-500">Delta time pattern</strong>
                  <br />
                  Dùng <code>(timestamp - prevTime) / 1000</code> để tính delta
                  giây — animation speed không phụ thuộc frame rate của máy
                  người dùng.
                </div>
                <div className="info-box good">
                  <strong className="text-green-500">Canvas vs DOM</strong>
                  <b />
                  Canvas tốt hơn cho 100+ objects cùng lúc. DOM + CSS tốt hơn
                  cho &lt;50 objects có interaction phức tạp. WebGL (Three.js)
                  cho 10,000+.
                </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </DemoCard>
    </AdvAnimationSection>
  );
};

export default CanvasRAFSection;
