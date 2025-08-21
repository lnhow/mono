export default class Sizes {
  // Setup
  public width = window.innerWidth
  public height = window.innerHeight
  public pixelRatio = Math.min(window.devicePixelRatio, 2)

  constructor() {
    // Handle resize
    window.addEventListener('resize', () => {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.pixelRatio = Math.min(window.devicePixelRatio, 2)
    })
  }
}