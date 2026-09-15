// @vitest-environment jsdom

import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import HeroPrototypePage from './page'

vi.mock('./_components/mecha-hero', () => ({
  MechaHero: () => <div data-testid="clock-slot" />,
}))

vi.mock('./_components/user-agent-display', () => ({
  UserAgentDisplay: () => <div data-testid="user-agent" />,
}))

vi.mock('./_components/scroll-ruler', () => ({
  ScrollRuler: () => <div data-testid="scroll-ruler" />,
}))

describe('HeroPrototypePage', () => {
  it('composes the three reusable technical displays', () => {
    render(<HeroPrototypePage />)

    expect(screen.getByTestId('clock-slot')).toBeTruthy()
    expect(screen.getByTestId('user-agent')).toBeTruthy()
    expect(screen.getByTestId('scroll-ruler')).toBeTruthy()
  })
})
