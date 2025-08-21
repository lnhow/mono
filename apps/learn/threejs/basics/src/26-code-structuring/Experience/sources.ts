export type Source = {
  name: string;
  type: 'cubeTexture';
  path: string[];
} | {
  name: string;
  type: 'gltf' | 'texture';
  path: string;
}

const sources: Source[] = [
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
  }
]

export default sources;