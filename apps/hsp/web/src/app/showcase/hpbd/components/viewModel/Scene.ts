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

  public static start(canvas: HTMLCanvasElement) {
    Scene.canvas = canvas
    Scene.ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    Scene.updateOnWindowResize()
    window.addEventListener('resize', Scene.updateOnWindowResize)
    
    Scene.clear()
    Scene.initLetters()
  }

  public static initLetters() {
    Scene.letters = []
    const letterWidth = options.text.letterSpacing + options.text.fontSize
    const lineHeight = options.text.lineHeight
    const lines = options.text.value.length

    Scene.textWidth = letterWidth * Math.max(...options.text.value.map(word => word.length))

    for (let i = 0; i < lines; i++) {
      const word = options.text.value[i]
      for (let j = 0; j < word.length; j++) {
        const char = word[j]
        const posX = j * letterWidth - (word.length - 1) * letterWidth / 2
        const posY = i * lineHeight - (lines - 1) * lineHeight / 2

        const letter = new Letter(char, posX, posY)
        Scene.letters.push(letter)
      }
    }
  }

  public static update() {
    const ctx = Scene.ctx
    if (!ctx) return
    Scene.animationId = window.requestAnimationFrame(Scene.update)
    // Draw background
    ctx.fillStyle = options.canvas.background
    ctx.fillRect(0, 0, Scene.width, Scene.height)
    // Move to center
    ctx.translate(Scene.halfWidth, Scene.halfHeight)

    // GlobalState.drawGuide() // Debug
    
    let isDone = true
    // Draw letters
    for (const letter of Scene.letters) {
      ctx.fillStyle = '#fff'
      letter.update()
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
