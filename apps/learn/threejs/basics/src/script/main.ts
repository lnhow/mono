import '../style.css'

import * as THREE from 'three'
import gsap from 'gsap'

// 01 Setup - Basic Scene with a Cube
// Setup =================================
const scene = new THREE.Scene()

// 3D object to render
const geometry = new THREE.BoxGeometry(1, 1, 1) 
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff })
const mesh = new THREE.Mesh(geometry, material)  // 3D Object ~ Mesh = Geometry + Material
scene.add(mesh)

// Setup camera and renderer
const sizes = {
  width: 800,
  height: 600,
}

// Camera is the perspective from which we view the scene
// PerspectiveCamera is a type of camera that simulates the way the human eye sees
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')!

// Renderer is responsible for rendering the scene from the perspective of the camera
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})
renderer.setSize(sizes.width, sizes.height)

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
gsap.to(mesh.position, { duration: 2, delay: 1, x: 2 })

const tick: FrameRequestCallback = () => {
  // const elapsedTime = clock.getElapsedTime() // Get the elapsed time since the clock started

  // mesh.rotation.y += 0.01 * elapsedTime
  // mesh.position.x = Math.sin(elapsedTime) // Move the mesh along the X axis
  // mesh.position.y = Math.cos(elapsedTime) // Move the mesh along the Y axis
  // camera.lookAt(mesh.position) // Make the camera look at the mesh position (a Vector3)

  renderer.render(scene, camera) // Render the scene from the perspective of the camera
  update()
}

const update = () => {
  requestAnimationFrame(tick) // Start the animation loop
}

mesh.position.x = -2
update()

