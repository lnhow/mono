import * as THREE from 'three'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
  materialColor: '#bdffe9',
}

gui.addColor(parameters, 'materialColor').onChange(() => {
  shapeMat.color.set(parameters.materialColor)
})

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')!

// Scene
const scene = new THREE.Scene()

/**
 * Shapes
 */

// Texture
const textureLoader = new THREE.TextureLoader()
const shapeTexture = textureLoader.load('/19-scroll/gradients/3.jpg')
shapeTexture.magFilter = THREE.NearestFilter

const shapeMat = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  gradientMap: shapeTexture,
})

const shapeSpacing = 4

const shape1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), shapeMat)
const shape2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), shapeMat)
const shape3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  shapeMat,
)

shape1.position.y = -shapeSpacing * 0
shape2.position.y = -shapeSpacing * 1
shape3.position.y = -shapeSpacing * 2

shape1.position.x = -2
shape2.position.x = 2
shape3.position.x = -2

const shapes = [shape1, shape2, shape3]

scene.add(shape1, shape2, shape3)

/**
 * Lights
 */
const light = new THREE.DirectionalLight('#ffffff', 1)
light.position.set(1, 1, 0)
scene.add(light)

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
  35,
  sizes.width / sizes.height,
  0.1,
  100,
)
camera.position.z = 6
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
// renderer.setClearAlpha(0)

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Animate shapes
  for (const shape of shapes) {
    shape.rotation.x = elapsedTime * 0.1
    shape.rotation.y = elapsedTime * -0.14
  }

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

const onScroll = () => {
  const scrollY = window.scrollY
  const innerHeight = window.innerHeight
  
  // Update camera position based on scroll
  // Scroll progress = window.height / window.innerHeight
  // Scene size = shapeSpacing * shapes.length
  camera.position.y = -(scrollY / innerHeight) * shapeSpacing
  // console.log(scrollY, camera.position.y)
}

window.addEventListener('scroll', onScroll)
onScroll() // Get the correct camera position on initial load
