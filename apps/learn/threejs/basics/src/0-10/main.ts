import '../style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

const gui = new GUI({
  title: 'Debug',
  width: 300,
  autoPlace: true,
  closeFolders: false,
})
gui.hide() // Hide the GUI by default
window.addEventListener('keydown', (event) => {
  if (event.ctrlKey && event.key === 'g') {
    gui.show(gui._hidden) // Toggle the GUI when Ctrl + G is pressed
  }
}) // Toggle the GUI when Ctrl + G is pressed
const debugObject = {
  global: {
    color: '#80c62a',
    subdivisions: 2,
  },
  spin: () => {},
}

// 01 Setup - Basic Scene with a Cube
// Setup =================================
// Model
const scene = new THREE.Scene()

// 3D object to render
/**
 * Geometry defines the shape of the object
 * - BoxGeometry creates a box shape
 *    - width, height, and depth
 *    = Segments (how many divisions along each axis, more = more triangles = more detail but cose more performance)
 * Material defines the appearance of the object
 */
const geometry = new THREE.BoxGeometry(
  1,
  1,
  1,
  debugObject.global.subdivisions,
  debugObject.global.subdivisions,
  debugObject.global.subdivisions,
)
// const geometry = new THREE.SphereGeometry(1, 32, 32) // SphereGeometry creates a sphere shape
// const geometry = new THREE.BufferGeometry() // BufferGeometry is a an efficient way to create custom geometries
// const vertices = new Float32Array([
//   0, 0, 0, // Vertex 1
//   0, 1, 0, // Vertex 2
//   1, 0, 0, // Vertex 3
//   0, 0, 1, // Vertex 4
//   0, 0, 0, // Vertex 5
//   0, 1, 0, // Vertex 6
// ])
// const count = 50
// const vertices = new Float32Array(count * 3 * 3)
// for (let i = 0; i < count * 3 * 3; i++) {
//   vertices[i] = (Math.random() - 0.5) * 4
// }
// Transform the vertices into a Three.js compatible format and set them as the position attribute of the geometry
// const positionsAttribute = new THREE.BufferAttribute(vertices, 3)
// geometry.setAttribute('position', positionsAttribute)

const loadingManager = new THREE.LoadingManager() // Helps loading multiple assets and manage their loading state
loadingManager.onStart = () => {
  console.log('Loading started')
}
loadingManager.onLoad = () => {
  console.log('Loading complete')
}
loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
  console.log(
    `Loading progress: ${itemsLoaded} of ${itemsTotal} items loaded from ${url}`,
  )
}
loadingManager.onError = (url) => {
  console.error(`Error loading ${url}`)
}

const textureLoader = new THREE.TextureLoader(loadingManager)
const texture = {
  // color: textureLoader.load('/basic/textures/door/color.jpg'),
  // color: textureLoader.load('/basic/textures/checkerboard-1024x1024.png'),
  // color: textureLoader.load('/basic/textures/checkerboard-8x8.png'),
  color: textureLoader.load('/basic/textures/minecraft.png'),
  alpha: textureLoader.load('/basic/textures/door/alpha.jpg'),
  height: textureLoader.load('/basic/textures/door/height.jpg'),
  normal: textureLoader.load('/basic/textures/door/normal.jpg'),
  ambientOcclusion: textureLoader.load('/basic/textures/door/ambientOcclusion.jpg'),
  metalness: textureLoader.load('/basic/textures/door/metalness.jpg'),
  roughness: textureLoader.load('/basic/textures/door/roughness.jpg'),
}
texture.color.colorSpace = THREE.SRGBColorSpace
// texture.color.wrapS = THREE.RepeatWrapping // Repeat the texture horizontally
// texture.color.wrapT = THREE.RepeatWrapping // Repeat the texture vertically
// texture.color.repeat.set(2, 2) // Repeat the texture 2 times horizontally and
// texture.color.offset.set(0.5, 0.5) // Offset the texture by 0.5 in both directions
// texture.color.center.set(0.5, 0.5)
// texture.color.rotation = Math.PI * 0.25 // Rotate the texture by 45 degrees (PI / 4 radians)
texture.color.generateMipmaps = false // Disable generating smaller versions of the texture (minFilter will not work without this)
texture.color.minFilter = THREE.NearestFilter
texture.color.magFilter = THREE.NearestFilter // It will look blurry by default (LinearMipmapLinearFilter)

const material = new THREE.MeshBasicMaterial({
  // color: debugObject.global.color,
  map: texture.color, // Use the loaded texture as the material's map
  // wireframe: true,
}) // Basic material with a blue color and wireframe mode enabled
const mesh = new THREE.Mesh(geometry, material) // 3D Object ~ Mesh = Geometry + Material
scene.add(mesh)

// View
// Setup camera and renderer
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera is the perspective from which we view the scene
// PerspectiveCamera is a type of camera that simulates the way the human eye sees
// FOV, aspect ratio, near and far clipping planes
// - FOV (Field of View) is the vertical angle of the camera's view
// - Aspect ratio is the width divided by the height of the viewport
// - Near clipping plane is the closest distance at which objects are rendered
// - Far clipping plane is the farthest distance at which objects are rendered
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
)

// OrthographicCamera is a type of camera that does not have perspective distortion
// - left, right, top, bottom are the boundaries of the camera's view
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100)
camera.position.z = 3

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')!

// Renderer is responsible for rendering the scene from the perspective of the camera
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)

// This ensures the rendering is sharp on high DPI screens but not too heavy on performance
// as 2 is sharp enough for most screens
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

