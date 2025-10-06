import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
// Note: Cannot use OKLCH color here

// OpenGraph image generation
export const alt = 'Hao Le - Web Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const colors = {
  'base-100': 'hsl(0, 0%, 95%)', // neutral-200
  'base-200': 'hsl(0, 0%, 98%)', // neutral-100
  'base-300': 'hsl(0, 0%, 99%)', // neutral-50
  'base-400': 'hsl(210, 16%, 91%)', // zinc-200
  'base-500': 'hsl(210, 16%, 97%)', // zinc-100

  'fore-100': 'hsl(210, 16%, 60%)', // zinc-300
  'fore-200': 'hsl(210, 16%, 50%)', // zinc-500
  'fore-300': 'hsl(210, 16%, 40%)', // zinc-600
  'fore-400': 'hsl(210, 16%, 20%)', // zinc-800
  'fore-500': 'hsl(210, 16%, 10%)', // zinc-900
} as const

const DEFAULT_STYLE = {
  h1: {
    fontSize: '5rem',
  },
  h2: {
    fontSize: '2rem',
  },
  container: {},
}

export async function generateImage({
  title,
  description,
  style = DEFAULT_STYLE,
}: {
  title?: string
  description?: string
  style?: {
    h1: React.CSSProperties
    h2: React.CSSProperties
    container?: React.CSSProperties
  }
}) {
  const _style = { ...DEFAULT_STYLE, ...style }
  const [fontRegular, fontLight] = await Promise.all([
    readFile(
      join(process.cwd(), 'public/static/assets/fonts/Lexend-Regular.ttf'),
    ),
    readFile(
      join(process.cwd(), 'public/static/assets/fonts/Lexend-Light.ttf'),
    ),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 10rem',
          width: '100%',
          height: '100%',
          backgroundColor: colors['base-100'],
          fontFamily: 'Lexend, Arial, sans-serif',
          color: colors['fore-500'],
          position: 'relative',
          ..._style.container,
        }}
      >
        <h1 style={{ margin: 0, ..._style.h1 }}>{title}</h1>
        <h2
          style={{
            fontWeight: 300,
            color: colors['fore-300'],
            ..._style.h2,
          }}
        >
          {description}
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            fontWeight: 300,
            color: colors['fore-100'],
            margin: '2.5rem 0 0 0',
          }}
        >
          {process.env.NEXT_PUBLIC_HOST || 'https://www.hspln.com'}
        </p>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Lexend',
          data: fontRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Lexend',
          data: fontLight,
          style: 'normal',
          weight: 300,
        },
      ],
    },
  )
}
