import { Color, parseColor } from "@hsp/ui/components/app/input/color-picker"

export const DEFAULT_FOREGROUND = parseColor('#000000')
export const DEFAULT_BACKGROUND = parseColor('#FFFFFF')

export type FormContrastChecker = {
  foreground: Color,
  background: Color,
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
