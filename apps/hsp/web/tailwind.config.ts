// import type { Config } from 'tailwindcss'
import sharedConfig from '@repo/tailwind-config/tailwind.config'
// import daisyuiConfig from '@repo/tailwind-config/daisyui.config'

const config = {
  presets: [sharedConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../packages/newts/ui/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../packages/hsp/ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {},
    },
  },
} // satisfies Config

export default config
