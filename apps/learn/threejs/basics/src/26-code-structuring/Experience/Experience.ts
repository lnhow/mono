import Sizes from './Utils/Sizes'

export default class Experience {
  public canvas: HTMLCanvasElement
  
  // Setup
  public sizes = new Sizes()

  constructor(canvas: HTMLCanvasElement) {
    // Options
    this.canvas = canvas

    console.log('Experience created')
    window.experience = this
  }
}

declare global {
  interface Window {
    experience: Experience
  }
}
