import LetterColor from './Color'
import Letter, { Phase } from './Letter'
import options from './options'

export default class Scene {
  public static canvas: HTMLCanvasElement
  public static ctx: CanvasRenderingContext2D

  public static width = 0
  public static height = 0
  public static halfWidth = 0
  public static halfHeight = 0

  static letters: Letter[] = []
  public static textWidth = 0
  private static animationId: number
  // private static bgTick = 0
  // private static bgColor = new LetterColor(
  //   options.canvas.background.hue,
  //   options.canvas.background.saturation
  // )

  public static start(canvas: HTMLCanvasElement) {
    Scene.canvas = canvas
    Scene.ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    Scene.updateOnWindowResize()
    window.addEventListener('resize', Scene.updateOnWindowResize)

    Scene.clear()
    Scene.initLetters()
    BackgroundDrawer.update()
  }

  public static initLetters() {
    Scene.letters = []
    const letterWidth = options.text.letterSpacing + options.text.fontSize
    const lineHeight = options.text.lineHeight
    const lines = options.text.value.length

    Scene.textWidth =
      letterWidth * Math.max(...options.text.value.map((word) => word.length))

    for (let i = 0; i < lines; i++) {
      const word = options.text.value[i]
      if (!word) {
        continue
      }
      for (let j = 0; j < word.length; j++) {
        const char = word[j]
        if (!char) {
          continue
        }
        const posX = j * letterWidth - ((word.length - 1) * letterWidth) / 2
        const posY = i * lineHeight - ((lines - 1) * lineHeight) / 2

        const letter = new Letter(char, posX, posY)
        Scene.letters.push(letter)
      }
    }
  }

  public static update() {
    const ctx = Scene.ctx
    if (!ctx) return
    Scene.animationId = window.requestAnimationFrame(Scene.update)
    const isBgLoadingDone = BackgroundDrawer.update()
    if (!isBgLoadingDone) return

    // Move to center
    ctx.translate(Scene.halfWidth, Scene.halfHeight)

    // GlobalState.drawGuide() // Debug

    let isDone = true
    // Draw letters
    for (const letter of Scene.letters) {
      ctx.fillStyle = '#fff'
      letter.update()
      // if (!Scene.isTickBgColor && letter.current().phase === Phase.BLAST) {
      //   Scene.isTickBgColor = true
      // }
      if (letter.phase !== Phase.DONE) {
        isDone = false
      }
    }

    // Move to [0, 0]
    ctx.translate(-Scene.halfWidth, -Scene.halfHeight)

    if (isDone) {
      // reset letter state & loop back animation
      for (const letter of Scene.letters) {
        // re-start
        letter.start()
      }
    }
  }

  public static destroy() {
    BackgroundDrawer.start()
    Scene.clear()
    window.cancelAnimationFrame(Scene.animationId)
    window.removeEventListener('resize', Scene.updateOnWindowResize)
  }

  public static updateOnWindowResize() {
    const canvas = Scene.canvas
    Scene.width = canvas.width = window.innerWidth
    Scene.height = canvas.height = window.innerHeight
    Scene.halfWidth = Scene.width / 2
    Scene.halfHeight = Scene.height / 2

    Scene.ctx.font = `${options.text.fontSize}px ${options.text.fontFamily}`
  }

  public static clear() {
    // Scene.bgTick = 0
    // Scene.isTickBgColor = false
    Scene.ctx.clearRect(0, 0, Scene.width, Scene.height)
    Scene.ctx.resetTransform()
  }

  public static drawGuide() {
    const ctx = Scene.ctx
    ctx.fillStyle = 'red'
    ctx.arc(0, 0, 10, 0, Math.PI * 2)
    ctx.fill()
  }
}

class BackgroundDrawer {
  static tick = 0
  static isDoneLoading = false
  static backgroundColor = new LetterColor(
    options.canvas.backgroundLoading.h,
    options.canvas.backgroundLoading.s
  )
  public static start() {
    BackgroundDrawer.tick = 0
    BackgroundDrawer.isDoneLoading = false
  }

  public static update() {
    if (options.canvas.backgroundLoading.enable) {
      if (!BackgroundDrawer.isDoneLoading) {
        BackgroundDrawer.isDoneLoading =
          BackgroundDrawer.drawBackgroundLoading()
        return BackgroundDrawer.isDoneLoading
      }
      BackgroundDrawer.drawBackground(
        BackgroundDrawer.backgroundColor.toHSLA(
          options.canvas.backgroundLoading.lMax
        )
      )
      return true
    }
    BackgroundDrawer.drawBackground(options.canvas.background)
    return true
  }

  public static drawBackgroundLoading() {
    const ctx = Scene.ctx
    const progress = Math.min(
      BackgroundDrawer.tick / options.canvas.backgroundLoading.time,
      1
    )
    ctx.fillStyle = BackgroundDrawer.backgroundColor.toHSLA(
      options.canvas.backgroundLoading.l +
        Math.min(
          BackgroundDrawer.tick / options.canvas.backgroundLoading.time,
          1
        ) *
          (options.canvas.backgroundLoading.lMax -
            options.canvas.backgroundLoading.l)
    )
    ctx.fillRect(0, 0, Scene.width, Scene.height)
    if (progress === 1) {
      return true
    }
    BackgroundDrawer.tick++
    return false
  }

  public static drawBackground(color: string) {
    const ctx = Scene.ctx
    ctx.fillStyle = color
    ctx.fillRect(0, 0, Scene.width, Scene.height)
  }
}
