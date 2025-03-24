import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
// import daisyuiConfig from '@newts/tailwind-config/daisyui.config'

const config: Config = {
  presets: [sharedConfig],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extends: {
      colors: {},
    },
  },
}

export default config
