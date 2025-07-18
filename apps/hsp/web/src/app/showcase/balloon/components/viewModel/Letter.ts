import Scene from './Scene'
import options from './options'
import Shard from './Shard'
import LetterColor from './Color'

export enum Phase {
  FIREWORK,
  BLAST,
  BALLOON,
  DONE,
}

type LetterOptions = {
  char: string
  x: number
  y: number
  offsetX: number
  offsetY: number
  color: LetterColor
}

export default class Letter {
  public ctx: CanvasRenderingContext2D
  public options: LetterOptions
  public phases: Record<Phase, PhaseState> = {
    [Phase.FIREWORK]: new PhaseFirework(this),
    [Phase.BLAST]: new PhaseBlast(this),
    [Phase.BALLOON]: new PhaseBalloon(this),
    [Phase.DONE]: new PhaseDone(this),
  }
  public nextPhase: Record<Phase, Phase> = {
    [Phase.FIREWORK]: Phase.BLAST,
    [Phase.BLAST]: Phase.BALLOON,
    [Phase.BALLOON]: Phase.DONE,
    [Phase.DONE]: Phase.DONE,
  }
  phase: Phase

  constructor(char: string, x: number, y: number) {
    this.ctx = Scene.ctx
    // Hue increases from left to right
    const hue = (x / Scene.textWidth) * 360
    this.options = {
      char,
      x,
      y,
      offsetX: -this.ctx.measureText(char).width / 2,
      offsetY: +options.text.fontSize / 2,
      color: new LetterColor(hue),
    }

    this.phase = Phase.FIREWORK
    this.start()
  }
  start() {
    this.phase = Phase.FIREWORK
    this.phases[this.phase].start()
  }
  update() {
    // this.ctx.fillStyle = this.options.color.toHSLA() //options.text.color
    // this.ctx.fillText(
    //   this.options.char,
    //   this.options.x + this.options.offsetX,
    //   this.options.y + this.options.offsetY,
    // )
    this.phases[this.phase].update()
    if (this.phases[this.phase].isNextPhase()) {
      this.goToNextPhase()
    }
  }
  goToNextPhase() {
    this.phase = this.nextPhase[this.phase]
    this.phases[this.phase].start()
  }

  drawLetter(
    x: number = this.options.x + this.options.offsetX,
    y: number = this.options.y + this.options.offsetY
  ) {
    this.ctx.fillStyle = this.options.color.toHSLA(70)
    this.ctx.fillText(this.options.char, x, y)
  }
  current() {
    return {
      phase: this.phase,
      tick: this.phases[this.phase].currentTick(),
    }
  }
}

class PhaseState {
  protected tick = 0
  protected letter: Letter
  constructor(letter: Letter) {
    this.letter = letter
  }
  start() {
    /* To be implemented */
  }
  update() {
    /* To be implemented */
  }
  isNextPhase() {
    return true
  }
  currentTick() {
    return this.tick
  }
}

class PhaseFirework extends PhaseState {
  isSpawned = false
  spawnDelay = 0
  reachTime = options.firework.reachTime.base
  lineWidth = options.firework.lineWidth.base
  velocityY = 0
  prevPoints: { x: number, y: number, width: number }[] = []

  start() {
    this.tick = 0
    this.velocityY = this.letter.options.y - Scene.halfHeight
    this.spawnDelay = (options.firework.spawnTime * Math.random()) | 0
    this.reachTime =
      (options.firework.reachTime.base +
        options.firework.reachTime.added * Math.random()) |
      0
    this.lineWidth =
      options.firework.lineWidth.base +
      options.firework.lineWidth.added * Math.random()
    this.isSpawned = false
    this.prevPoints = [{ x: 0, y: Scene.halfHeight, width: 0 }]
  }
  update() {
    this.tick++
    if (!this.isSpawned) {
      this.waitToSpawn()
      return
    }
    this.drawFirework()
  }
  isNextPhase(): boolean {
    return this.tick >= this.reachTime
  }
  /**
   * Draw a line from the bottom of the screen to the letter
   * The line arcs upwards
   */
  drawFirework() {
    const dx = this.tick / this.reachTime // dx = Change in x
    const dy = Math.sin((dx * Math.PI) / 2) // dy = Change in y
    const x = dx * this.letter.options.x // x = New x
    const y = dy * this.letter.options.y + Scene.halfHeight * (1 - dy) // y = v(y) * y0 + offsetY

    // Remove the oldest point
    if (this.prevPoints.length > options.firework.points) {
      this.prevPoints.shift()
    }
    // Add the new point
    this.prevPoints.push({ x, y, width: dx * this.lineWidth })
    const lineWidthFactor = 1 / (this.prevPoints.length - 1)

    // Draw the firework line
    for (let i = 1; i < this.prevPoints.length; i++) {
      const point = this.prevPoints[i]
      const prevPoint = this.prevPoints[i - 1]

      if (!point || !prevPoint) {
        continue // Skip if point or prevPoint is undefined
      }

      // Set the color and width of the line
      this.letter.ctx.strokeStyle = this.letter.options.color.toAlpha(
        i / this.prevPoints.length
      )
      this.letter.ctx.lineWidth = point.width * lineWidthFactor * i
      // Draw
      this.letter.ctx.beginPath() // Begin a new path
      this.letter.ctx.moveTo(point.x, point.y) // Move to the current point
      this.letter.ctx.lineTo(prevPoint.x, prevPoint.y) // Draw a line to the previous point
      this.letter.ctx.stroke() // Stroke the line
    }
  }
  waitToSpawn() {
    if (this.tick >= this.spawnDelay) {
      this.tick = 0
      this.isSpawned = true
    }
  }
}

