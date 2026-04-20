import {
  type CubeTexture,
  CubeTextureLoader,
  EventDispatcher,
  type Texture,
  TextureLoader,
} from 'three'
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { Source } from '../sources'

export type LoadedFile = GLTF | Texture | CubeTexture

export interface ResourceEventMap {
  loadedAll: {}
}

export default class Resources extends EventDispatcher<ResourceEventMap> {
  loaders = {
    gltf: new GLTFLoader(),
    texture: new TextureLoader(),
    cubeTexture: new CubeTextureLoader(),
  }

  sources: readonly Source[]
  loadedCount: number

  loadedFiles: Map<string, LoadedFile> = new Map()

  constructor(sources: readonly Source[]) {
    super()

    this.sources = sources
    this.loadedCount = 0
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
        // @ts-expect-error Typescript cannot infer the params type of the loader correctly
        source.path,
        (file) => {
          this.onLoaded(source, file)
        },
        undefined,
        (error) => {
          console.error(`Error loading resource: ${source.path}`, error)
        },
      )
    }
  }

  onLoaded(source: Source, file: LoadedFile) {
    this.loadedFiles.set(source.name, file)
    this.loadedCount++

    // Check if all sources are loaded
    if (this.loadedCount === this.sources.length) {
      this.dispatchEvent({ type: 'loadedAll' })
    }
  }
}
