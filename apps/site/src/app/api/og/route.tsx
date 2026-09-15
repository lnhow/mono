import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { site } from '@/lib/site'
import { getThumbnailContent } from '@/lib/thumbnail'

export function GET(request: NextRequest) {
  const { title, description } = getThumbnailContent(new URL(request.url))

  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-start',
        background: '#ffffff',
        color: '#171717',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: title.length > 50 ? '80px' : '120px',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', fontSize: 28 }}>{site.name}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            fontSize: title.length > 50 ? 54 : 72,
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        <div style={{ color: '#525252', display: 'flex', fontSize: 30 }}>
          {description}
        </div>
      </div>
      <div style={{ color: '#737373', display: 'flex', fontSize: 22 }}>
        {site.origin}
      </div>
    </div>,
    { width: 1200, height: 630 },
  )
}
