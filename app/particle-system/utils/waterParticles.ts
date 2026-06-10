import type { CanvasSize, Particle } from "./particleTypes"
import { fadeByAge, randomBetween } from "./particleUtils"

export function createWaterParticle(size: CanvasSize): Particle {
  const streamCenterY = size.height * 0.58
  const streamHeight = Math.max(50, size.height * 0.16)

  return {
    kind: "water",
    x: randomBetween(-60, -10),
    y: streamCenterY + randomBetween(-streamHeight / 2, streamHeight / 2),
    vx: randomBetween(3.5, 8),
    vy: randomBetween(-0.45, 0.45),
    size: randomBetween(2, 5),
    opacity: randomBetween(0.18, 0.48),
    age: 0,
    life: randomBetween(160, 260),
    wobble: randomBetween(0, Math.PI * 2),
    wobbleSpeed: randomBetween(0.03, 0.08),
  }
}

export function updateWaterParticle(particle: Particle, size: CanvasSize) {
  const streamCenterY = size.height * 0.58

  particle.wobble = (particle.wobble ?? 0) + (particle.wobbleSpeed ?? 0.04)
  particle.x += particle.vx
  particle.y += particle.vy + Math.sin(particle.wobble) * 0.35
  particle.y += (streamCenterY - particle.y) * 0.006
  particle.age += 1

  if (particle.x > size.width + 80) {
    particle.age = particle.life
  }
}

export function drawWaterParticle(ctx: CanvasRenderingContext2D, particle: Particle) {
  const alpha = particle.opacity * fadeByAge(particle)

  ctx.save()
  ctx.beginPath()
  ctx.ellipse(
    particle.x,
    particle.y,
    particle.size * 2.2,
    particle.size,
    0,
    0,
    Math.PI * 2,
  )
  ctx.fillStyle = `rgba(80, 180, 255, ${alpha})`
  ctx.fill()
  ctx.restore()
}
