export function hexToRgb(hex = '#000000') {
  let hexVal = hex.replace(/^#/, '')

  if (hexVal.length === 8) {
    hexVal = hexVal.slice(0, 6)
  }

  const shortHexRegex = /^([a-f\d])([a-f\d])([a-f\d])$/i
  hexVal = hexVal.replace(shortHexRegex, (_, r, g, b) => {
    return r + r + g + g + b + b
  })

  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexVal)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

/**
 * Calculate relative luminance (https://www.w3.org/TR/WCAG20/#relativeluminancedef)
 * @param hex
 * @returns
 */
export function calcRelativeLuminance(hex: string) {
  const rgb = hexToRgb(hex)
  if (!rgb) {
    return 0
  }
  const normalizedRGB = {
    r: rgb.r / 255,
    g: rgb.g / 255,
    b: rgb.b / 255,
  }

  return (
    0.2126 *
      (normalizedRGB.r <= 0.0328
        ? normalizedRGB.r / 12.92
        : Math.pow((normalizedRGB.r + 0.055) / 1.055, 2.4)) +
    0.7152 *
      (normalizedRGB.g <= 0.0328
        ? normalizedRGB.g / 12.92
        : Math.pow((normalizedRGB.g + 0.055) / 1.055, 2.4)) +
    0.0722 *
      (normalizedRGB.b <= 0.0328
        ? normalizedRGB.b / 12.92
        : Math.pow((normalizedRGB.b + 0.055) / 1.055, 2.4))
  )
}

export function calcContrastRatio(hex1: string, hex2: string) {
  const lum1 = calcRelativeLuminance(hex1)
  const lum2 = calcRelativeLuminance(hex2)

  return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05)
}

export function isContrastRatioPass(lum: number, isLargeText = false) {
  return isLargeText ? lum > 3 : lum > 4.5
}
