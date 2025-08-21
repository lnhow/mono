import { Scene } from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'

import sources from './sources'

export default class Experience {
  public canvas: HTMLCanvasElement

  // Setup
  public scene = new Scene()
  public sizes = new Sizes()
  public time = new Time()
  public resources = new Resources(sources)
  camera: Camera
  renderer: Renderer
  world: World

  private static _instance: Experience | null = null
  public static get instance(): Experience {
    if (!this._instance) {
      this._instance = new Experience(document.createElement('canvas'))
    }
    return this._instance
  }

  constructor(canvas: HTMLCanvasElement) {
    Experience._instance = this
    window.experience = this

    // Options
    this.canvas = canvas

    // Setup
    // These will cause a stackoverflow if initialized before _instance is set
    // because they reference the _instance
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.world = new World()

    this.sizes.addEventListener('resize', this.resize.bind(this))
    this.time.addEventListener('tick', this.update.bind(this))

    console.log('Experience created with canvas:', this.canvas)
  }

  resize() {
    console.log(
      'Window resized:',
      this.sizes.width,
      this.sizes.height,
      this.sizes.pixelRatio,
    )
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
  }
}

declare global {
  interface Window {
    experience: Experience
  }
}
