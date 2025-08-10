import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
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

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const particleTexture = textureLoader.load('/17-particles/2.png')

const particlesMat = new THREE.PointsMaterial({
  size: 0.1,
  // Particles from further away should be smaller than those that are closer to the camera
  sizeAttenuation: true,
  map: particleTexture,
  transparent: true,
  alphaMap: particleTexture,
  // If the pixel value < alphaTest, it won't be rendered. Kinda hard to fine tune
  // alphaTest: 0.001
  // depthTest: false, // This hide the material if there are other in front of it
  depthWrite: false, // Don't store in the depth buffer
  blending: THREE.AdditiveBlending,
  vertexColors: true,
})

/**
 * Test cube
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
//     // particlesMat,
// )
// scene.add(cube)

// Random particles
const particlesGeometry = new THREE.BufferGeometry()
const PARTICLE_COUNT = 10000
const PARTICLE_RADIUS = 5
const VERTICES_ARRAY_lENGTH = PARTICLE_COUNT * 3 // 1 point is composed of 3 values x, y, z
const vertices = new Float32Array(VERTICES_ARRAY_lENGTH)
const colors = new Float32Array(VERTICES_ARRAY_lENGTH)

for (let i = 0; i < PARTICLE_COUNT; i++) {
  const pos = i * 3
  const xzAngle = Math.random() * Math.PI * 2
  const xyAngle = Math.random() * Math.PI * 2
  const radius = Math.random() * PARTICLE_RADIUS

  // x
  vertices[pos] = Math.sin(xzAngle) * Math.cos(xyAngle) * radius
  // y
  vertices[pos + 1] = Math.sin(xyAngle) * Math.sin(xzAngle) * radius
  // z
  vertices[pos + 2] = Math.cos(xzAngle) * radius
  
  colors[pos] = Math.random()      // red
  colors[pos + 1] = Math.random()  // green
  colors[pos + 2] = Math.random()  // blue
}

particlesGeometry.setAttribute(
  'position',
  new THREE.BufferAttribute(vertices, 3),
)
particlesGeometry.setAttribute(
  'color',
  new THREE.BufferAttribute(colors, 3),
)

const particles = new THREE.Points(particlesGeometry, particlesMat)
scene.add(particles)

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
camera.position.z = 3
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
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  particles.rotation.y = elapsedTime * 0.2
  particles.rotation.z = elapsedTime * 0.1
  
  // This is quite resource-intensive
  // for (let i = 0; i < PARTICLE_COUNT; i++) {
  //   const indexX = i * 3
  //   const x = particlesGeometry.attributes.position.array[indexX]
  //   particlesGeometry.attributes.position.array[indexX + 1] = Math.sin(elapsedTime + x)
  // }
  // particlesGeometry.attributes.position.needsUpdate = true

  // Update controls
  controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()
