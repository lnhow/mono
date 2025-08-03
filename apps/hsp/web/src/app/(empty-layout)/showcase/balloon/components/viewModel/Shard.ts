import Color from './Color'
import Scene from './Scene'
import options from './options'

export default class Shard {
  x: number
  y: number
  dx: number
  dy: number
  prevPoints: { x: number, y: number }[] = []
  color: Color
  alive: boolean
  size: number

  constructor(x: number, y: number, vx: number, vy: number, color: Color) {
    const velocity =
      options.firework.shard.velocity.base +
      options.firework.shard.velocity.added * Math.random()

    this.dx = vx * velocity
    this.dy = vy * velocity

    this.x = x
    this.y = y

    this.prevPoints = [{ x, y }]
    this.color = color

    this.alive = true

    this.size =
      options.firework.shard.size.base +
      options.firework.shard.size.added * Math.random()
  }

  update() {
    const ctx = Scene.ctx
    this.x += this.dx
    this.y += this.dy += options.gravity // vy is affected by gravity

    if (this.prevPoints.length > options.firework.shard.points) {
      this.prevPoints.shift()
    }

    this.prevPoints.push({ x: this.x, y: this.y })

    const lineWidthFactor = this.size / this.prevPoints.length

    for (let k = 1; k < this.prevPoints.length; k++) {
      const point = this.prevPoints[k]
      const prevPoint = this.prevPoints[k - 1]

      if (!point || !prevPoint) {
        continue
      }

      ctx.strokeStyle = this.color.toAlpha(k / this.prevPoints.length)
      ctx.lineWidth = k * lineWidthFactor
      ctx.beginPath()
      ctx.moveTo(point.x, point.y)
      ctx.lineTo(prevPoint.x, prevPoint.y)
      ctx.stroke()
    }

    if (this.prevPoints[0] && this.prevPoints[0].x > Scene.halfHeight) {
      this.alive = false
    }
  }
}
