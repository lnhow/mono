import { stat } from 'fs'
import GlobalState from './Global'
import options from './options'
import Shard from './Shard'
import LetterColor from './Color'

export enum Phase {
  FIREWORK,
  MEDITATE,
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

type LetterState = {
  phase: Phase
  tick: number
  prevPoints: number[][]
  // shards: Shard[]
  // circle: {
  //   size: number
  //   time: number
  //   fadeTime: number
  //   isCreating: boolean
  //   isFading: boolean
  // }
}

export default class Letter {
  public ctx: CanvasRenderingContext2D
  public options: LetterOptions
   state!: LetterState
  public strategies: Record<Phase, PhaseStrategy> = {
    [Phase.FIREWORK]: new PhaseStrategyFirework(this),
    [Phase.MEDITATE]: new PhaseStrategyMeditate(this),
    [Phase.BALLOON]: new PhaseStrategyBalloon(this),
    [Phase.DONE]: new PhaseStrategyDone(this),
  }

  constructor(char: string, x: number, y: number) {
    this.ctx = GlobalState.ctx
    // Hue increases from left to right
    const hue = x / GlobalState.textWidth * 360
    this.options = {
      char,
      x,
      y,
      offsetX: -this.ctx.measureText(char).width / 2,
      offsetY: +options.text.fontSize / 2,
      color: new LetterColor(hue),
    }

    this.start()
  }
  start() {
    this.state = {
      phase: Phase.FIREWORK,
      tick: 0,
      prevPoints: [[0, GlobalState.halfHeight, 0]],
      // circle: {
      //   size: options.firework.circle.size.base + options.firework.circle.size.added * Math.random(),
      //   time: options.firework.circle.time.base + options.firework.circle.time.added * Math.random() | 0,
      //   fadeTime: options.firework.circle.fadeTime.base + options.firework.circle.fadeTime.added * Math.random() | 0,
      //   isCreating: true,
      //   isFading: false,
      // },
      // shards: [],
    }
    this.strategies[Phase.FIREWORK].start()
  }
  update() {
    this.ctx.fillStyle = this.options.color.toHSLA() //options.text.color
    this.ctx.fillText(
      this.options.char,
      this.options.x + this.options.offsetX,
      this.options.y + this.options.offsetY,
    )
    this.strategies[this.state.phase].update()
  }
}

class PhaseStrategy {
  protected letter: Letter
  constructor(letter: Letter) {
    this.letter = letter
  }
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // setOptions(_: Record<string, unknown>) {
  //   /* To be implemented */
  // }
  start() {
    /* To be implemented */
  }
  update() {
    if (!this.letter.state) return
    /* To be implemented */
  }
}

class PhaseStrategyFirework extends PhaseStrategy {
  isSpawned = false
  spawnDelay = 0
  reachTime = options.firework.reachTime.base
  lineWidth = options.firework.lineWidth.base
  velocityY = 0

  start() {
    this.velocityY = this.letter.options.y - GlobalState.halfHeight
    this.spawnDelay = options.firework.spawnTime * Math.random() | 0 
    this.reachTime = options.firework.reachTime.base + options.firework.reachTime.added * Math.random() | 0
    this.lineWidth = options.firework.lineWidth.base + options.firework.lineWidth.added * Math.random(),
    this.isSpawned = false
  }
  update() {
    const state = this.letter.state
    state.tick++
    if (!this.isSpawned) {
      this.waitToSpawn()
      return
    }
    this.drawFirework()
    if (state.tick >= this.reachTime) {
      this.nextPhase()
    }
  }
  /**
   * Draw a line from the bottom of the screen to the letter
   * The line arcs upwards
   */
  drawFirework() {
    const state = this.letter.state
    const dx = state.tick / this.reachTime // dx = Change in x
    const dy = Math.sin(dx * Math.PI / 2) // dy = Change in y
    const x = dx * this.letter.options.x // x = New x
    const y = dy * this.letter.options.y + GlobalState.halfHeight * (1 - dy) // y = v(y) * y0 + offsetY

    // Remove the oldest point
    if (state.prevPoints.length > options.firework.prevPoints) {
      state.prevPoints.shift()
    }
    // Add the new point
    state.prevPoints.push([x, y, dx * this.lineWidth])
    const lineWidthFactor = 1 / (state.prevPoints.length - 1)

    // Draw the firework line
    for (let i = 1; i < state.prevPoints.length; i++) {
      const point = state.prevPoints[i]
      const prevPoint = state.prevPoints[i - 1]

      // Set the color and width of the line
      this.letter.ctx.strokeStyle = this.letter.options.color.toAlpha(i / state.prevPoints.length)
      this.letter.ctx.lineWidth = point[2] * lineWidthFactor * i
      // Draw
      this.letter.ctx.beginPath() // Begin a new path
      this.letter.ctx.moveTo(point[0], point[1]) // Move to the current point
      this.letter.ctx.lineTo(prevPoint[0], prevPoint[1]) // Draw a line to the previous point
      this.letter.ctx.stroke() // Stroke the line
    }
  }
  waitToSpawn() {
    const state = this.letter.state

    if (state?.tick >= this.spawnDelay) {
      state.tick = 0
      this.isSpawned = true
    }
  }
  nextPhase() {
    console.log('[Dev Log] -> PhaseStrategyFirework -> nextPhase -> nextPhase:')
    this.letter.state.phase = Phase.DONE
    // this.letter.state.phase = Phase.MEDITATE
    // this.letter.strategies[Phase.MEDITATE].reset()
  }
}

class PhaseStrategyMeditate extends PhaseStrategy {
  update() {
    if (!this.letter.state) return
  }
}

class PhaseStrategyBalloon extends PhaseStrategy {
  update() {
    if (!this.letter.state) return
  }
}

class PhaseStrategyDone extends PhaseStrategy {
  update() {
    if (!this.letter.state) return
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
