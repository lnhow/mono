import { Color } from "@hsp/ui/src/components/app/input/color-picker"

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
