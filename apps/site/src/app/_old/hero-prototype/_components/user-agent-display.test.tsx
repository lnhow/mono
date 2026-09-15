// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, describe, expect, it } from 'vitest'

import { UserAgentDisplay } from './user-agent-display'

const originalDescriptor = Object.getOwnPropertyDescriptor(window.navigator, 'userAgent')

afterEach(() => {
  cleanup()
  if (originalDescriptor) {
    Object.defineProperty(window.navigator, 'userAgent', originalDescriptor)
  }
})

describe('UserAgentDisplay', () => {
  it('renders shared skeleton rows during server rendering', () => {
    const html = renderToStaticMarkup(<UserAgentDisplay />)
    expect(html.match(/data-slot="skeleton"/g)).toHaveLength(3)
  })

  it('replaces the skeleton with the browser user agent after hydration', async () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: 'Prototype Browser/1.0',
    })

    render(<UserAgentDisplay />)

    expect((await screen.findByLabelText('Browser user agent')).textContent).toBe(
      'Prototype Browser/1.0',
    )
    expect(document.querySelector('[data-slot="skeleton"]')).toBeNull()
  })

  it('keeps the skeleton when the browser value is empty', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      value: '   ',
    })

    render(<UserAgentDisplay />)
    expect(document.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3)
  })

  it('keeps the skeleton when reading the browser value throws', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      configurable: true,
      get: () => {
        throw new Error('blocked')
      },
    })

    render(<UserAgentDisplay />)
    expect(document.querySelectorAll('[data-slot="skeleton"]')).toHaveLength(3)
  })
})
