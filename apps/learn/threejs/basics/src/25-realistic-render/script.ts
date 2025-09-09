import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import {
  DRACOLoader,
  GLTFLoader,
  // GroundedSkybox,
  RGBELoader,
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

const gltfLoader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/common/draco/')
gltfLoader.setDRACOLoader(dracoLoader)

// gltfLoader.load(
//   '/21-custom-models/models/FlightHelmet/glTF/FlightHelmet.gltf',
//   (gltf) => {
//     gltf.scene.scale.set(10, 10, 10)
//     scene.add(gltf.scene)
//     updateSceneShadows()
//   },
// )

gltfLoader.load(
  '/21-custom-models/models/Burger.glb',
  (gltf) => {
    gltf.scene.scale.set(0.5, 0.5, 0.5)
    gltf.scene.position.set(0, 2.5, 0)
    scene.add(gltf.scene)

    updateSceneShadows()
  },
)


const textureLoader = new THREE.TextureLoader()
const floorTexture = textureLoader.load('/25-realistic/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_diff_1k.jpg')
floorTexture.colorSpace = THREE.SRGBColorSpace
const floorARMTexture = textureLoader.load('/25-realistic/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('/25-realistic/textures/wood_cabinet_worn_long/wood_cabinet_worn_long_nor_gl_1k.png')

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    map: floorTexture,
    metalnessMap: floorARMTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
  })
)
floor.rotation.x = - Math.PI / 2
scene.add(floor)

const wallTexture = textureLoader.load('/25-realistic/textures/castle_brick_broken_06/castle_brick_broken_06_diff_1k.jpg')
wallTexture.colorSpace = THREE.SRGBColorSpace
const wallARMTexture = textureLoader.load('/25-realistic/textures/castle_brick_broken_06/castle_brick_broken_06_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('/25-realistic/textures/castle_brick_broken_06/castle_brick_broken_06_nor_gl_1k.png')

const wall = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    map: wallTexture,
    metalnessMap: wallARMTexture,
    aoMap: wallARMTexture,
    roughnessMap: wallARMTexture,
    normalMap: wallNormalTexture,
  })
)
wall.position.y = 5
wall.position.z = -5
scene.add(wall)

/**
 * Directional light
 */
const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
directionalLight.position.set(-4, 6.5, -4)
directionalLight.castShadow = true
directionalLight.target.position.set(0, 6, 0)
directionalLight.target.updateWorldMatrix(true, true)
directionalLight.shadow.camera.far = 15
// directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.mapSize.set(512, 512)
scene.add(directionalLight)

// const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightHelper)
gui.add(directionalLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
gui.add(directionalLight.position, 'x').min(- 10).max(20).step(0.001).name('lightX')
gui.add(directionalLight.position, 'y').min(- 10).max(10).step(0.001).name('lightY')
gui.add(directionalLight.position, 'z').min(- 10).max(10).step(0.001).name('lightZ')
gui.add(directionalLight, 'castShadow')
// Fix "shadow acne"
directionalLight.shadow.normalBias = 0.036 // Round surface
directionalLight.shadow.bias = -0.001 // Flat surface
gui.add(directionalLight.shadow, 'normalBias').min(-0.05).max(0.05).step(0.001)
gui.add(directionalLight.shadow, 'bias').min(-0.05).max(0.05).step(0.001)

/**
 * Environment map
 */
const ENVIRONMENT_MAP = '0'

// HDRI Equirectangular environment map
// - Contains 360 degree view of the surrounding
// - HDR
const rgbeLoader = new RGBELoader() // HDR image loader
rgbeLoader.load(`/24-environment-map/environmentMaps/${ENVIRONMENT_MAP}/2k.hdr`, (data) => {
  data.mapping = THREE.EquirectangularReflectionMapping

  // Normal background
  scene.background = data
  // Ground-projected skybox
  // const skybox = new GroundedSkybox(data, 15, 80)
  // skybox.position.y = 15
  // scene.add(skybox)

  scene.environment = data
})

const updateSceneShadows = () => {
  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

scene.environmentIntensity = 1 // Environment's light source brightness

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
  // When screen with pixel ratio > 1 don't really need it
  // When rendering pixel, geometry edges is not perfectly aligned with screen pixels => aliasing
  // Super sampling (SSAA) or FUllscreen sampling (FSAA)
  // - Increase render resolution to double and averaging it -> 4 times more pixels
  // Multi sampling - super sampling, but only on the edge of the geometries
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Tone map
 */
// 1. Tone mapping is the process of converting the colors in an image to account for the way humans perceive light and color. It is often used in 3D rendering to create more realistic images by simulating the way cameras and human vision work.
// Eg: Convert HDR to LDR
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 3

gui.add(renderer, 'toneMapping', {
  No: THREE.NoToneMapping,
  Linear: THREE.LinearToneMapping,
  Reinhard: THREE.ReinhardToneMapping,
  Cineon: THREE.CineonToneMapping,
  ACESFilmic: THREE.ACESFilmicToneMapping,
})
gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)

/**
 * Animate
 */
// const clock = new THREE.Clock()
const tick = () => {
  // Time
  // const elapsedTime = clock.getElapsedTime()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
