import { afterEach, describe, expect, it } from 'vitest'

import { fallbackSiteOrigin, normalizeSiteOrigin } from './site'

describe('normalizeSiteOrigin', () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL
  })

  it('uses the production origin when the value is missing', () => {
    expect(normalizeSiteOrigin()).toBe('https://www.haoln7f8.com')
    expect(fallbackSiteOrigin).toBe('https://www.haoln7f8.com')
  })

  it('normalizes a configured URL to its origin', () => {
    expect(
      normalizeSiteOrigin('https://preview.example.com/path/?query=yes#hash'),
    ).toBe('https://preview.example.com')
  })

  it('rejects non-HTTP origins', () => {
    expect(() => normalizeSiteOrigin('ftp://example.com')).toThrow(
      'NEXT_PUBLIC_SITE_URL must use http or https',
    )
  })
})
