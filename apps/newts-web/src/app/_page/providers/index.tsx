'use client'

import { ThemeProvider } from 'next-themes'
// import { ReactQueryProvider } from './ReactQueryProvider'
import ThemeRegistry from './ThemeRegistry'

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider attribute='class'>
      <ThemeRegistry options={{ key: 'nw', prepend: false, }}>
        {/* <ReactQueryProvider> */}
        {children}
        {/* </ReactQueryProvider> */}
      </ThemeRegistry>
    </ThemeProvider>
  )
}
