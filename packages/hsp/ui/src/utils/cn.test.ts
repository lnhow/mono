import { expect, test } from 'vitest'
import cn from './cn'

test ('cn works', () => {
  expect(cn('foo', 'bar')).toBe('foo bar')
})
