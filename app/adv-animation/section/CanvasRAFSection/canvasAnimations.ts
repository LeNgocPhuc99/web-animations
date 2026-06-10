type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

type CanvasController = {
  canvas: HTMLCanvasElement;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  destroy: () => void;
};

const getCanvasSize = (canvas: HTMLCanvasElement) => {
  const width = canvas.clientWidth || canvas.offsetWidth || 600;
  const height = canvas.clientHeight || canvas.offsetHeight || 280;

  return { width, height };
};

const prepareCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const { width, height } = getCanvasSize(canvas);
  const dpr = window.devicePixelRatio || 1;

  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  return { ctx, width, height };
};

const createParticle = (width: number, height: number): Particle => ({
  x: Math.random() * width,
  y: Math.random() * height,
  vx: (Math.random() - 0.5) * 1.2,
  vy: (Math.random() - 0.5) * 1.2,
  r: Math.random() * 3 + 1,
  color: `hsl(${Math.random() * 60 + 15},90%,60%)`,
});

export const createParticleSystemController = ({
  canvas,
  fpsLabel,
}: {
  canvas: HTMLCanvasElement;
  fpsLabel: HTMLSpanElement | null;
}): CanvasController & { burst: () => void } => {
  let rafId: number | null = null;
  let running = false;
  let particles: Particle[] = [];
  let fpsTime = 0;
  let fpsCount = 0;

  const resetParticles = () => {
    const { width, height } = getCanvasSize(canvas);

    particles = Array.from({ length: 120 }, () => createParticle(width, height));
  };

  const stop = () => {
    running = false;

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const loop = (ts: number) => {
    if (!running) {
      return;
    }

    const prepared = prepareCanvas(canvas);
    if (!prepared) {
      stop();
      return;
    }

    const { ctx, width, height } = prepared;

    fpsCount += 1;
    if (ts - fpsTime > 1000) {
      if (fpsLabel) {
        fpsLabel.textContent = `${fpsCount} fps`;
      }
      fpsCount = 0;
      fpsTime = ts;
    }

    ctx.fillStyle = "rgba(6,6,16,0.18)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i += 1) {
      for (let j = i + 1; j < particles.length; j += 1) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(249,115,22,${(1 - distance / 80) * 0.3})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    rafId = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) {
      return;
    }

    if (!prepareCanvas(canvas)) {
      return;
    }

    resetParticles();
    fpsTime = 0;
    fpsCount = 0;
    running = true;
    rafId = window.requestAnimationFrame(loop);
  };

  const burst = () => {
    if (!running) {
      start();
    }

    const { width, height } = getCanvasSize(canvas);

    for (let i = 0; i < 30; i += 1) {
      const angle = (Math.PI * 2 * i) / 30;
      particles.push({
        x: width / 2,
        y: height / 2,
        vx: Math.cos(angle) * 4,
        vy: Math.sin(angle) * 4,
        r: Math.random() * 4 + 2,
        color: `hsl(${Math.random() * 60 + 15},100%,65%)`,
      });
    }
  };

  return {
    canvas,
    start,
    stop,
    toggle: () => {
      if (running) {
        stop();
        return;
      }

      start();
    },
    burst,
    destroy: stop,
  };
};

export const createRippleWaveController = ({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): CanvasController => {
  let rafId: number | null = null;
  let running = false;
  let time = 0;

  const stop = () => {
    running = false;

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const loop = () => {
    if (!running) {
      return;
    }

    const prepared = prepareCanvas(canvas);
    if (!prepared) {
      stop();
      return;
    }

    const { ctx, width, height } = prepared;

    ctx.clearRect(0, 0, width, height);

    const waves = [
      { freq: 0.018, amp: 30, phase: 0, color: "rgba(249,115,22,0.6)", speed: 1 },
      { freq: 0.025, amp: 20, phase: 1.5, color: "rgba(244,114,182,0.5)", speed: 1.3 },
      { freq: 0.012, amp: 40, phase: 3, color: "rgba(96,165,250,0.4)", speed: 0.7 },
    ];

    waves.forEach((wave) => {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x <= width; x += 2) {
        const y =
          height / 2 +
          Math.sin(x * wave.freq + time * wave.speed + wave.phase) *
            wave.amp +
          Math.sin(x * wave.freq * 0.5 + time * wave.speed * 0.5) *
            wave.amp *
            0.3;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = wave.color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });

    time += 0.04;
    rafId = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) {
      return;
    }

    if (!prepareCanvas(canvas)) {
      return;
    }

    time = 0;
    running = true;
    loop();
  };

  return {
    canvas,
    start,
    stop,
    toggle: () => {
      if (running) {
        stop();
        return;
      }

      start();
    },
    destroy: stop,
  };
};

export const createNoiseFieldController = ({
  canvas,
}: {
  canvas: HTMLCanvasElement;
}): CanvasController => {
  let rafId: number | null = null;
  let running = false;
  let time = 0;
  let particles: Array<{ x: number; y: number; color: string }> = [];

  const resetParticles = () => {
    const { width, height } = getCanvasSize(canvas);

    particles = Array.from({ length: 200 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      color: `hsla(${Math.random() * 60 + 200},80%,65%,0.7)`,
    }));
  };

  const stop = () => {
    running = false;

    if (rafId !== null) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  };

  const loop = () => {
    if (!running) {
      return;
    }

    const prepared = prepareCanvas(canvas);
    if (!prepared) {
      stop();
      return;
    }

    const { ctx, width, height } = prepared;

    ctx.fillStyle = "rgba(6,6,16,0.06)";
    ctx.fillRect(0, 0, width, height);

    particles.forEach((particle) => {
      const scale = 0.008;
      const angle =
        Math.sin(particle.x * scale + time * 0.3) *
        Math.cos(particle.y * scale + time * 0.2) *
        Math.PI *
        4;

      particle.x += Math.cos(angle) * 1.5;
      particle.y += Math.sin(angle) * 1.5;

      if (
        particle.x < 0 ||
        particle.x > width ||
        particle.y < 0 ||
        particle.y > height
      ) {
        particle.x = Math.random() * width;
        particle.y = Math.random() * height;
      }

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    time += 0.008;
    rafId = window.requestAnimationFrame(loop);
  };

  const start = () => {
    if (running) {
      return;
    }

    if (!prepareCanvas(canvas)) {
      return;
    }

    resetParticles();
    time = 0;
    running = true;
    loop();
  };

  return {
    canvas,
    start,
    stop,
    toggle: () => {
      if (running) {
        stop();
        return;
      }

      start();
    },
    destroy: stop,
  };
};

export type { CanvasController };
