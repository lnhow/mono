import { TextureLoader } from "three";

export type Source = {
  name: string;
  type: 'cubeTexture';
  path: string[];
} | {
  name: string;
  type: 'gltf' | 'texture';
  path: string;
}

const sources: readonly Source[] = [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      '/26-code-structuring/textures/environmentMap/nx.jpg',
      '/26-code-structuring/textures/environmentMap/ny.jpg',
      '/26-code-structuring/textures/environmentMap/nz.jpg',
      '/26-code-structuring/textures/environmentMap/px.jpg',
      '/26-code-structuring/textures/environmentMap/py.jpg',
      '/26-code-structuring/textures/environmentMap/pz.jpg',
    ]
  },
  {
    name: 'grassColorTexture',
    type: 'texture',
    path: '/26-code-structuring/textures/dirt/color.jpg'
  },
  {
    name: 'grassNormalTexture',
    type: 'texture',
    path: '/26-code-structuring/textures/dirt/normal.jpg'
  },
  {
    name: 'foxModel',
    type: 'gltf',
    path: '/26-code-structuring/models/Fox/glTF/Fox.gltf'
  },
]

export default sources;