import { BoxGeometry, Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three'
import Experience from '../Experience'
import Environment from './Environment'

export default class World {
  experience = Experience.instance
  scene = this.experience.scene
  environment = new Environment()

  constructor() {
    const testMesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial(),
    )

    this.scene.add(testMesh)
  }
}
