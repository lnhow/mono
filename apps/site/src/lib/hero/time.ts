export interface ClockAngles {
  milliseconds: number
  seconds: number
  minutes: number
  hours: number
}

export interface ClockSnapshot {
  date: Date
  angles: ClockAngles
}

export function getClockSnapshot(date: Date, mechanical: boolean): ClockSnapshot {
  const milliseconds = mechanical ? 0 : date.getMilliseconds()
  const seconds = date.getSeconds() + milliseconds / 1000
  const minutes = date.getMinutes() + seconds / 60
  const hours = (date.getHours() % 12) + minutes / 60

  return {
    date,
    angles: {
      milliseconds: (milliseconds / 1000) * 360,
      seconds: seconds * 6,
      minutes: minutes * 6,
      hours: hours * 30,
    },
  }
}
