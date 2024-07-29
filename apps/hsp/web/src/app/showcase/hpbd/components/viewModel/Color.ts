export default class LetterColor {
  constructor(private hue: number) {}
  toHSLA(light = 50, alp = 1) {
    return `hsla(${this.hue}, 80%, ${light}%, ${alp})`
  }
  toHSL(light = 50) {
    return `hsl(${this.hue}, 80%, ${light}%)`
  }
  toAlpha(alp = 1) {
    return this.toHSLA(50, alp)
  }
}