enum PhaseBlastState {
  CREATING,
  FADING,
  LETTER,
}

class PhaseBlast extends PhaseState {
  static Tau = Math.PI * 2 // Tau = 2π
  circleTick = 0
  circleSize = options.firework.circle.size.base
  circleTime = options.firework.circle.time.base
  circleFadeTime = options.firework.circle.fadeTime.base
  state: PhaseBlastState = PhaseBlastState.CREATING
  fireworkShards: Shard[] = []

  start() {
    this.tick = 0
    this.circleTick = 0

    // Set the blast circle size, time, and fade time
    this.circleSize =
      options.firework.circle.size.base +
      options.firework.circle.size.added * Math.random()
    this.circleTime =
      options.firework.circle.time.base +
        options.firework.circle.time.added * Math.random() || 0
    this.circleFadeTime =
      options.firework.circle.fadeTime.base +
        options.firework.circle.fadeTime.added * Math.random() || 0
    this.fireworkShards = []

    // Create the firework shards
    const shardCount =
      options.firework.shard.count.base +
        options.firework.shard.count.added * Math.random() || 0
    const angle = PhaseBlast.Tau / shardCount
    const cos = Math.cos(angle)
    const sin = Math.sin(angle)
    let shardX = 1
    let shardY = 0
    for (let i = 0; i < shardCount; i++) {
      // Rotate the shard
      const orginalShardX = shardX
      shardX = shardX * cos - shardY * sin
      shardY = shardY * cos + orginalShardX * sin
      this.fireworkShards.push(
        new Shard(
          this.letter.options.x,
          this.letter.options.y,
          shardX,
          shardY,
          this.letter.options.color
        )
      )
    }
  }
  update() {
    this.tick++
    this.drawBlastCircle()
    this.updateFireworkShards()
  }
  isNextPhase(): boolean {
    return this.tick > options.text.waitTime
  }

  drawBlastCircle() {
    switch (this.state) {
      // Draw firework blast circle
      case PhaseBlastState.CREATING: {
        this.circleTick++
        const progressX = this.circleTick / this.circleTime
        const progressY = -Math.cos(progressX * Math.PI) / 2 + 0.5
        this.letter.ctx.beginPath()
        this.letter.ctx.fillStyle = this.letter.options.color.toHSLA(
          50 + 50 * progressX,
          progressX
        )
        this.letter.ctx.arc(
          this.letter.options.x,
          this.letter.options.y,
          progressY * this.circleSize,
          0,
          PhaseBlast.Tau
        )
        this.letter.ctx.fill()

        if (this.circleTick > this.circleTime) {
          this.circleTick = 0
          this.state = PhaseBlastState.FADING
        }
        return
      }
      // Transition fading blast circle to the letter
      case PhaseBlastState.FADING: {
        this.letter.drawLetter()

        this.circleTick++

        const progressX = this.circleTick / this.circleFadeTime
        const progressY = -Math.cos(progressX * Math.PI) / 2 + 0.5

        this.letter.ctx.beginPath()
        this.letter.ctx.fillStyle = this.letter.options.color.toHSLA(
          100,
          1 - progressY
        )
        this.letter.ctx.arc(
          this.letter.options.x,
          this.letter.options.y,
          this.circleSize,
          0,
          PhaseBlast.Tau
        )
        this.letter.ctx.fill()

        if (this.circleTick >= this.circleFadeTime) {
          this.state = PhaseBlastState.LETTER
        }
        return
      }
      // The blast circle has faded, draw only the letter now
      default: {
        this.letter.drawLetter()
      }
    }
  }

