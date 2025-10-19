import { expect, test } from 'vitest'
import cn from '.'

test ('cn works', () => {
  expect(cn('foo', 'bar')).toBe('foo bar')
})
