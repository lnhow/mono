import Experience from '../Experience'
import Environment from './Environment'
import Floor from './Floor'
import Fox from './Fox'

export default class World {
  experience = Experience.instance
  scene = this.experience.scene
  time = this.experience.time

  environment?: Environment
  floor?: Floor
  fox?: Fox

  constructor() {
    this.experience.resources.addEventListener('loadedAll', () => {
      this.environment = new Environment()
      this.floor = new Floor()
      this.fox = new Fox()
    })
  }

  update() {
    this.fox?.update()
  }
}
