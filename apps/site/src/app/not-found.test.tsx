import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import NotFound from './not-found'

describe('app not found page', () => {
  it('offers routes back to the stable site', () => {
    const html = renderToStaticMarkup(<NotFound />)

    expect(html).toContain('Page not found')
    expect(html).toContain('href="/"')
    expect(html).toContain('href="/blog"')
  })
})
