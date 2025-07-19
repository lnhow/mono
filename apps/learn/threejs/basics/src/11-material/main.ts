import '../style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

import GUI from 'lil-gui'

const gui = new GUI({
  title: 'Debug',
  width: 300,
  autoPlace: true,
  closeFolders: false,
})

// Models
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
// const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
// const doorAmbientOcclusionTexture = textureLoader.load(
//   './textures/door/ambientOcclusion.jpg',
// )
// const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
// const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
// const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
// const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/3.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('./textures/gradients/5.jpg')

const rgbeLoader = new RGBELoader()
rgbeLoader.load('/textures/environmentMap/2k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})

// MeshBasicMaterial is used for simple materials that do not require lighting calculations
// const material = new THREE.MeshBasicMaterial({
//   map: doorColorTexture,
//   // color: new THREE.Color('#ff0000'),
//   // wireframe: false, // Render the geometry as wireframe
//   transparent: true,
//   // opacity: 0.5, // Need transparent = true to work
//   alphaMap: doorAlphaTexture, // Need transparent = true to work
//   aoMap: doorAmbientOcclusionTexture,
//   // side: THREE.DoubleSide, // Render both faces of the geometry (inner and outer), takes more resources. Default is THREE.FrontSide.
// })

// MeshNormalMaterial is used to visualize the normals of the geometry
// const material = new THREE.MeshNormalMaterial({
//   flatShading: true, // Use flat shading instead of smooth shading
// })

// MeshMatcapMaterial is used to apply a matcap texture to the geometry
// const material = new THREE.MeshMatcapMaterial({
//   matcap: matcapTexture,
// })

// MeshDepthMaterial is used to visualize the depth of the geometry
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial is used for materials that require lighting calculations
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial is used for materials that require lighting calculations and specular highlights
// const material = new THREE.MeshPhongMaterial({
//   shininess: 100,
//   specular: new THREE.Color('#1188ff'),
// })

// MeshToonMaterial is used for materials that require lighting calculations and toon shading
gradientTexture.minFilter = THREE.NearestFilter // Prevents the texture being smoothed
gradientTexture.magFilter = THREE.NearestFilter // Prevents the texture being smoothed
gradientTexture.generateMipmaps = false // Disable generating smaller versions of the texture (minFilter will not work without this)
// const material = new THREE.MeshToonMaterial({
//   gradientMap: gradientTexture,
// })

// MeshStandardMaterial is used for physically based rendering (PBR) materials
// const material = new THREE.MeshStandardMaterial({
//   map: doorColorTexture,
//   aoMap: doorAmbientOcclusionTexture,
//   aoMapIntensity: 1,
//   displacementMap: doorHeightTexture,
//   displacementScale: 0.1,
//   roughness: 1,
//   roughnessMap: doorRoughnessTexture,
//   metalness: 1,
//   metalnessMap: doorMetalnessTexture,
//   normalMap: doorNormalTexture,
//   normalScale: new THREE.Vector2(0.5, 0.5),
//   transparent: true,
//   alphaMap: doorAlphaTexture,
// })

// MeshPhysicalMaterial is used for physically based rendering (PBR) materials with advanced features
const material = new THREE.MeshPhysicalMaterial({
  // map: doorColorTexture,
  // aoMap: doorAmbientOcclusionTexture,
  // aoMapIntensity: 1,
  // displacementMap: doorHeightTexture,
  // displacementScale: 0.1,
  // roughness: 1,
  // roughnessMap: doorRoughnessTexture,
  // metalness: 1,
  // metalnessMap: doorMetalnessTexture,
  // normalMap: doorNormalTexture,
  // normalScale: new THREE.Vector2(0.5, 0.5),
  // transparent: true,
  // alphaMap: doorAlphaTexture,

  // // Clearcoat is a layer on top of the material that adds a glossy finish
  // clearcoat: 1, // Amount of clearcoat layer
  // clearcoatRoughness: 0, // Roughness of the clearcoat layer (0 is smooth, 1 is matte)

  // // Sheen is a layer that adds a soft, velvety appearance
  // sheen: 1, // Amount of sheen layer
  // sheenColor: new THREE.Color('#ffffff'), // Color of the sheen layer
  // sheenRoughness: 0.25, // Roughness of the sheen layer

  // // Iridescence is a layer that adds a rainbow-like effect
  // iridescence: 1, // Amount of iridescence layer (0 is off, 1 is full effect)
  // iridescenceIOR: 1, // Index of refraction for the iridescence layer
  // iridescenceThicknessRange: [100, 800], // Range of thickness for the iridescence layer

  // Transmission is used for transparent materials like glass
  roughness: 0,
  metalness: 0,
  transmission: 1, // Amount of transmission (0 is opaque, 1 is fully transparent)
  ior: 1.5, // Index of refraction for the material (glass is around 1.5)
  thickness: 0.5, // Thickness of the material (used for transmission)
  wireframe: true,
})

gui.add(material, 'clearcoat', 0, 1, 0.0001).name('Clearcoat')
gui.add(material, 'clearcoatRoughness', 0, 1, 0.0001).name('Clearcoat Roughness')

gui.add(material, 'sheen', 0, 1, 0.0001).name('Sheen')
gui.addColor(material, 'sheenColor').name('Sheen Color')
gui.add(material, 'sheenRoughness', 0, 1, 0.0001).name('Sheen Roughness')

gui.add(material, 'iridescence', 0, 1, 0.0001).name('Iridescence')
gui.add(material, 'iridescenceIOR', 1, 2, 0.0001).name('Iridescence IOR')
gui.add(material.iridescenceThicknessRange, '0', 0, 1000, 1).name('Iridescence Thickness Range Min')
gui.add(material.iridescenceThicknessRange, '1', 0, 1000, 1).name('Iridescence Thickness Range Max')


gui.add(material, 'roughness', 0, 1, 0.0001).name('Roughness')
gui.add(material, 'metalness', 0, 1, 0.0001).name('Metalness')

// const light = new THREE.AmbientLight(0xffffff, 1)
// scene.add(light)
// const pointLight = new THREE.PointLight(0xffffff, 30)
// pointLight.position.set(2, 3, 4)
// scene.add(pointLight)


const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.x = -1.5

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)




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

camera.position.z = 3

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
  // Update objects
  sphere.rotation.y = elapsedTime * 0.1
  sphere.rotation.x = -elapsedTime * 0.15

  plane.rotation.y = elapsedTime * 0.1
  plane.rotation.x = -elapsedTime * 0.15

  torus.rotation.y = elapsedTime * 0.1
  torus.rotation.x = -elapsedTime * 0.15

  controls.update()

  renderer.render(scene, camera) // Render the scene from the perspective of the camera
  update()
}

const update = () => {
  requestAnimationFrame(tick) // Start the animation loop
}

update()
