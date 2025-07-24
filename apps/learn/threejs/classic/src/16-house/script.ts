import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')!

// Scene
const scene = new THREE.Scene()
const textureLoader = new THREE.TextureLoader()

// Floor ==============================
const floorAlphaTexture = textureLoader.load('/16-house/ground/alpha.jpg')
const floorColorTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_diff_1k.jpg',
)
const floorARMTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_arm_1k.jpg',
)
const floorNormalTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_nor_gl_1k.jpg',
)
const floorDisplacementTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_disp_1k.jpg',
)

floorColorTexture.colorSpace = THREE.SRGBColorSpace
;[
  floorColorTexture,
  floorARMTexture,
  floorNormalTexture,
  floorDisplacementTexture,
].forEach((texture: THREE.Texture) => {
  texture.repeat.set(8, 8)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
})

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    transparent: true,
    map: floorColorTexture,
    alphaMap: floorAlphaTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.34,
    displacementBias: -0.15,
  }),
)
gui
  .add(floor.material, 'displacementScale')
  .min(0)
  .max(1)
  .step(0.001)
  .name('Floor Displacement Scale')
gui
  .add(floor.material, 'displacementBias')
  .min(-1)
  .max(1)
  .step(0.001)
  .name('Floor Displacement Bias')
floor.rotation.x = -Math.PI * 0.5
scene.add(floor)
// End of floor =======================

// House ==============================
const house = new THREE.Group()
const houseWallHeight = 2.5
const houseWallSize = 4

const houseWallsTexture = textureLoader.load(
  '/16-house/walls/castle_brick_broken_06_diff_1k.jpg',
)
houseWallsTexture.colorSpace = THREE.SRGBColorSpace
const houseWallsARMTexture = textureLoader.load(
  '/16-house/walls/castle_brick_broken_06_arm_1k.jpg',
)
const houseWallsNormalTexture = textureLoader.load(
  '/16-house/walls/castle_brick_broken_06_nor_gl_1k.jpg',
)

const houseWalls = new THREE.Mesh(
  new THREE.BoxGeometry(houseWallSize, houseWallHeight, houseWallSize),
  new THREE.MeshStandardMaterial({
    map: houseWallsTexture,
    aoMap: houseWallsARMTexture,
    roughnessMap: houseWallsARMTexture,
    metalnessMap: houseWallsARMTexture,
    normalMap: houseWallsNormalTexture,
  }),
)
houseWalls.position.y = houseWallHeight / 2 // Offset the walls
house.add(houseWalls)

const houseRoofHeight = 2

const houseRoofTexture = textureLoader.load(
  '/16-house/roof/wood_peeling_paint_weathered_diff_1k.jpg',
)
houseRoofTexture.colorSpace = THREE.SRGBColorSpace
const houseRoofARMTexture = textureLoader.load(
  '/16-house/roof/wood_peeling_paint_weathered_arm_1k.jpg',
)
const houseRoofNormalTexture = textureLoader.load(
  '/16-house/roof/wood_peeling_paint_weathered_nor_gl_1k.jpg',
)
;[houseRoofTexture, houseRoofARMTexture, houseRoofNormalTexture].forEach((texture: THREE.Texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4,1)
})
const houseRoof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, houseRoofHeight, 4),
  new THREE.MeshStandardMaterial({
    map: houseRoofTexture,
    aoMap: houseRoofARMTexture,
    roughnessMap: houseRoofARMTexture,
    metalnessMap: houseRoofARMTexture,
    normalMap: houseRoofNormalTexture,
  }),
)
houseRoof.position.y = houseWallHeight + houseRoofHeight / 2 // Offset the roof
houseRoof.rotation.y = Math.PI * 0.25
house.add(houseRoof)

const houseDoorHeight = 2.2
const houseDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, houseDoorHeight),
  new THREE.MeshStandardMaterial({ color: 'red' }),
)
houseDoor.position.set(
  0,
  houseDoorHeight / 2,
  houseWallSize / 2 + 0.01, // 0.01 is to avoid z-index fighting
)
house.add(houseDoor)

scene.add(house)
// End of house =======================

// Bushes =============================
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial()

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(2, 0.25, 2)
scene.add(bush1)
// End of Bushes ======================

// Rocks ==============================
const rockTexture = textureLoader.load(
  '/16-house/rocks/plastered_stone_wall_diff_1k.jpg',
)
rockTexture.colorSpace = THREE.SRGBColorSpace
const rockARMTexture = textureLoader.load(
  '/16-house/rocks/plastered_stone_wall_arm_1k.jpg',
)
const rockNormalTexture = textureLoader.load(
  '/16-house/rocks/plastered_stone_wall_nor_gl_1k.jpg',
)

const rockGeometry = new THREE.DodecahedronGeometry(0.5)
const rockMaterial = new THREE.MeshStandardMaterial({
  map: rockTexture,
  aoMap: rockARMTexture,
  roughnessMap: rockARMTexture,
  metalnessMap: rockARMTexture,
  normalMap: rockNormalTexture,
})

;[houseRoofTexture, houseRoofARMTexture, houseRoofNormalTexture].forEach((texture: THREE.Texture) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(4,1)
})

const rocks = new THREE.Group()
const rocksInnerRadius = 4
const rocksOuterRadius = 9

for (let i = 0; i < 30; i++) {
  const rock = new THREE.Mesh(rockGeometry, rockMaterial)
  const angle = Math.random() * Math.PI * 2
  const posX = Math.sin(angle)
  const posZ = Math.cos(angle)
  const radius =
    rocksInnerRadius + Math.random() * (rocksOuterRadius - rocksInnerRadius)

  rock.position.set(posX * radius, 0.25 * Math.random(), posZ * radius)
  rock.rotation.set(
    (Math.random() - 0.5) * 0.5,
    (Math.random() - 0.5) * 0.5,
    (Math.random() - 0.5) * 0.5,
  )
  rock.scale.set(Math.random() + 0.5, Math.random() + 0.5, Math.random() + 0.5)
  rocks.add(rock)
}
scene.add(rocks)
// End of Rocks =======================

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
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
const timer = new Timer()

const tick = () => {
  // Timer
  timer.update()
  const elapsedTime = timer.getElapsed()

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
