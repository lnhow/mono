'use client'

import { ThemeProvider } from 'next-themes'
import { ReactQueryProvider } from './ReactQueryProvider'
import { MuiThemeProvider } from './MuiThemeProvider'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute='class'>
      <MuiThemeProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </MuiThemeProvider>
    </ThemeProvider>
  )
}
