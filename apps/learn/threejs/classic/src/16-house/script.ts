import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

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
const floorAlphaTexture = textureLoader.load('/16-house/ground/alpha.webp')
const floorColorTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_diff_1k.webp',
)
const floorARMTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_arm_1k.webp',
)
const floorNormalTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_nor_gl_1k.webp',
)
const floorDisplacementTexture = textureLoader.load(
  '/16-house/ground/brown_mud_leaves_01_disp_1k.webp',
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
    displacementBias: 0.025,
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
  '/16-house/walls/castle_brick_broken_06_diff_1k.webp',
)
houseWallsTexture.colorSpace = THREE.SRGBColorSpace
const houseWallsARMTexture = textureLoader.load(
  '/16-house/walls/castle_brick_broken_06_arm_1k.webp',
)
const houseWallsNormalTexture = textureLoader.load(
  '/16-house/walls/castle_brick_broken_06_nor_gl_1k.webp',
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
  '/16-house/roof/wood_peeling_paint_weathered_diff_1k.webp',
)
houseRoofTexture.colorSpace = THREE.SRGBColorSpace
const houseRoofARMTexture = textureLoader.load(
  '/16-house/roof/wood_peeling_paint_weathered_arm_1k.webp',
)
const houseRoofNormalTexture = textureLoader.load(
  '/16-house/roof/wood_peeling_paint_weathered_nor_gl_1k.webp',
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

const houseDoorTexture = textureLoader.load('/16-house/door/color.webp')
const houseDoorAlphaTexture = textureLoader.load('/16-house/door/alpha.webp')
const houseDoorAOTexture = textureLoader.load('/16-house/door/ambientOcclusion.webp')
const houseDoorHeightTexture = textureLoader.load('/16-house/door/height.webp')
const houseDoorNormalTexture = textureLoader.load('/16-house/door/normal.webp')
const houseDoorMetalnessTexture = textureLoader.load('/16-house/door/metalness.webp')
const houseDoorRoughnessTexture = textureLoader.load('/16-house/door/roughness.webp')

const houseDoorHeight = 2.2
const houseDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, houseDoorHeight, 100, 100),
  new THREE.MeshStandardMaterial({ 
    map: houseDoorTexture,
    transparent: true,
    alphaMap: houseDoorAlphaTexture,
    aoMap: houseDoorAOTexture,
    metalnessMap: houseDoorMetalnessTexture,
    roughnessMap: houseDoorRoughnessTexture,
    displacementMap: houseDoorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
    normalMap: houseDoorNormalTexture,
  }),
)
houseDoor.position.set(
  0,
  houseDoorHeight / 2,
  houseWallSize / 2 + 0.01, // 0.01 is to avoid z-index fighting
)
house.add(houseDoor)

houseWalls.castShadow = true
houseWalls.receiveShadow = true
houseRoof.castShadow = true 
floor.receiveShadow = true

scene.add(house)
// End of house =======================

// Bushes =============================
const bushTexture = textureLoader.load('/16-house/bushes/forest_leaves_03_diff_1k.webp')
bushTexture.colorSpace = THREE.SRGBColorSpace
const bushARMTexture = textureLoader.load('/16-house/bushes/forest_leaves_03_arm_1k.webp')
const bushNormalTexture = textureLoader.load('/16-house/bushes/forest_leaves_03_nor_gl_1k.webp')

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
  color: 0xccffee,
  map: bushTexture,
  aoMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(2, 0.25, 2)
bush1.rotation.x = -0.75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.5, 1, 0.5)
bush2.position.set(-2.2, 0.25, 2.2)
bush2.rotation.z = -0.5
bush2.rotation.x = -0.3

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.8, 0.7, 1)
bush3.position.set(2.5, 0.25, -2.3)
bush3.rotation.x = 2
bush3.rotation.z = -1.4

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.3, 0.4, 0.3)
bush4.position.set(2.6, 0.25, 1.6)
bush4.rotation.x = 2
bush4.rotation.z = -1.4

scene.add(bush1, bush2, bush3, bush4)
// End of Bushes ======================

// Rocks ==============================
const rockTexture = textureLoader.load(
  '/16-house/rocks/plastered_stone_wall_diff_1k.webp',
)
rockTexture.colorSpace = THREE.SRGBColorSpace
const rockARMTexture = textureLoader.load(
  '/16-house/rocks/plastered_stone_wall_arm_1k.webp',
)
const rockNormalTexture = textureLoader.load(
  '/16-house/rocks/plastered_stone_wall_nor_gl_1k.webp',
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

  rock.castShadow = true
  rock.receiveShadow = true
  rocks.add(rock)
}
scene.add(rocks)
// End of Rocks =======================

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#008BFF', 0.7)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#008BFF', 3)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)
directionalLight.castShadow = true

// Optimization
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)

/**
 * Fireflies
 */
const firefly1 = new THREE.PointLight('#D88E26', 6, 0.2, 0.4)
const firefly2 = new THREE.PointLight('#F98726', 3, 0.4, 0.2)
const firefly3 = new THREE.PointLight('#ED4926', 6, 0.5, 0.7)
firefly1.castShadow = true
firefly2.castShadow = true
firefly3.castShadow = true

scene.add(firefly1, firefly2, firefly3)

/**
 * Sky
 */
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

/**
 * Fog
 */
// scene.fog = new THREE.Fog('#19243A', 1, 13) // Color, start, end - Good for controlling precise values
scene.fog = new THREE.FogExp2('#19243A', 0.1) // Color, density - Calculate the "fog strength" dynamically

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
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
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

  // Fireflies
  const firefly1Angle = elapsedTime * 0.3
  firefly1.position.set(
    Math.sin(firefly1Angle) * 1 + 4,
    Math.max(Math.sin(firefly1Angle) * Math.sin(firefly1Angle * 2.34) * Math.sin(firefly1Angle * 3.45) * 0.3, 0.16),
    Math.cos(firefly1Angle) * 1 + 4,
  )
  firefly1.intensity = Math.max(Math.sin(elapsedTime * 48) * Math.sin(firefly1Angle * 5.34) * 20, 8)
  
  const firefly2Angle = -elapsedTime * 0.4
  firefly2.position.set(
    Math.sin(firefly2Angle) * 2 + -3.5,
    Math.max(Math.sin(firefly2Angle) * Math.sin(firefly2Angle * 3.34) * Math.sin(firefly2Angle * 2.1) * 0.2, 0.14),
    Math.cos(firefly2Angle) * 3 + 3.5,
  )
  firefly2.intensity = Math.max(Math.sin(elapsedTime * 27) * Math.sin(firefly2Angle * 4.34) * 6, 5)
  
  const firefly3Angle = elapsedTime * 0.223
  firefly3.position.set(
    Math.sin(firefly3Angle) * 4 + 3,
    Math.max(Math.sin(firefly3Angle) * Math.sin(firefly3Angle * 3.34) * Math.sin(firefly3Angle * 2.1) * 0.3, 0.1),
    Math.cos(firefly3Angle) * 2.5 + -4,
  )
  firefly2.intensity = Math.max(Math.sin(elapsedTime * 18) * Math.sin(firefly3Angle * 1.34) * 10, 3)

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
