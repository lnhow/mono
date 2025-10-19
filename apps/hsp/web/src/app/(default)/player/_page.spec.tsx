import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import PagePlayer from './page'
import { PropsWithChildren } from 'react'

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

  expect(screen.getByRole('heading', { level: 1, name: 'Custom HTML video player' })).toBeDefined()
})
