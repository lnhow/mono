import { describe, expect, it } from 'vitest'

import { getClockSnapshot } from './time'

describe('getClockSnapshot', () => {
  const date = new Date(2026, 5, 26, 12, 34, 56, 500)

  it('calculates continuous angles from wall-clock time', () => {
    expect(getClockSnapshot(date, false).angles).toEqual({
      milliseconds: 180,
      seconds: 339,
      minutes: expect.closeTo(209.65, 10),
      hours: expect.closeTo(17.47083333333333, 10),
    })
  })

  it('calculates discrete mechanical-tick angles', () => {
    expect(getClockSnapshot(date, true).angles).toEqual({
      milliseconds: 0,
      seconds: 336,
      minutes: expect.closeTo(209.6, 10),
      hours: expect.closeTo(17.466666666666665, 10),
    })
  })

  it('wraps hours on a twelve-hour dial', () => {
    const midnight = new Date(2026, 5, 27, 0, 0, 0, 0)
    expect(getClockSnapshot(midnight, false).angles.hours).toBe(0)
  })
})
