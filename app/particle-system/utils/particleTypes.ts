export type ParticleKind = "rain" | "water"

export type Particle = {
  kind: ParticleKind
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  age: number
  life: number
  length?: number
  wobble?: number
  wobbleSpeed?: number
}

export type CanvasSize = {
  width: number
  height: number
}

export type ParticleConfig = {
  mode: ParticleKind
  maxParticles: number
  emitRate: number
  wind: number
}
