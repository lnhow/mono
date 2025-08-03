export default class LetterColor {
  constructor(private hue: number, private saturation = 80) {}
  toHSLA(light = 50, alp = 1) {
    return `hsla(${this.hue}, ${this.saturation}%, ${light}%, ${alp})`
  }
  toHSL(light = 50) {
    return `hsl(${this.hue}, ${this.saturation}%, ${light}%)`
  }
  toAlpha(alp = 1) {
    return this.toHSLA(50, alp)
  }
}
