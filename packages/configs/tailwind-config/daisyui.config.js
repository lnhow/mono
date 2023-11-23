const color = require('tailwindcss/colors')

module.exports = {
  themes: [
    {
      dark: {
        primary: color.emerald[300],
        secondary: color.emerald[500],
        accent: color.cyan[300],
        neutral: color.zinc[800],
        'base-100': color.zinc[700],
        warning: color.amber[300],
        error: color.red[300],
      },
    },
    {
      light: {
        primary: color.emerald[700],
        secondary: color.emerald[500],
        accent: color.cyan[700],
        neutral: color.zinc[300],
        'base-100': color.zinc[400],
        warning: color.amber[700],
        error: color.red[700],
      },
    }
  ],
}
