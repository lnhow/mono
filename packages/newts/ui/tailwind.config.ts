import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
import color from 'tailwindcss/colors'

const config: Config = {
  presets: [sharedConfig],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extends: {
      colors: {
        primary: color.emerald,
        bgprimary: color.zinc,
        txprimary: color.black,
        txprimaryd: color.white,
      },
    },
  },
}

export default config
