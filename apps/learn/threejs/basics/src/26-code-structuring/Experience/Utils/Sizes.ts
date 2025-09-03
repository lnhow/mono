import { EventDispatcher } from 'three'

interface SizesEventMap {
  'resize': {}
}

export default class Sizes extends EventDispatcher<SizesEventMap> {
  // Setup
  public width = window.innerWidth
  public height = window.innerHeight
  public pixelRatio = Math.min(window.devicePixelRatio, 2)

  constructor() {
    super()
    // Handle resize
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)

      this.dispatchEvent({ type: 'resize' })
    })
  }
}
