import type { Config } from 'tailwindcss'
import sharedConfig from '@newts/tailwind-config/tailwind.config'
import color from 'tailwindcss/colors'

const config: Pick<Config, 'presets' | 'theme'> = {
  presets: [sharedConfig],
  theme: {
    colors: {
      ...color,
      primary: color.emerald,
      bgprimary: color.zinc,
      txprimary: color.black,
      txprimaryd: color.white,
    }
  }
}

export default config
