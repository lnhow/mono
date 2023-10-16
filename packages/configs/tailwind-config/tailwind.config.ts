import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    minHeight: {
      '1/2': '50%',
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
