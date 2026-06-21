import { describe, expect, it } from 'vitest'

import { cn } from '../src/lib/utils'

describe('cn', () => {
  it('keeps conditional classes and resolves Tailwind conflicts', () => {
    expect(cn('px-2 text-sm', { hidden: false }, ['px-4', 'font-medium'])).toBe(
      'text-sm px-4 font-medium',
    )
  })
})
