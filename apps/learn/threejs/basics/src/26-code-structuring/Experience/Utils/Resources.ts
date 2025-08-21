import { CubeTextureLoader, EventDispatcher, TextureLoader } from 'three'
import type { Source } from '../sources'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

export default class Resources extends EventDispatcher {
  loaders = {
    gltf: new GLTFLoader(),
    texture: new TextureLoader(),
    cubeTexture: new CubeTextureLoader(),
  }

  sources: Source[]
  toLoad: number
  loaded: number

  constructor(sources: Source[]) {
    super()

    this.sources = sources
    this.toLoad = sources.length
    this.loaded = 0
    this.load()
  }

  load() {
    for (const source of this.sources) {
      const loader = this.loaders[source.type]
      if (!loader) {
        console.warn(`No loader found for type: ${source.type}`)
        continue
      }

      loader.load(
        // @ts-ignore Typescript cannot infer the params type of the loader correctly
        source.path,
        (file) => {
          console.log(
            '\x1B[35m[Dev log]\x1B[0m -> Resources -> load -> file:',
            file,
          )
        },
        undefined,
        (error) => {
          console.error(`Error loading resource: ${source.path}`, error)
        },
      )
    }
  }
}
