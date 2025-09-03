import {
  CubeTexture,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  SRGBColorSpace,
} from 'three'
import Experience from '../Experience'
import type GUI from 'lil-gui'

export default class Environment {
  experience = Experience.instance
  scene = this.experience.scene
  resource = this.experience.resources
  debugFolder?: GUI

  sunLight?: DirectionalLight
  environmentMap = {
    texture: this.resource.loadedFiles.get(
      'environmentMapTexture',
    ) as CubeTexture,
    intensity: 1.25,
    updateSceneMaterials: () => {
      this.scene.traverse((child) => {
        if (
          child instanceof Mesh &&
          child.material instanceof MeshStandardMaterial
        ) {
          child.material.envMap = this.environmentMap.texture
          child.material.envMapIntensity = this.environmentMap.intensity
          child.material.needsUpdate = true
        }
      })
    },
  }

  constructor() {
    this.initDebug()
    this.initSunLight()
    this.initEnvironmentMap()
  }

  initSunLight() {
    // Init sunlight
    this.sunLight = new DirectionalLight('#ffffff', 3)
    this.sunLight.castShadow = true
    this.sunLight.shadow.camera.far = 15
    this.sunLight.shadow.mapSize.set(1024, 1024)
    this.sunLight.shadow.normalBias = 0.05
    this.sunLight.position.set(3, 3, -2.25)
    this.scene.add(this.sunLight)

    if (!this.debugFolder) {
      return
    }

    this.debugFolder
      .add(this.sunLight, 'intensity')
      .name('sunLightIntensity')
      .min(0)
      .max(10)
      .step(0.001)

    this.debugFolder
      .add(this.sunLight.position, 'x')
      .name('sunLightX')
      .min(-10)
      .max(10)
      .step(0.001)

    this.debugFolder
      .add(this.sunLight.position, 'y')
      .name('sunLightY')
      .min(-10)
      .max(10)
      .step(0.001)

    this.debugFolder
      .add(this.sunLight.position, 'z')
      .name('sunLightZ')
      .min(-10)
      .max(10)
      .step(0.001)
  }

  initEnvironmentMap() {
    // Init environment map
    this.environmentMap.texture.colorSpace = SRGBColorSpace
    this.scene.environment = this.environmentMap.texture
    this.environmentMap.updateSceneMaterials()

    if (!this.debugFolder) {
      return
    }
    this.debugFolder
      .add(this.environmentMap, 'intensity')
      .name('envMapIntensity')
      .min(0)
      .max(4)
      .step(0.001)
      .onChange(this.environmentMap.updateSceneMaterials)
  }

  initDebug() {
    if (!this.experience.debug.ui) {
      return
    }

    this.debugFolder = this.experience.debug.ui.addFolder('enviroment')
  }
}
