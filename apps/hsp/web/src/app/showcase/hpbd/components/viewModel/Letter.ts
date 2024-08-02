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
}

class PhaseFirework extends PhaseState {
  isSpawned = false
  spawnDelay = 0
  reachTime = options.firework.reachTime.base
  lineWidth = options.firework.lineWidth.base
  velocityY = 0
  prevPoints: number[][] = []

  start() {
    this.tick = 0
    this.velocityY = this.letter.options.y - Scene.halfHeight
    this.spawnDelay = (options.firework.spawnTime * Math.random()) | 0
    this.reachTime =
      (options.firework.reachTime.base +
        options.firework.reachTime.added * Math.random()) |
      0
    ;(this.lineWidth =
      options.firework.lineWidth.base +
      options.firework.lineWidth.added * Math.random()),
      (this.isSpawned = false)
    this.prevPoints = [[0, Scene.halfHeight, 0]]
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
    this.prevPoints.push([x, y, dx * this.lineWidth])
    const lineWidthFactor = 1 / (this.prevPoints.length - 1)

    // Draw the firework line
    for (let i = 1; i < this.prevPoints.length; i++) {
      const point = this.prevPoints[i]
      const prevPoint = this.prevPoints[i - 1]

      // Set the color and width of the line
      this.letter.ctx.strokeStyle = this.letter.options.color.toAlpha(
        i / this.prevPoints.length
      )
      this.letter.ctx.lineWidth = point[2] * lineWidthFactor * i
      // Draw
      this.letter.ctx.beginPath() // Begin a new path
      this.letter.ctx.moveTo(point[0], point[1]) // Move to the current point
      this.letter.ctx.lineTo(prevPoint[0], prevPoint[1]) // Draw a line to the previous point
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
    this.isCircleCreating = true
    this.isCircleFading = false

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
        this.drawLetter()

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
        this.drawLetter()
      }
    }
  }

  drawLetter() {
    this.letter.ctx.fillStyle = this.letter.options.color.toHSLA(70)
    this.letter.ctx.fillText(
      this.letter.options.char,
      this.letter.options.x + this.letter.options.offsetX,
      this.letter.options.y + this.letter.options.offsetY
    )
  }

  updateFireworkShards() {
    for (let i = 0; i < this.fireworkShards.length; i++) {
      this.fireworkShards[i].update()
      if (!this.fireworkShards[i].alive) {
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
  size = 0
  vx = 0
  vy = 0

  start() {
    this.tick = 0
    this.state = PhaseBalloonState.SPAWNING
    this.spawnTime = options.balloon.spawnTime * Math.random() || 0
    this.inflateTime =
      options.balloon.inflateTime.base +
        options.balloon.inflateTime.added * Math.random() || 0
    this.size =
      options.balloon.size.base + options.balloon.size.added * Math.random() ||
      0

    const rad =
      options.balloon.radian.base + options.balloon.radian.added * Math.random()
    const vel =
      options.balloon.velocity.base +
      options.balloon.velocity.added * Math.random()

    this.vx = Math.cos(rad) * vel
    this.vy = Math.sin(rad) * vel
  }
  update() {
    //
  }
}

class PhaseDone extends PhaseState {
  isNextPhase(): boolean {
    return false
  }
}

// function Letter( char, x, y ){
// 	this.char = char;
// 	this.x = x;
// 	this.y = y;

// 	this.dx = -ctx.measureText( char ).width / 2;
// 	this.dy = +opts.charSize / 2;

// 	this.fireworkDy = this.y - hh;

// 	var hue = x / calc.totalWidth * 360;

// 	this.color = 'hsl(hue,80%,50%)'.replace( 'hue', hue );
// 	this.lightAlphaColor = 'hsla(hue,80%,light%,alp)'.replace( 'hue', hue );
// 	this.lightColor = 'hsl(hue,80%,light%)'.replace( 'hue', hue );
// 	this.alphaColor = 'hsla(hue,80%,50%,alp)'.replace( 'hue', hue );

// 	this.reset();
// }
// Letter.prototype.reset = function(){

// 	this.phase = 'firework';
// 	this.tick = 0;
// 	this.spawned = false;
// 	this.spawningTime = opts.fireworkSpawnTime * Math.random() |0;
// 	this.reachTime = opts.fireworkBaseReachTime + opts.fireworkAddedReachTime * Math.random() |0;
// 	this.lineWidth = opts.fireworkBaseLineWidth + opts.fireworkAddedLineWidth * Math.random();
// 	this.prevPoints = [ [ 0, hh, 0 ] ];
// }
// Letter.prototype.step = function(){

// 	if( this.phase === 'firework' ){

// 		if( !this.spawned ){

// 			++this.tick;
// 			if( this.tick >= this.spawningTime ){

// 				this.tick = 0;
// 				this.spawned = true;
// 			}

// 		} else {

// 			++this.tick;

// 			var linearProportion = this.tick / this.reachTime,
// 					armonicProportion = Math.sin( linearProportion * TauQuarter ),

// 					x = linearProportion * this.x,
// 					y = hh + armonicProportion * this.fireworkDy;

// 			if( this.prevPoints.length > opts.fireworkPrevPoints )
// 				this.prevPoints.shift();

// 			this.prevPoints.push( [ x, y, linearProportion * this.lineWidth ] );

// 			var lineWidthProportion = 1 / ( this.prevPoints.length - 1 );

// 			for( var i = 1; i < this.prevPoints.length; ++i ){

// 				var point = this.prevPoints[ i ],
// 						point2 = this.prevPoints[ i - 1 ];

// 				ctx.strokeStyle = this.alphaColor.replace( 'alp', i / this.prevPoints.length );
// 				ctx.lineWidth = point[ 2 ] * lineWidthProportion * i;
// 				ctx.beginPath();
// 				ctx.moveTo( point[ 0 ], point[ 1 ] );
// 				ctx.lineTo( point2[ 0 ], point2[ 1 ] );
// 				ctx.stroke();

// 			}

// 			if( this.tick >= this.reachTime ){

// 				this.phase = 'contemplate';

// 				this.circleFinalSize = opts.fireworkCircleBaseSize + opts.fireworkCircleAddedSize * Math.random();
// 				this.circleCompleteTime = opts.fireworkCircleBaseTime + opts.fireworkCircleAddedTime * Math.random() |0;
// 				this.circleCreating = true;
// 				this.circleFading = false;

// 				this.circleFadeTime = opts.fireworkCircleFadeBaseTime + opts.fireworkCircleFadeAddedTime * Math.random() |0;
// 				this.tick = 0;
// 				this.tick2 = 0;

// 				this.shards = [];

// 				var shardCount = opts.fireworkBaseShards + opts.fireworkAddedShards * Math.random() |0,
// 						angle = Tau / shardCount,
// 						cos = Math.cos( angle ),
// 						sin = Math.sin( angle ),

// 						x = 1,
// 						y = 0;

// 				for( var i = 0; i < shardCount; ++i ){
// 					var x1 = x;
// 					x = x * cos - y * sin;
// 					y = y * cos + x1 * sin;

// 					this.shards.push( new Shard( this.x, this.y, x, y, this.alphaColor ) );
// 				}
// 			}

// 		}
// 	} else if( this.phase === 'contemplate' ){

// 		++this.tick;

// 		if( this.circleCreating ){

// 			++this.tick2;
// 			var proportion = this.tick2 / this.circleCompleteTime,
// 					armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;

// 			ctx.beginPath();
// 			ctx.fillStyle = this.lightAlphaColor.replace( 'light', 50 + 50 * proportion ).replace( 'alp', proportion );
// 			ctx.beginPath();
// 			ctx.arc( this.x, this.y, armonic * this.circleFinalSize, 0, Tau );
// 			ctx.fill();

// 			if( this.tick2 > this.circleCompleteTime ){
// 				this.tick2 = 0;
// 				this.circleCreating = false;
// 				this.circleFading = true;
// 			}
// 		} else if( this.circleFading ){

// 			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
// 			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );

// 			++this.tick2;
// 			var proportion = this.tick2 / this.circleFadeTime,
// 					armonic = -Math.cos( proportion * Math.PI ) / 2 + .5;

// 			ctx.beginPath();
// 			ctx.fillStyle = this.lightAlphaColor.replace( 'light', 100 ).replace( 'alp', 1 - armonic );
// 			ctx.arc( this.x, this.y, this.circleFinalSize, 0, Tau );
// 			ctx.fill();

// 			if( this.tick2 >= this.circleFadeTime )
// 				this.circleFading = false;

// 		} else {

// 			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
// 			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );
// 		}

// 		for( var i = 0; i < this.shards.length; ++i ){

// 			this.shards[ i ].step();

// 			if( !this.shards[ i ].alive ){
// 				this.shards.splice( i, 1 );
// 				--i;
// 			}
// 		}

// 		if( this.tick > opts.letterContemplatingWaitTime ){

// 			this.phase = 'balloon';

// 			this.tick = 0;
// 			this.spawning = true;
// 			this.spawnTime = opts.balloonSpawnTime * Math.random() |0;
// 			this.inflating = false;
// 			this.inflateTime = opts.balloonBaseInflateTime + opts.balloonAddedInflateTime * Math.random() |0;
// 			this.size = opts.balloonBaseSize + opts.balloonAddedSize * Math.random() |0;

// 			var rad = opts.balloonBaseRadian + opts.balloonAddedRadian * Math.random(),
// 					vel = opts.balloonBaseVel + opts.balloonAddedVel * Math.random();

// 			this.vx = Math.cos( rad ) * vel;
// 			this.vy = Math.sin( rad ) * vel;
// 		}
// 	} else if( this.phase === 'balloon' ){

// 		ctx.strokeStyle = this.lightColor.replace( 'light', 80 );

// 		if( this.spawning ){

// 			++this.tick;
// 			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
// 			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );

// 			if( this.tick >= this.spawnTime ){
// 				this.tick = 0;
// 				this.spawning = false;
// 				this.inflating = true;
// 			}
// 		} else if( this.inflating ){

// 			++this.tick;

// 			var proportion = this.tick / this.inflateTime,
// 			    x = this.cx = this.x,
// 					y = this.cy = this.y - this.size * proportion;

// 			ctx.fillStyle = this.alphaColor.replace( 'alp', proportion );
// 			ctx.beginPath();
// 			generateBalloonPath( x, y, this.size * proportion );
// 			ctx.fill();

// 			ctx.beginPath();
// 			ctx.moveTo( x, y );
// 			ctx.lineTo( x, this.y );
// 			ctx.stroke();

// 			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
// 			ctx.fillText( this.char, this.x + this.dx, this.y + this.dy );

// 			if( this.tick >= this.inflateTime ){
// 				this.tick = 0;
// 				this.inflating = false;
// 			}

// 		} else {

// 			this.cx += this.vx;
// 			this.cy += this.vy += opts.upFlow;

// 			ctx.fillStyle = this.color;
// 			ctx.beginPath();
// 			generateBalloonPath( this.cx, this.cy, this.size );
// 			ctx.fill();

// 			ctx.beginPath();
// 			ctx.moveTo( this.cx, this.cy );
// 			ctx.lineTo( this.cx, this.cy + this.size );
// 			ctx.stroke();

// 			ctx.fillStyle = this.lightColor.replace( 'light', 70 );
// 			ctx.fillText( this.char, this.cx + this.dx, this.cy + this.dy + this.size );

// 			if( this.cy + this.size < -hh || this.cx < -hw || this.cy > hw  )
// 				this.phase = 'done';

// 		}
// 	}
// }
