import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  important: true,
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      minHeight: {
        '1/2': '50%',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
