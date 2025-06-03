export const LOBBY_URL = '/' 

export const getRoomUrl = (roomId: string) => `/${roomId}`

export const resizeUnsplashImage = (url?: string, width: number = 100, quality: number = 80) => {
  if (!url) {
    return ''
  }

  try {
    const urlObj = new URL(url)
    const params = new URLSearchParams(urlObj.search)
    params.set('w', width.toString())
    params.set('q', quality.toString())
    urlObj.search = params.toString()
    return urlObj.toString()
  } catch {
    return ''
  }
}