// window.addEventListener('dblclick', () => {
//   const fullscreenElement =
//     document.fullscreenElement || (document as any).webkitFullscreenElement
//   if (!fullscreenElement) {
//     // If not in fullscreen, request fullscreen on the canvas element
//     canvas.requestFullscreen().catch((err) => {
//       console.error('Error attempting to enable fullscreen mode:', err)
//     })
//   } else {
//     // If in fullscreen, exit fullscreen mode
//     const exitFullscreen =
//       document.exitFullscreen || (document as any).webkitFullscreenElement
//     if (exitFullscreen) {
//       exitFullscreen.call(document).catch((err) => {
//         console.error('Error attempting to exit fullscreen mode:', err)
//       })
//     }
//   }
// })
// Setup =================================

// 02 Transformation

// 02-01 Positioning
// mesh.position.set(0.7, -0.6, 1) // 1 can be any unit (TBD)

// Vector length
// console.log('\x1B[35m[Dev log]\x1B[0m -> Vector3 length:', mesh.position.length())
// Vector distance to another vector
// console.log('\x1B[35m[Dev log]\x1B[0m -> Vector3 distance to another vector:', mesh.position.distanceTo(camera.position))
// Vector normalization (unit vector)
// console.log('\x1B[35m[Dev log]\x1B[0m -> Vector3 normalized:', mesh.position.normalize())

// Axes helper - helps visualize the axes in the scene
// X axis is red, Y axis is green, Z axis is blue
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// 02-02 Scaling
// mesh.scale.set(2, 0.25, 0.5)

// 02-03 Rotation
// Euler
// Pros:
// - Intuitive and easy to understand
// Cons:
// - Gimbal lock - when two axes align, you lose a degree of freedom
// - Order of rotations matters
// mesh.rotation.reorder('YXZ')
// mesh.rotation.set(Math.PI * 0.25, Math.PI * 0.25, 0) // Rotate 45 degrees around X and Y axes

// Quaternion
// Pros:
// - No gimbal lock
// - Order of rotations does not matter
// Cons:
// - Less intuitive

// Look at the mesh position
// camera.lookAt(mesh.position) // Camera looks at the mesh position

// 02-04 Scene graph
// Scene graph is a hierarchical structure that represents the relationships between objects in the scene

// const group = new THREE.Group()
// scene.add(group)

// group.position.y = -1.7
// group.scale.y = 0.5
// group.rotation.y = 0.2
// scene.add(group)

// const cube1 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// )
// cube1.position.x = - 1.5
// group.add(cube1)

// const cube2 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xff0000 })
// )
// cube2.position.x = 0
// group.add(cube2)

// const cube3 = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial({ color: 0xffff00 })
// )
// cube3.position.x = 1.5
// group.add(cube3)

// 03 Animation
// const clock = new THREE.Clock() // A clock to keep track of time
// gsap.to(mesh.position, { duration: 2, delay: 1, x: 2 })

// const cursor = new THREE.Vector2()
const controls = new OrbitControls(camera, canvas) // OrbitControls allows you to rotate, zoom, and pan the camera
controls.enableDamping = true // Enable damping (inertia) for smoother controls

const tick: FrameRequestCallback = () => {
  // const elapsedTime = clock.getElapsedTime() // Get the elapsed time since the clock started

  // mesh.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
  // mesh.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
  // mesh.position.y = cursor.y * 4
  // camera.lookAt(mesh.position) // Make the camera look at the mesh position (a Vector3)

  controls.update()

  renderer.render(scene, camera) // Render the scene from the perspective of the camera
  update()
}

const update = () => {
  requestAnimationFrame(tick) // Start the animation loop
}

// mesh.position.x = -2
update()

// window.addEventListener('mousemove', (event) => {
//   console.log('Mouse position:', event.clientX, event.clientY)
//   cursor.x = (event.clientX / sizes.width) - 0.5 // Normalize to [-0.5, 0.5]
//   cursor.y = -(event.clientY / sizes.height - 0.5)
//   mesh.position.x = (event.clientX / sizes.width) * 2 - 1 // Normalize to [-1, 1]
//   mesh.position.y = -(event.clientY / sizes.height) * 2 + 1 // Normalize to [-1, 1]
// })

// Debugging GUI
const objectFolder = gui.addFolder('Object')

objectFolder
  .add(mesh.position, 'y')
  .min(-3)
  .max(3)
  .step(0.01)
  .name('Mesh Y Position') // GUI control to change the Y position of the mesh
objectFolder.add(mesh, 'visible').name('Mesh Visibility') // GUI control to toggle the visibility of the mesh
objectFolder.add(material, 'wireframe').name('Wireframe Mode') // GUI control to toggle the wireframe mode of the material
objectFolder
  .addColor(debugObject.global, 'color')
  .name('Mesh Color')
  .onChange((value: THREE.Color) => {
    material.color.set(value)
  }) // GUI control to change the
objectFolder
  .add(debugObject.global, 'subdivisions')
  .min(1)
  .max(10)
  .step(1)
  .name('Geometry Subdivisions')
  .onFinishChange((value: number) => {
    mesh.geometry.dispose() // Dispose of the old geometry to free up memory
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, value, value, value) // Create a new geometry with the updated subdivisions
  })
// GUI control to change the width segments of the geometry

debugObject.spin = () => {
  // Spin f0r 1 second, rotating the mesh around the Y axis a 360 degrees (2 * PI radians)
  gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
objectFolder.add(debugObject, 'spin').name('Spin Mesh') // GUI control to spin the mesh
