import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
import color from 'tailwindcss/colors'

const config = {
  presets: [sharedConfig],
  content: [],
  theme: {
    extend: {
      colors: {
        primary: color.emerald,
        bgprimary: color.zinc,
        txprimary: color.black,
        txprimaryd: color.white,
      }
    }
  }
} satisfies Config

export default config
