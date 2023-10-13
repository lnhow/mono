import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'

const config: Pick<Config, 'presets' | 'content'> = {
  presets: [sharedConfig],
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}'],
}

export default config
