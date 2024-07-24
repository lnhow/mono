import Letter from './Letter'
import options from './options'

export default class GlobalState {
  public static canvas: HTMLCanvasElement
  public static ctx: CanvasRenderingContext2D

  public static width = 0
  public static height = 0
  public static halfWidth = 0
  public static halfHeight = 0

  static letters: Letter[] = []

  public static init(canvas: HTMLCanvasElement) {
    GlobalState.canvas = canvas
    GlobalState.ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    GlobalState.updateOnWindowResize()
    window.addEventListener('resize', GlobalState.updateOnWindowResize)
    
    GlobalState.clear()
    GlobalState.initLetters()
  }

  public static initLetters() {
    GlobalState.letters = []
    const letterWidth = options.text.letterSpacing + options.text.fontSize
    const lineHeight = options.text.lineHeight
    const lines = options.text.value.length
    for (let i = 0; i < lines; i++) {
      const word = options.text.value[i]
      for (let j = 0; j < word.length; j++) {
        const char = word[j]
        const posX = j * letterWidth - (word.length - 1) * letterWidth / 2
        const posY = i * lineHeight - (lines - 1) * lineHeight / 2

        const letter = new Letter(char, posX, posY)
        GlobalState.letters.push(letter)
      }
    }
    console.log('[Dev Log] -> GlobalState -> initLetters -> letters:', GlobalState.letters)
  }

  public static update() {
    const ctx = GlobalState.ctx
    if (!ctx) return
    window.requestAnimationFrame(GlobalState.update)
    // Draw background
    ctx.fillStyle = options.canvas.background
    ctx.fillRect(0, 0, GlobalState.width, GlobalState.height)
    // Move to center
    ctx.translate(GlobalState.halfWidth, GlobalState.halfHeight)

    GlobalState.drawGuide() // Debug
    
    // Draw letters
    for (const letter of GlobalState.letters) {
      ctx.fillStyle = '#fff'
      letter.update()
    }

    // Move to [0, 0]
    ctx.translate(-GlobalState.halfWidth, -GlobalState.halfHeight)
  }

  public static destroy() {
    GlobalState.clear()
    window.removeEventListener('resize', GlobalState.updateOnWindowResize)
  }

  public static updateOnWindowResize() {
    const canvas = GlobalState.canvas
    GlobalState.width = canvas.width = window.innerWidth
    GlobalState.height = canvas.height = window.innerHeight
    GlobalState.halfWidth = GlobalState.width / 2
    GlobalState.halfHeight = GlobalState.height / 2

    GlobalState.ctx.font = `${options.text.fontSize}px ${options.text.fontFamily}`
  }

  public static clear() {
    GlobalState.ctx.clearRect(0, 0, GlobalState.width, GlobalState.height)
    GlobalState.ctx.resetTransform()
  }

  public static drawGuide() {
    const ctx = GlobalState.ctx
    ctx.fillStyle = 'red'
    ctx.arc(0, 0, 10, 0, Math.PI * 2)
    ctx.fill()
  }
}
