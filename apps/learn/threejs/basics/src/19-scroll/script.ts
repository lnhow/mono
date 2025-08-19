import * as THREE from 'three'
import GUI from 'lil-gui'
import { Timer } from 'three/examples/jsm/misc/Timer.js'
import gsap from 'gsap'

/**
 * Configs
 */
const parameters = {
  materialColor: '#69f2c4',
  particlesCount: 200,
  particlesColor: '#0a7f58'
}

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
 * Particles
 */
let particles: THREE.Points | undefined = undefined

const generateParticles = () => {
  if (particles) {
    particles.geometry.dispose()
    if (particles.material instanceof THREE.PointsMaterial) {
      particles.material.color.set(parameters.particlesColor)
      particles.material.dispose()
    } else if (Array.isArray(particles.material)) {
      particles.material.forEach((material) => {
        (material as THREE.PointsMaterial).dispose()
      })
    }
    scene.remove(particles)
    particles = undefined
  }
  const particlesCount = parameters.particlesCount
  const positions = new Float32Array(particlesCount * 3)
  for (let i = 0; i < particlesCount; i++) {
    positions.set([
      (Math.random() - 0.5) * 10,
      shapeSpacing * 0.5 - Math.random() * shapeSpacing * shapes.length,
      (Math.random() - 0.5) * 10,
    ], i * 3)
  }

  const particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  particles = new THREE.Points(
    particlesGeometry,
    new THREE.PointsMaterial({
      color: parameters.particlesColor,
      size: 0.1,
    })
  )
  scene.add(particles)
}

generateParticles()


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
const cameraGroup = new THREE.Group() // A group for camera's parallax
cameraGroup.add(camera)
scene.add(cameraGroup)

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
 * Move scene's y along with window.scrollY
 */
let scrollY = window.scrollY
const calcCurrentSection = () => {
  return Math.round(scrollY / window.innerHeight)
}
let currentSection = calcCurrentSection()
const onScroll = () => {
  scrollY = window.scrollY
  const innerHeight = window.innerHeight

  // Update camera position based on scroll
  // Scroll progress = window.height / window.innerHeight
  // Scene size = shapeSpacing * shapes.length
  camera.position.y = -(scrollY / innerHeight) * shapeSpacing
  // console.log(scrollY, camera.position.y)

  // Handle effects on reach a section
  const newSection = calcCurrentSection()
  if (newSection !== currentSection) {
    currentSection = newSection
    console.log('\x1B[35m[Dev log]\x1B[0m -> onScroll -> currentSection:', currentSection)
    gsap.to(shapes[currentSection].rotation, {
      duration: 1.5,
      ease: 'power2.inOut',
      x: '+=6',
      y: '-=3',
      z: '+=1.5',
    })
  }
}

window.addEventListener('scroll', onScroll)
onScroll() // Get the correct camera position on initial load

/**
 * Move camera along with mouse's movement for parallax effect
 */
const cursor = {
  dx: 0,
  dy: 0,
}
window.addEventListener('mousemove', (event) => {
  // Calculate relative amplitude of the mouse position and the center of the screen
  cursor.dx = event.clientX / window.innerWidth - 0.5
  cursor.dy = event.clientY / window.innerHeight - 0.5

  // console.log('\x1B[35m[Dev log]\x1B[0m -> cursor:', cursor)
})

/**
 * Scene animation loop
 */
const timer = new Timer()

const tick = () => {
  const deltaTime = timer.getDelta()

  // Animate shapes
  for (const shape of shapes) {
    shape.rotation.x += deltaTime * 0.1
    shape.rotation.y += deltaTime * -0.14
  }

  // Camera movement parallax
  // With easing, a bit more advanced
  const parallaxAmp = {
    x: cursor.dx * 0.5,
    y: -cursor.dy * 0.5,
  }

  // const easingFactor = 0.1 // For low refresh rate screens, inconsistent
  const easingFactor = deltaTime * 4 // For low refresh rate screens, inconsistent
  cameraGroup.position.x += (parallaxAmp.x - cameraGroup.position.x) * easingFactor
  cameraGroup.position.y += (parallaxAmp.y - cameraGroup.position.y) * easingFactor
  // Linear, basic
  // cameraGroup.position.x = cursor.dx
  // cameraGroup.position.y = - cursor.dy // Correct movement's direction

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
  timer.update()
}

tick()

/**
 * Debug
 */
const gui = new GUI()

gui.addColor(parameters, 'materialColor').onChange(() => {
  shapeMat.color.set(parameters.materialColor)
})
gui.add(parameters, 'particlesCount', 0, 1000, 10).onChange(() => {
  generateParticles()
})
gui.addColor(parameters, 'particlesColor').onChange(() => {
  if (particles) {
    if (particles.material instanceof THREE.PointsMaterial) {
      particles.material.color.set(parameters.particlesColor)
    } else if (Array.isArray(particles.material)) {
      particles.material.forEach((material) => {
        (material as THREE.PointsMaterial).color.set(parameters.particlesColor)
      })
    }
  }
})
