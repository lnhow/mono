export function clampScrollPosition(
  value: number,
  documentHeight: number,
  viewportHeight: number,
): number {
  if (![value, documentHeight, viewportHeight].every(Number.isFinite)) return 0

  const maximum = Math.max(0, documentHeight - viewportHeight)
  return Math.min(Math.max(0, value), maximum)
}

export function formatPixelPosition(value: number): string {
  const pixels = Number.isFinite(value) ? Math.max(0, value) : 0

  if (pixels >= 1_000_000) return `${Math.floor(pixels / 100_000) / 10}m px`
  if (pixels >= 1000) return `${Math.floor(pixels / 100) / 10}k px`

  return `${Math.round(pixels)} px`
}
