import { vi } from 'vitest'
import '@testing-library/jest-dom/vitest'
import { PropsWithChildren } from 'react'

vi.mock('@hsp/ui/utils/react/view-transition', () => {
  return {
    default: ({ children }: PropsWithChildren) => children,
  }
})

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams({})),
}))

