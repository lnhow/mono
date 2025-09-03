import Experience from './Experience/Experience'

const canvas = document.querySelector<HTMLCanvasElement>('canvas.webgl')

if (canvas) {
  const experience = new Experience(canvas)
}
