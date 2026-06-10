import type { CanvasSize, Particle } from "./particleTypes"

export function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min)
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function resizeCanvasToDisplaySize(canvas: HTMLCanvasElement): CanvasSize {
  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()
  const width = Math.max(1, Math.floor(rect.width * dpr))
  const height = Math.max(1, Math.floor(rect.height * dpr))

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width
    canvas.height = height
  }

  return { width, height }
}

export function clearCanvas(ctx: CanvasRenderingContext2D, size: CanvasSize) {
  ctx.clearRect(0, 0, size.width, size.height)
}

export function fadeByAge(particle: Particle): number {
  return clamp(1 - particle.age / particle.life, 0, 1)
}
