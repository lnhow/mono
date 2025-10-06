import { generateImage } from "../(api)/og/_og.service"

// // OpenGraph image generation
export const alt = 'Hao Le - Web Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function handler() {
  return generateImage({
    title: 'Hao Le',
    description: 'Web Developer. Photography and UX Enthusiast.',
  })
}
