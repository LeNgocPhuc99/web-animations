import type { CanvasSize, Particle } from "./particleTypes"
import { fadeByAge, randomBetween } from "./particleUtils"

export function createRainParticle(size: CanvasSize, wind = -0.8): Particle {
  return {
    kind: "rain",
    x: randomBetween(0, size.width),
    y: randomBetween(-80, -10),
    vx: wind + randomBetween(-0.4, 0.4),
    vy: randomBetween(14, 24),
    size: randomBetween(1, 2.2),
    opacity: randomBetween(0.35, 0.75),
    age: 0,
    life: randomBetween(80, 140),
    length: randomBetween(14, 28),
  }
}

export function updateRainParticle(particle: Particle, size: CanvasSize, wind = -0.8) {
  particle.vx += (wind - particle.vx) * 0.02
  particle.x += particle.vx
  particle.y += particle.vy
  particle.age += 1

  if (particle.y > size.height + 40) {
    particle.age = particle.life
  }
}

export function drawRainParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  const alpha = particle.opacity * fadeByAge(particle)
  const length = particle.length ?? 18

  ctx.save()
  ctx.beginPath()
  ctx.moveTo(particle.x, particle.y)
  ctx.lineTo(particle.x - particle.vx * 1.5, particle.y - length)
  ctx.strokeStyle = `rgba(180, 220, 255, ${alpha})`
  ctx.lineWidth = particle.size
  ctx.lineCap = "round"
  ctx.stroke()
  ctx.restore()
}
