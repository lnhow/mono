import { CineonToneMapping, PCFSoftShadowMap, WebGLRenderer } from 'three'
import Experience from './Experience'

export default class Renderer {
  experience = Experience.instance
  sizes = this.experience.sizes
  scene = this.experience.scene
  canvas = this.experience.canvas
  camera = this.experience.camera

  instance = new WebGLRenderer({
    canvas: this.canvas,
    antialias: true,
  })

  constructor() {
    this.instance.toneMapping = CineonToneMapping
    this.instance.toneMappingExposure = 1.75
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = PCFSoftShadowMap
    this.resize()
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  update() {
    this.instance.render(this.scene, this.camera.instance)
  }
}
