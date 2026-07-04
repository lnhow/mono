// @vitest-environment jsdom

import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ScrollRuler } from './scroll-ruler'

vi.mock('motion/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('motion/react')>()
  return {
    ...actual,
    useMotionValueEvent: vi.fn(),
    useScroll: () => ({ scrollY: {} }),
  }
})

afterEach(cleanup)

describe('ScrollRuler', () => {
  it('renders a document track and a fixed scroll indicator', () => {
    render(<ScrollRuler />)

    expect(screen.getByLabelText('Scroll ruler track')).toBeTruthy()
    expect(screen.getByLabelText('Current scroll height')).toBeTruthy()
    expect(screen.getByText('scroll-height')).toBeTruthy()
    expect(screen.getByText('0 px')).toBeTruthy()
  })
})
