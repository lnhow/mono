import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
import daisyuiConfig from '@newts/tailwind-config/daisyui.config'
import color from 'tailwindcss/colors'

const config = {
  presets: [sharedConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/newts/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: color.emerald,
        bgprimary: color.zinc,
        txprimary: color.black,
        txprimaryd: color.white,
      },
    },
  },
  daisyui: daisyuiConfig,
  plugins: [require('daisyui')],
} satisfies Config

export default config
