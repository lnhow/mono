import { createTheme } from '@mui/material/styles'

export enum THEME {
  DARK = 'dark',
  LIGHT = 'light',
}

export const DEFAULT_THEME = THEME.DARK

export const MuiTheme = {
  DARK: createTheme({
    palette: {
      mode: 'dark',
    },
  }),
  LIGHT: createTheme({
    palette: {
      mode: 'light',
    },
  }),
}

export const MuiThemeMapping = {
  [THEME.DARK]: MuiTheme.DARK,
  [THEME.LIGHT]: MuiTheme.LIGHT,
}
