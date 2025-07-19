import '../style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'

// Models
const OBJECTS_COUNT = 100
const CAMERA_DISTANCE = 5

const scene = new THREE.Scene()

const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('./textures/matcaps/3.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const material = new THREE.MeshMatcapMaterial({
  matcap: matcapTexture,
  color: new THREE.Color('#eeffee'),
})

const fontLoader = new FontLoader()
let textMesh: THREE.Mesh
fontLoader.load('fonts/helvetiker_regular.typeface.json', (font) => {
  const textGeometry = new TextGeometry('Random shapes', {
    font: font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  })

  textGeometry.center() // Center the text geometry

  textMesh = new THREE.Mesh(textGeometry, material)

  scene.add(textMesh)
})

const donuts: THREE.Mesh[] = []
const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
const boxGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const sphereGeometry = new THREE.SphereGeometry(0.3, 20, 20)

for (let i = 0; i < OBJECTS_COUNT; i++) {
  const shape = Math.floor(Math.random() * 3) // Randomly choose a shape
  let geometry: THREE.BufferGeometry

  switch (shape) {
    case 1:
      geometry = boxGeometry
      break
    case 2:
      geometry = sphereGeometry
      break
    case 0:
    default:
      geometry = donutGeometry // Fallback to donut if something goes wrong
  }
  const donut = new THREE.Mesh(geometry, material)
  donut.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 10,
  )
  donut.rotation.set(
    Math.random() * Math.PI,
    Math.random() * Math.PI,
    Math.random() * Math.PI,
  )

  const scale = Math.random()
  donut.scale.set(scale, scale, scale)

  scene.add(donut)
  donuts.push(donut)
}

// View
// Setup camera and renderer
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)

camera.position.z = CAMERA_DISTANCE

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')!

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Resize the renderer when the window is resized
window.addEventListener('resize', () => {
  // Assign new sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  // In case user change screen pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true // Smooth controls
controls.dampingFactor = 0.1 // Damping factor for smoothness
controls.enableZoom = true // Enable zooming

// Animation loop
const clock = new THREE.Clock()
const tick: FrameRequestCallback = () => {
  const elapsedTime = clock.getElapsedTime()

  camera.position.x = Math.sin(elapsedTime * Math.PI * 0.1) * CAMERA_DISTANCE
  camera.position.y = Math.cos(elapsedTime * Math.PI * 0.1) * CAMERA_DISTANCE
  camera.position.z = Math.cos(elapsedTime * Math.PI * 0.1) * CAMERA_DISTANCE
  camera.lookAt(textMesh ? textMesh.position : new THREE.Vector3(0, 0, 0))

  controls.update()

  renderer.render(scene, camera) // Render the scene from the perspective of the camera
  update()
}

const update = () => {
  requestAnimationFrame(tick) // Start the animation loop
}

update()
