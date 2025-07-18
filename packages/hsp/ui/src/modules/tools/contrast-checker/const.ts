export type FormContrastChecker = {
  foreground: string,
  background: string,
  bigText: string,
  smallText: string,
}

export const ValidationRules = {
  bigText: {
    min: 10,
    max: 64,
  },
  smallText: {
    min: 10,
    max: 96,
  }
}
