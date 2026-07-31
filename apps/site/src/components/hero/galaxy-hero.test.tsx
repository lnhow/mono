// @vitest-environment jsdom

import { act, cleanup, render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GalaxyHero } from './galaxy-hero'

vi.mock('./galaxy-canvas', () => ({
  GalaxyCanvas: () =>
    createElement('div', { 'data-testid': 'galaxy-canvas' }),
}))

afterEach(cleanup)

describe('GalaxyHero', () => {
  it('renders the galaxy canvas and blast-door panels', () => {
    render(createElement(GalaxyHero))

    expect(screen.getByTestId('galaxy-canvas')).toBeTruthy()
    expect(screen.getByText('SYS.INIT // L-PANEL')).toBeTruthy()
    expect(screen.getByText('SYS.INIT // R-PANEL')).toBeTruthy()
  })

  it('opens the blast doors 600ms after mount', () => {
    vi.useFakeTimers()
    try {
      render(createElement(GalaxyHero))
      const leftLabel = screen.getByText('SYS.INIT // L-PANEL')
      const panel = leftLabel.parentElement
      expect(panel?.style.transform).toBe('translateX(0)')

      act(() => {
        vi.advanceTimersByTime(600)
      })
      expect(panel?.style.transform).toBe('translateX(-100%)')
    } finally {
      vi.useRealTimers()
    }
  })
})
