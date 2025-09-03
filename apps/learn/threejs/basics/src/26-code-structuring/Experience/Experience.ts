import { Material, Mesh, Scene } from 'three'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import World from './World/World'
import Resources from './Utils/Resources'

import sources from './sources'
import Debug from './Utils/Debug'

export default class Experience {
  public canvas: HTMLCanvasElement

  // Setup
  public debug = new Debug()
  public scene = new Scene()
  public sizes = new Sizes()
  public time = new Time()
  public resources = new Resources(sources)
  camera: Camera
  renderer: Renderer
  world: World

  _resizeBinded = this.resize.bind(this)
  _updateBinded = this.update.bind(this)

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

    this.sizes.addEventListener('resize', this._resizeBinded)
    this.time.addEventListener('tick', this._updateBinded)

    console.log('Experience created with canvas:', this.canvas)
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()

    this.world.update()
  }

  destroy() {
    this.sizes.removeEventListener('resize', this._resizeBinded)
    this.time.removeEventListener('tick', this._updateBinded)

    this.scene.traverse((child) => {
      if (child instanceof Mesh) {
        for (const key in child.material) {
          const mat = child.material[key]
          if (mat && typeof mat.dispose === 'function') {
            mat.dispose()
          }
        }
      }
    })

    this.camera.controls.dispose()
    this.renderer.instance.dispose()
    this.debug.ui?.destroy()
  }
}

declare global {
  interface Window {
    experience: Experience
  }
}
