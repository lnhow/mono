// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { FuturisticClock } from './futuristic-clock'

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return {
    ...actual,
    useAnimationFrame: vi.fn(),
    useReducedMotion: () => true,
  }
})

afterEach(cleanup)

describe('FuturisticClock', () => {
  it('renders four independently labelled time rings and readouts', () => {
    render(<FuturisticClock />)

    expect(screen.getByRole('timer')).toBeTruthy()
    expect(screen.getByLabelText('Four-ring local time clock')).toBeTruthy()
    expect(document.querySelectorAll('[data-ring]')).toHaveLength(4)
    expect(document.querySelectorAll('[data-angle]')).toHaveLength(4)
    expect(screen.getByText(/AM|PM/)).toBeTruthy()
  })
})
