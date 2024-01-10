const color = require('tailwindcss/colors')

module.exports = {
  themes: [
    {
      dark: {
        primary: color.emerald[300],
        secondary: color.emerald[500],
        accent: color.cyan[300],
        neutral: color.zinc[800],
        'base-100': color.zinc[900],
        'base-200': color.zinc[800],
        'base-300': color.zinc[950],
        warning: color.amber[300],
        error: color.red[300],
      },
    },
    {
      light: {
        primary: color.emerald[500],
        secondary: color.emerald[600],
        accent: color.cyan[700],
        neutral: color.zinc[300],
        'base-100': color.zinc[200],
        'base-200': color.zinc[300],
        'base-300': color.zinc[100],
        warning: color.amber[700],
        error: color.red[700],
      },
    }
  ],
}
