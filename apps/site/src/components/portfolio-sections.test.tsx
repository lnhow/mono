import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { PortfolioSections } from './portfolio-sections'

describe('PortfolioSections', () => {
  const html = renderToStaticMarkup(<PortfolioSections />)

  it('renders semantic section headings', () => {
    expect(html).toContain('<h2')
    expect(html).toContain('Selected projects')
    expect(html).toContain('Skills')
  })

  it('renders project cards as keyboard-focusable external links', () => {
    expect(html).toContain('href="https://haoln7f8.com"')
    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noreferrer"')
  })

  it('labels external project links with visible destination context', () => {
    expect(html).toContain('Open project: Personal blog')
    expect(html).toContain('Open project: guesart')
  })
})
