import { CircleGeometry, Material, Mesh, MeshStandardMaterial, RepeatWrapping, SRGBColorSpace, Texture, type BufferGeometry } from 'three'
import Experience from '../Experience'

export default class Floor {
  experience = Experience.instance
  scene = this.experience.scene
  resources = this.experience.resources

  geometry?: BufferGeometry
  textures?: {
    color: Texture,
    normal: Texture,
  }
  materials?: Material
  mesh?: Mesh

  constructor() {
    this.setGeometry()
    this.setTextures()
    this.setMaterials()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new CircleGeometry(5, 64)
  }

  setTextures() {
    this.textures = {
      color: this.resources.loadedFiles.get('grassColorTexture') as Texture,
      normal: this.resources.loadedFiles.get('grassNormalTexture') as Texture,
    }

    this.textures.color.colorSpace = SRGBColorSpace
    this.textures.color.repeat.set(1.5, 1.5)
    this.textures.color.wrapS = RepeatWrapping
    this.textures.color.wrapT = RepeatWrapping
    
    this.textures.normal.repeat.set(1.5, 1.5)
    this.textures.normal.wrapS = RepeatWrapping
    this.textures.normal.wrapT = RepeatWrapping
  }

  setMaterials() {
    if (!this.textures) {
      return
    }
    this.materials = new MeshStandardMaterial({
      map: this.textures.color,
      normalMap: this.textures.normal
    })
  }

  setMesh() {
    this.mesh = new Mesh(
      this.geometry!,
      this.materials!
    )
    this.mesh.rotation.x = - Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
