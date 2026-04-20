import { render, screen } from '@testing-library/react'
import type { PropsWithChildren } from 'react'
import { expect, test, vi } from 'vitest'
import PagePlayer from './page'

vi.mock('@hsp/ui/modules/default/modules/player/demo', () => {
  return {
    default: () => <div>Mocked Demo Player</div>,
  }
})

vi.mock('@hsp/ui/utils/react/view-transition', () => {
  return {
    default: ({ children }: PropsWithChildren) => children,
  }
})

test('renders page', () => {
  render(<PagePlayer />)

  expect(
    screen.getByRole('heading', { level: 1, name: 'Custom HTML video player' }),
  ).toBeDefined()
})
