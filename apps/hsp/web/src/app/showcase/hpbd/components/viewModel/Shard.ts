import Color from './Color'
import GlobalState from './Global'
import options from './options'

export default class Shard {
  x: number
  y: number
  dx: number
  dy: number
  prevPoints: number[][]
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

    this.prevPoints = [[x, y]]
    this.color = color

    this.alive = true

    this.size =
      options.firework.shard.size.base +
      options.firework.shard.size.added * Math.random()
  }

  update() {
    const ctx = GlobalState.ctx
    this.x += this.dx
    this.y += this.dy += options.gravity // vy is affected by gravity

    if (this.prevPoints.length > options.firework.shard.prevPoints) {
      this.prevPoints.shift()
    }

    this.prevPoints.push([this.x, this.y])

    const lineWidthFactor = this.size / this.prevPoints.length

    for (let k = 0; k < this.prevPoints.length - 1; k++) {
      const point = this.prevPoints[k],
        nextPoint = this.prevPoints[k + 1]

      ctx.strokeStyle = this.color.toAlpha(k / this.prevPoints.length)
      ctx.lineWidth = k * lineWidthFactor
      ctx.beginPath()
      ctx.moveTo(point[0], point[1])
      ctx.lineTo(nextPoint[0], nextPoint[1])
      ctx.stroke()
    }

    if (this.prevPoints[0][1] > GlobalState.halfHeight) this.alive = false
  }
}
