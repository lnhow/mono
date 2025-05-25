import { SyntheticEvent } from 'react'

export const ID_CANVAS_CONTAINER = 'canvas-container'
export const DEFAULT_BRUSH_SIZES = [4, 8, 16] as const
export const DRAWING_COLORS = [
  '#000000', // Black - For outlines and strong details
  '#FFFFFF', // White - For highlights and base
  '#FF0000', // Red - For emphasis and warm elements
  '#1E90FF', // Blue - For water, sky, and cool elements
  '#228B22', // Green - For nature and vegetation
  '#FFD700', // Yellow - For light sources and warm highlights
  '#8B4513', // Brown - For earth tones and natural elements
  '#800080', // Purple - For shadows and depth
  '#FFA500', // Orange - For sunset tones and warm accents
  '#808080', // Gray - For shading and neutral tones
  '#20B2AA',  // Light Sea Green - For ocean and tropical themes
  '#DDA0DD',  // Plum - For soft, dreamy effects
  '#CD853F',  // Peru - For wood and earth textures
  '#4B0082'   // Indigo - For deep shadows and night scenes
] as const
export const DEFAULT_COLOR = DRAWING_COLORS[0]

export type CanvasContextGetter = () => CanvasRenderingContext2D | null | undefined

export const getPointerCoords = (
  canvas: HTMLCanvasElement | null,
  e: SyntheticEvent,
) => {
  if (!canvas) {
    return { x: 0, y: 0 }
  }
  const rect = canvas.getBoundingClientRect()
  let clientX = 0,
    clientY = 0

  if (e.nativeEvent instanceof TouchEvent) {
    clientX = e.nativeEvent.touches[0]?.clientX ?? 0
    clientY = e.nativeEvent.touches[0]?.clientY ?? 0
  }
  if (e.nativeEvent instanceof MouseEvent) {
    clientX = e.nativeEvent.clientX
    clientY = e.nativeEvent.clientY
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

export const loadImageToCanvas = (
  ctx: CanvasRenderingContext2D,
  imgUrl: string,
) => {
  const img = new Image()
  img.src = imgUrl || ''
  img.onload = () => {
    const canvas = ctx.canvas

    const hRatio = canvas.clientWidth / img.width
    const vRatio = canvas.clientHeight / img.height
    const ratio = Math.min(hRatio, vRatio)
    const centerOffsetX = (canvas.clientWidth - img.width * ratio) / 2
    const centerOffsetY = (canvas.clientHeight - img.height * ratio) / 2

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerOffsetX,
      centerOffsetY,
      img.width * ratio,
      img.height * ratio,
    )
  }
}
