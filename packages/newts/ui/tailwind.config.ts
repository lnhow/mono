import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
import daisyuiConfig from '@newts/tailwind-config/daisyui.config'
import color from 'tailwindcss/colors'

const config: Config = {
  presets: [sharedConfig],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extends: {
      colors: {
        bgprimary: color.zinc,
        txprimary: color.black,
        txprimaryd: color.white,
      },
    },
  },
  daisyui: daisyuiConfig,
  plugins: [require('daisyui')],
}

export default config
