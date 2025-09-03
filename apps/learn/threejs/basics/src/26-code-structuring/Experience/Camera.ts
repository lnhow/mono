import { PerspectiveCamera } from 'three'
import Experience from './Experience'
import { OrbitControls } from 'three/examples/jsm/Addons.js'

export default class Camera {
  experience = Experience.instance
  sizes = this.experience.sizes
  scene = this.experience.scene
  canvas = this.experience.canvas

  controls: OrbitControls

  public instance: PerspectiveCamera

  constructor() {
    this.instance = new PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)

    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
  }
}
