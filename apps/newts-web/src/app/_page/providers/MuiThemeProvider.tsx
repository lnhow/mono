'use client'
import { DEFAULT_THEME, MuiThemeMapping, THEME } from '@/common/constants/theme'
import { ThemeProvider } from '@mui/material'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'



const useMuiTheme = () => {
  const { theme } = useTheme()
  console.log('[Dev log] - file: MuiThemeProvider.tsx:11 - useMuiTheme - theme:', theme)
  const muiTheme = useMemo(() => {
    if (theme !== THEME.DARK && theme !== THEME.LIGHT) {
      return MuiThemeMapping[DEFAULT_THEME]
    }
    return MuiThemeMapping[theme]
  }, [theme])
  return muiTheme
}

export const MuiThemeProvider = ({ children }: React.PropsWithChildren) => {
  const theme = useMuiTheme()

  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
}
