import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import SiteLayout from './(site)/layout'

describe('SiteLayout', () => {
  it('wraps standard routes with the existing site chrome', () => {
    const html = renderToStaticMarkup(
      <SiteLayout>
        <p>Route content</p>
      </SiteLayout>,
    )

    expect(html).toContain('Hao Le')
    expect(html).toContain('>Home<')
    expect(html).toContain('>Blog<')
    expect(html).toContain('<main')
    expect(html).toContain('<footer')
    expect(html).toContain('Route content')
  })
})
