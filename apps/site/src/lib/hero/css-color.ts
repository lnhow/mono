/** Resolves CSS custom property colors (including oklch) to 0-1 sRGB channels. */

export type SrgbColor = readonly [number, number, number]

/**
 * Hardcoded sRGB equivalents of --signal-amber and --signal-blue from
 * packages/ui/src/styles/globals.css, used when canvas probing is unavailable.
 */
export const GALAXY_INNER_FALLBACK: SrgbColor = [0.957, 0.713, 0.248]
export const GALAXY_OUTER_FALLBACK: SrgbColor = [0.258, 0.683, 0.91]
export const GALAXY_RED_FALLBACK: SrgbColor = [1, 0.3, 0.24]

const HEX_PATTERN = /^#([0-9a-f]{6})$/i
const RGB_PATTERN = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i
const SENTINEL = '#010203'

/** Parses rgb()/hex CSS color strings. Returns null for anything else (e.g. oklch). */
export function parseColorString(value: string): SrgbColor | null {
  const hex = HEX_PATTERN.exec(value.trim())
  if (hex) {
    const int = Number.parseInt(hex[1]!, 16)
    return [
      ((int >> 16) & 0xff) / 255,
      ((int >> 8) & 0xff) / 255,
      (int & 0xff) / 255,
    ]
  }
  const rgb = RGB_PATTERN.exec(value.trim())
  if (rgb) {
    return [
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ]
  }
  return null
}

/**
 * Converts any browser-supported CSS color (oklch, lab, color-mix, ...) to sRGB
 * by rasterizing it through a 1x1 canvas. Returns null when canvas 2d is
 * unavailable (jsdom) or the value is not a valid color.
 */
function probeWithCanvas(colorValue: string): SrgbColor | null {
  const canvas = document.createElement('canvas')
  canvas.width = 1
  canvas.height = 1
  const context = canvas.getContext('2d', { willReadFrequently: true })
  if (!context) return null

  context.fillStyle = SENTINEL
  context.fillStyle = colorValue
  // Invalid color strings are ignored by fillStyle, leaving the sentinel.
  if (
    context.fillStyle === SENTINEL &&
    colorValue.trim().toLowerCase() !== SENTINEL
  ) {
    return null
  }

  context.fillRect(0, 0, 1, 1)
  const { data } = context.getImageData(0, 0, 1, 1)
  return [data[0]! / 255, data[1]! / 255, data[2]! / 255]
}

/** Resolves a CSS custom property (e.g. `--signal-amber`) to 0-1 sRGB channels. */
export function resolveCssColor(
  propertyName: string,
  fallback: SrgbColor,
): SrgbColor {
  if (typeof document === 'undefined') return fallback
  const rawValue = getComputedStyle(document.documentElement)
    .getPropertyValue(propertyName)
    .trim()
  if (!rawValue) return fallback
  return probeWithCanvas(rawValue) ?? parseColorString(rawValue) ?? fallback
}
