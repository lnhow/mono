'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

export default function CanvasSpiral() {
  const refCanvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    return initScene(refCanvas.current)
  }, [])

  return (
    <canvas ref={refCanvas} className="w-full h-full bg-black">
      An image of a spinning spiral galaxy
    </canvas>
  )
}

function initScene(canvas: HTMLCanvasElement | null) {
  if (!canvas) {
    return
  }
  /**
   * Base
   */
  // Debug
  const gui = new GUI({
    title: 'Config',
  })

  // Scene
  const scene = new THREE.Scene()

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
  camera.position.y = 8
  camera.position.z = 8
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
   * Galaxy
   */

  const galaxyParams = {
    count: 100000,
    radius: 5,
    radiusLag: 1,
    size: 0.01,
    branches: 5,
    randomness: 0.45,
    randomnessPower: 2.6,
    yRadiusOffset: 0.45,
    rotationSpped: -0.5,
    innerColor: '#762DE5',
    outerColor: '#2E48E6',
  }

  const galaxyMaterial = new THREE.PointsMaterial({
    size: galaxyParams.size,
    // sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  })
  let galaxy: THREE.Points | null = null

  function createGalaxy() {
    if (galaxy) {
      galaxy.geometry.dispose()
      scene.remove(galaxy)
    }

    const innerColor = new THREE.Color(galaxyParams.innerColor)
    const outerColor = new THREE.Color(galaxyParams.outerColor)

    const geometry = new THREE.BufferGeometry()
    const geometryVertices = new Float32Array(galaxyParams.count * 3)
    const colors = new Float32Array(galaxyParams.count * 3)

    for (let i = 0; i < galaxyParams.count; i++) {
      // Geometry
      const indexX = i * 3
      const radius = Math.random() * galaxyParams.radius
      const radiusLagAngle = radius * galaxyParams.radiusLag
      const branchAngle =
        ((i % galaxyParams.branches) / galaxyParams.branches) * Math.PI * 2

      const randomX =
        Math.pow(Math.random(), galaxyParams.randomnessPower) *
        (Math.random() < 0.5 ? -1 : 1) *
        galaxyParams.randomness *
        radius
      const randomY =
        Math.pow(Math.random(), galaxyParams.randomnessPower) *
          (Math.random() < 0.5 ? -1 : 1) *
          galaxyParams.randomness *
          radius +
        radius * galaxyParams.yRadiusOffset
      const randomZ =
        Math.pow(Math.random(), galaxyParams.randomnessPower) *
        (Math.random() < 0.5 ? -1 : 1) *
        galaxyParams.randomness *
        radius

      geometryVertices[indexX] =
        radius * Math.sin(branchAngle + radiusLagAngle) + randomX
      geometryVertices[indexX + 1] = randomY
      geometryVertices[indexX + 2] =
        radius * Math.cos(branchAngle + radiusLagAngle) + randomZ

      // Color
      const vertexColor = innerColor.clone()
      vertexColor.lerp(outerColor, (radius * 0.7) / galaxyParams.radius)
      colors[indexX] = vertexColor.r
      colors[indexX + 1] = vertexColor.g
      colors[indexX + 2] = vertexColor.b
    }
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(geometryVertices, 3),
    )
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    galaxy = new THREE.Points(geometry, galaxyMaterial)
    scene.add(galaxy)
  }
  createGalaxy()

  gui.close()
  const particleFolder = gui.addFolder('Particle')
  particleFolder
    .add(galaxyParams, 'count')
    .name('Particle Count')
    .min(100)
    .max(1000000)
    .step(100)
    .onFinishChange(createGalaxy)
  particleFolder
    .add(galaxyParams, 'size')
    .name('Particle Size')
    .min(0.001)
    .max(0.1)
    .step(0.001)
    .onFinishChange(createGalaxy)
  const galaxyFolder = gui.addFolder('Galaxy')
  galaxyFolder
    .add(galaxyParams, 'radius')
    .name('Radius')
    .min(1)
    .max(40)
    .step(1)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .add(galaxyParams, 'radiusLag')
    .name('Spread')
    .min(-5)
    .max(5)
    .step(0.001)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .add(galaxyParams, 'branches')
    .name('Branches')
    .min(2)
    .max(20)
    .step(1)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .add(galaxyParams, 'randomness')
    .name('Randomness')
    .min(0)
    .max(2)
    .step(0.001)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .add(galaxyParams, 'randomnessPower')
    .name('Randomness Power')
    .min(1)
    .max(10)
    .step(0.01)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .add(galaxyParams, 'yRadiusOffset')
    .name('Y Offset')
    .min(-5)
    .max(5)
    .step(0.5)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .add(galaxyParams, 'rotationSpped')
    .name('Rotation speed')
    .min(-5)
    .max(5)
    .step(0.1)
    .onFinishChange(createGalaxy)
  galaxyFolder
    .addColor(galaxyParams, 'innerColor')
    .name('Inner color')
    .onFinishChange(createGalaxy)
  galaxyFolder
    .addColor(galaxyParams, 'outerColor')
    .name('Outer color')
    .onFinishChange(createGalaxy)

  /**
   * Animate
   */
  const clock = new THREE.Clock()
  let animationFrame: number = 0

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    if (galaxy) {
      galaxy.rotation.y = elapsedTime * galaxyParams.rotationSpped
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    animationFrame = window.requestAnimationFrame(tick)
  }

  tick()
  return () => {
    window.cancelAnimationFrame(animationFrame)
    if (galaxy) {
      galaxyMaterial.dispose()
      galaxy.geometry.dispose()
      galaxy.clear()
      scene.clear()
    }

    gui.destroy()
  }
}
