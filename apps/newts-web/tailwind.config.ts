import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
import daisyuiConfig from '@newts/tailwind-config/daisyui.config'

const config = {
  presets: [sharedConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/newts/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
  daisyui: daisyuiConfig,
  plugins: [
    require('daisyui'),
  ],
} satisfies Config

export default config
