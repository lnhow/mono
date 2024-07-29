import GlobalState from './Global'
import options from './options'

export default class Shard {
  x: number
  y: number
  vx: number
  vy: number
  prevPoints: number[][]
  color: string
  alive: boolean
  size: number

  constructor(x: number, y: number, vx: number, vy: number, color: string) {
    const velocity =
      options.firework.shard.velocity.base +
      options.firework.shard.velocity.added * Math.random()

    this.vx = vx * velocity
    this.vy = vy * velocity

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
    this.x += this.vx
    this.y += this.vy += options.gravity

    if (this.prevPoints.length > options.firework.shard.prevPoints) {
      this.prevPoints.shift()
    }

    this.prevPoints.push([this.x, this.y])

    const lineWidthProportion = this.size / this.prevPoints.length

    for (let k = 0; k < this.prevPoints.length - 1; k++) {
      const point = this.prevPoints[k],
        point2 = this.prevPoints[k + 1]

      ctx.strokeStyle = this.color.replace('alp', '' + k / this.prevPoints.length)
      ctx.lineWidth = k * lineWidthProportion
      ctx.beginPath()
      ctx.moveTo(point[0], point[1])
      ctx.lineTo(point2[0], point2[1])
      ctx.stroke()
    }

    if (this.prevPoints[0][1] > GlobalState.halfHeight) this.alive = false
  }
}
