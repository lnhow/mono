import { EventDispatcher } from 'three'
import { Timer } from 'three/examples/jsm/Addons.js'

interface TimeEventMap {
  'tick': {}
}

export default class Time extends EventDispatcher<TimeEventMap> {
  public start = Date.now()
  public current = 0
  public elapsed = 0
  public delta = 16
  public timer = new Timer()

  constructor() {
    super()
    window.requestAnimationFrame(() => {
      this.tick()
    })
  }

  tick() {
    this.current = Date.now()
    this.elapsed = this.timer.getElapsed()
    this.delta = this.timer.getDelta()

    this.timer.update()
    this.dispatchEvent({ type: 'tick' })

    window.requestAnimationFrame(() => {
      this.tick()
    })
  }
}
