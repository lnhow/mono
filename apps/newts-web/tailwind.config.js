/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    minHeight: {
      '1/2': '50%',
    },
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
