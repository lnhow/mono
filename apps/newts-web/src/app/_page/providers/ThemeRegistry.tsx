// app/ThemeRegistry.tsx
'use client'
import createCache from '@emotion/cache'
import { useServerInsertedHTML } from 'next/navigation'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material/styles'
// import CssBaseline from '@mui/material/CssBaseline'
import { PropsWithChildren, useMemo, useState } from 'react'

import {
  DEFAULT_THEME,
  MuiThemeMapping,
  THEME,
} from '@newts/common.gui/constants/theme'
import { useTheme } from 'next-themes'

const useMuiTheme = () => {
  const { theme } = useTheme()

  const muiTheme = useMemo(() => {
    if (theme !== THEME.DARK && theme !== THEME.LIGHT) {
      return MuiThemeMapping[DEFAULT_THEME]
    }
    return MuiThemeMapping[theme]
  }, [theme])

  return muiTheme
}

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry(props: PropsWithChildren<{ options: Parameters<typeof createCache>[0] }>) {
  const { options, children } = props
  const theme = useMuiTheme()

  const [{ cache, flush }] = useState(() => {
    const cache = createCache(options)
    cache.compat = true
    const prevInsert = cache.insert
    let inserted: string[] = []
    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return prevInsert(...args)
    }
    const flush = () => {
      const prevInserted = inserted
      inserted = []
      return prevInserted
    }
    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) {
      return null
    }
    let styles = ''
    for (const name of names) {
      styles += cache.inserted[name]
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(' ')}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    )
  })

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        {/* <CssBaseline /> */}
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
