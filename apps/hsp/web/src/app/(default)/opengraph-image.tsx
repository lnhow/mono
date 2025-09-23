import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
// Note: Cannot use OKLCH color here

// OpenGraph image generation
export const alt = 'Hao Le - Web Developer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function handler() {
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
          padding: '10rem',
          // alignItems: 'center',
          width: '100%',
          height: '100%',
          // neutral-100
          backgroundColor: 'hsl(0, 0%, 97%)',
          fontFamily: 'Lexend, Arial, sans-serif',
          // zinc-800
          color: 'hsl(0, 0%, 27.4%)',
          position: 'relative',
        }}
      >
        <h1 style={{ fontSize: '5rem', margin: 0 }}>Hao Le</h1>
        <h2
          style={{
            fontWeight: 300,
            fontSize: '2rem',
            color: 'hsl(0, 0%, 40%)', // zinc-600
          }}
        >
          Web Developer. Photography and UX Enthusiast.
        </h2>
        <p
          style={{
            fontSize: '1.125rem',
            fontWeight: 300,
            // zinc-400
            color: 'hsl(0, 0%, 62.7%)',
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
