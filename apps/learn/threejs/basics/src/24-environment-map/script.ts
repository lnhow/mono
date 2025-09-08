import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {
  GLTFLoader,
  // GroundedSkybox,
  // RGBELoader,
} from 'three/examples/jsm/Addons.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')!

// Scene
const scene = new THREE.Scene()

/**
 * Torus Knot
 */
const torusKnot = new THREE.Mesh(
  new THREE.TorusKnotGeometry(1, 0.4, 100, 16),
  new THREE.MeshStandardMaterial({
    roughness: 0,
    metalness: 1,
    color: 0xaaaaaa,
  }),
)
torusKnot.position.y = 4
torusKnot.position.x = -4
scene.add(torusKnot)

const gltfLoader = new GLTFLoader()
gltfLoader.load(
  '/21-custom-models/models/FlightHelmet/glTF/FlightHelmet.gltf',
  (gltf) => {
    gltf.scene.scale.set(10, 10, 10)
    scene.add(gltf.scene)
  },
)

/**
 * Environment map
 */
// const ENVIRONMENT_MAP = '2'
// Cube texture
// - 6 images to represent 6 sides of something - like an environment map
// const cubeTextureLoader = new THREE.CubeTextureLoader()
// const environmentMap = cubeTextureLoader.load([
//   `/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/px.png`,
//   `/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/nx.png`,
//   `/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/py.png`,
//   `/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/ny.png`,
//   `/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/pz.png`,
//   `/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/nz.png`,
// ])

// scene.background = environmentMap
// Use the environment as lightsource
// scene.environment = environmentMap

// HDRI Equirectangular environment map
// - Contains 360 degree view of the surrounding
// - HDR
// const rgbeLoader = new RGBELoader() // HDR image loader
// rgbeLoader.load(`/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/2k.hdr`, (data) => {
//   data.mapping = THREE.EquirectangularReflectionMapping

//   // Normal background
//   // scene.background = data
//   // Ground-projected skybox
//   const skybox = new GroundedSkybox(data, 15, 80)
//   skybox.position.y = 15
//   scene.add(skybox)

//   scene.environment = data
// })

/**
 * Real-time environment map
 */
const textureLoader = new THREE.TextureLoader()
const environmentMap = textureLoader.load(
  '/24-environment-map/environmentMaps/blockadesLabsSkybox/interior_views_cozy_wood_cabin_with_cauldron_and_p.jpg',
)
environmentMap.mapping = THREE.EquirectangularReflectionMapping
environmentMap.colorSpace = THREE.SRGBColorSpace
scene.background = environmentMap

const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
  type: THREE.FloatType
})
const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget) // Camera that render 6 square textures
cubeCamera.layers.set(1)

scene.environment = cubeRenderTarget.texture

// Circular studio light
const studioLight = new THREE.Mesh(
  new THREE.TorusGeometry(8, 0.5),
  new THREE.MeshBasicMaterial({ color: new THREE.Color(10, 4, 2) }),
)
studioLight.position.y = 3.5
studioLight.layers.enable(1)
scene.add(studioLight)

scene.backgroundBlurriness = 0 // Background blur
scene.backgroundIntensity = 1 // Background brightness
scene.backgroundRotation.y = 1

scene.environmentIntensity = 2.5 // Environment's light source brightness
scene.environmentRotation.y = 2

gui
  .add(scene, 'backgroundBlurriness')
  .min(0)
  .max(1)
  .step(0.001)
  .name('Background Blur')
gui
  .add(scene, 'backgroundIntensity')
  .min(0)
  .max(10)
  .step(0.001)
  .name('Background Intensity')
gui
  .add(scene.backgroundRotation, 'y')
  .min(0)
  .max(Math.PI * 2)
  .step(0.001)
  .name('Background Rotation Y')
gui
  .add(scene, 'environmentIntensity')
  .min(0)
  .max(10)
  .step(0.001)
  .name('Environment Intensity')
gui
  .add(scene.environmentRotation, 'y')
  .min(0)
  .max(Math.PI * 2)
  .step(0.001)
  .name('Environment Rotation Y')

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)
camera.position.set(4, 5, 4)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.y = 3.5
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const tick = () => {
  // Time
  const elapsedTime = clock.getElapsedTime()

  if (studioLight) {
    studioLight.rotation.x = Math.sin(elapsedTime) * 2
    cubeCamera.update(renderer, scene)
  }

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
