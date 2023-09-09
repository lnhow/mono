export const STALE_TIME = {
  DEFAULT: 6e5, // 10 * 60 * 1000: 10 min
  PAGES: {
    HOME: 36e5, // (60 * 1000) = 1 min * 60 = 60 min
  },
}

export const PAGE_REVALIDATE = {
  DEFAULT: 3600 // 60s * 60 = 1h
}
