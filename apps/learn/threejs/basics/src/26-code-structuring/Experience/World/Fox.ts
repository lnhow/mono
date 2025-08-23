import type { GLTF } from 'three/examples/jsm/Addons.js'
import Experience from '../Experience'
import { AnimationAction, AnimationMixer, Mesh } from 'three'
import type GUI from 'lil-gui'

export default class Fox {
  experience = Experience.instance
  scene = this.experience.scene
  time = this.experience.time
  debugFolder?: GUI

  resource = this.experience.resources.loadedFiles.get('foxModel') as GLTF
  model = this.resource.scene
  animation?: {
    mixer: AnimationMixer
    action?: Record<string, AnimationAction>
    play: (name: string) => void
  }

  constructor() {
    this.model.scale.set(0.02, 0.02, 0.02)
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true
      }
    })

    this.initDebug()
    this.setAnimation()
  }

  setAnimation() {
    this.animation = {
      mixer: new AnimationMixer(this.model),
      play: (name) => {
        if (!this.animation?.action?.[name]) {
          return
        }
        const newAction = this.animation.action[name]
        const oldAction = this.animation.action.current

        newAction.reset()
        newAction.play()
        if (oldAction) {
          newAction.crossFadeFrom(oldAction, 1)
        }
        this.animation.action.current = newAction
      },
    }
    this.animation.action = {
      idle: this.animation.mixer.clipAction(this.resource.animations[0]),
      walking: this.animation.mixer.clipAction(this.resource.animations[1]),
      running: this.animation.mixer.clipAction(this.resource.animations[2]),
    }
    this.animation.play('idle')

    if (!this.debugFolder) {
      return
    }

    const debugObj = {
      playIdle: () => this.animation?.play('idle'),
      playWalking: () => this.animation?.play('walking'),
      playRunning: () => this.animation?.play('running'),
    }
    this.debugFolder.add(debugObj, 'playIdle')
    this.debugFolder.add(debugObj, 'playWalking')
    this.debugFolder.add(debugObj, 'playRunning')
  }

  update() {
    this.animation?.mixer.update(this.time.delta * 0.5)
  }

  initDebug() {
    if (!this.experience.debug.ui) {
      return
    }

    this.debugFolder = this.experience.debug.ui.addFolder('fox')
  }
}