  updateFireworkShards() {
    for (let i = 0; i < this.fireworkShards.length; i++) {
      this.fireworkShards[i]?.update()

      if (!this.fireworkShards[i]?.alive) {
        this.fireworkShards.splice(i, 1)
        i--
      }
    }
  }
}

enum PhaseBalloonState {
  SPAWNING,
  INFLATING,
  DONE,
}

class PhaseBalloon extends PhaseState {
  state = PhaseBalloonState.SPAWNING
  spawnTime = 0
  inflateTime = 0
  baloonSize = 0
  vx = 0
  vy = 0
  baloonX = 0
  baloonY = 0

  start() {
    this.tick = 0
    this.state = PhaseBalloonState.SPAWNING
    this.spawnTime = options.balloon.spawnTime * Math.random() || 0
    this.inflateTime =
      options.balloon.inflateTime.base +
        options.balloon.inflateTime.added * Math.random() || 0
    this.baloonSize =
      options.balloon.size.base + options.balloon.size.added * Math.random() ||
      0

    const rad =
      options.balloon.radian.base + options.balloon.radian.added * Math.random()
    const vel =
      options.balloon.velocity.base +
      options.balloon.velocity.added * Math.random()

    this.vx = Math.cos(rad) * vel
    this.vy = Math.sin(rad) * vel
    this.baloonX = this.letter.options.x
    this.baloonY = this.letter.options.y
  }
  update() {
    const ctx = this.letter.ctx
    ctx.strokeStyle = this.letter.options.color.toHSLA(80)
    this.tick++
    switch (this.state) {
      case PhaseBalloonState.SPAWNING: {
        this.letter.drawLetter()
        if (this.tick >= this.spawnTime) {
          this.tick = 0
          this.state = PhaseBalloonState.INFLATING
        }
        break
      }
      case PhaseBalloonState.INFLATING: {
        const percentage = this.tick / this.inflateTime
        const tickBaloonSize = this.baloonSize * percentage
        const x = (this.baloonX = this.letter.options.x)
        const y = (this.baloonY = this.letter.options.y - tickBaloonSize)

        ctx.fillStyle = this.letter.options.color.toAlpha(percentage)
        this.drawBalloon(x, y, tickBaloonSize)
        this.drawBalloonString(x, y, this.baloonY) // Draw a string from the letter to the balloon

        this.letter.drawLetter()

        if (this.tick >= this.inflateTime) {
          this.tick = 0
          this.state = PhaseBalloonState.DONE
        }
        break
      }
      default: {
        this.baloonX += this.vx
        this.baloonY += this.vy -= options.gravity // minus gravity to make the balloon float up
        ctx.fillStyle = this.letter.options.color.toHSLA()
        this.drawBalloon(this.baloonX, this.baloonY, this.baloonSize)
        this.drawBalloonString(this.baloonX, this.baloonY, this.baloonY + this.baloonSize)

        this.letter.drawLetter(
          this.baloonX + this.letter.options.offsetX,
          this.baloonY + this.letter.options.offsetY + this.baloonSize
        )
      }
    }
  }
  isNextPhase(): boolean {
    return (
      this.baloonY + this.baloonSize < -Scene.halfHeight ||
      this.baloonX < -Scene.halfWidth ||
      this.baloonY > Scene.halfWidth
    )
  }

  drawBalloon(x: number, y: number, size: number) {
    const ctx = this.letter.ctx
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.bezierCurveTo(
      x - size / 2,
      y - size / 2,
      x - size / 4,
      y - size,
      x,
      y - size
    )
    ctx.bezierCurveTo(x + size / 4, y - size, x + size / 2, y - size / 2, x, y)
    ctx.fill()
  }
  drawBalloonString(x: number, fromY: number, toY: number) {
    const ctx = this.letter.ctx
    const originalLineWidth = ctx.lineWidth
    ctx.lineWidth = options.balloon.string.size
    ctx.beginPath()
    ctx.moveTo(x, fromY)
    ctx.lineTo(x, toY)
    ctx.stroke()
    ctx.lineWidth = originalLineWidth
  }
}

class PhaseDone extends PhaseState {
  isNextPhase(): boolean {
    return false
  }
}
