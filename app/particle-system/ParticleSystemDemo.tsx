import { useEffect, useMemo, useRef, useState } from "react";
import type {
  Particle,
  ParticleConfig,
  ParticleKind,
} from "./utils/particleTypes";
import { clearCanvas, resizeCanvasToDisplaySize } from "./utils/particleUtils";
import {
  createRainParticle,
  drawRainParticle,
  updateRainParticle,
} from "./utils/rainParticles";
import {
  createWaterParticle,
  drawWaterParticle,
  updateWaterParticle,
} from "./utils/waterParticles";
import "./particle-system-demo.css";

type ParticleSystemDemoProps = {
  initialMode?: ParticleKind;
  className?: string;
};

const DEFAULT_CONFIG: Record<ParticleKind, ParticleConfig> = {
  rain: {
    mode: "rain",
    maxParticles: 420,
    emitRate: 8,
    wind: -0.8,
  },
  water: {
    mode: "water",
    maxParticles: 280,
    emitRate: 5,
    wind: 0,
  },
};

export function ParticleSystemDemo({
  initialMode = "rain",
  className = "",
}: ParticleSystemDemoProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);

  const [mode, setMode] = useState<ParticleKind>(initialMode);
  const [isRunning, setIsRunning] = useState(true);
  const [intensity, setIntensity] = useState(1);

  const config = useMemo(() => DEFAULT_CONFIG[mode], [mode]);

  useEffect(() => {
    particlesRef.current = [];
  }, [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const emitParticles = () => {
      const size = resizeCanvasToDisplaySize(canvas);
      const particles = particlesRef.current;
      const emitCount = Math.round(config.emitRate * intensity);

      for (
        let i = 0;
        i < emitCount && particles.length < config.maxParticles;
        i++
      ) {
        particles.push(
          mode === "rain"
            ? createRainParticle(size, config.wind)
            : createWaterParticle(size),
        );
      }
    };

    const updateAndDraw = () => {
      const size = resizeCanvasToDisplaySize(canvas);
      const particles = particlesRef.current;

      clearCanvas(ctx, size);

      if (isRunning) {
        emitParticles();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];

        if (particle.kind === "rain") {
          updateRainParticle(particle, size, config.wind);
          drawRainParticle(ctx, particle);
        } else {
          updateWaterParticle(particle, size);
          drawWaterParticle(ctx, particle);
        }

        if (particle.age >= particle.life) {
          particles.splice(i, 1);
        }
      }

      rafRef.current = requestAnimationFrame(updateAndDraw);
    };

    rafRef.current = requestAnimationFrame(updateAndDraw);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [config, intensity, isRunning, mode]);

  return (
    <section className={`particle-demo ${className}`}>
      <div className="particle-demo__toolbar">
        <div>
          <h2>Particle System Demo</h2>
          <p>Canvas 2D demo: mưa rơi và dòng nước chảy.</p>
        </div>

        <div className="particle-demo__controls">
          <button
            type="button"
            className={mode === "rain" ? "is-active" : ""}
            onClick={() => setMode("rain")}
          >
            Mưa rơi
          </button>
          <button
            type="button"
            className={mode === "water" ? "is-active" : ""}
            onClick={() => setMode("water")}
          >
            Dòng nước
          </button>
          <button type="button" onClick={() => setIsRunning((value) => !value)}>
            {isRunning ? "Tạm dừng emit" : "Tiếp tục emit"}
          </button>
        </div>
      </div>

      <label className="particle-demo__slider">
        Cường độ
        <input
          type="range"
          min="0.2"
          max="2"
          step="0.1"
          value={intensity}
          onChange={(event) => setIntensity(Number(event.target.value))}
        />
        <span>{intensity.toFixed(1)}x</span>
      </label>

      <canvas ref={canvasRef} className="particle-demo__canvas" />
    </section>
  );
}

export default ParticleSystemDemo;
