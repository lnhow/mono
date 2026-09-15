// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { GalaxyHero } from './galaxy-hero'

vi.mock('./galaxy-canvas', () => ({
  GalaxyCanvas: () => <div data-testid="galaxy-canvas" />,
}))

afterEach(cleanup)

describe('GalaxyHero', () => {
  it('renders the galaxy canvas', () => {
    render(<GalaxyHero />)
    expect(screen.getByTestId('galaxy-canvas')).toBeTruthy()
  })
})
