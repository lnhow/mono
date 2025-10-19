export function toSlug(str: string) {
  if (!str) return ''

  return normalizeVNChar(str)
    .replace(/([^0-9a-z-\s])/g, '-') // Remove all non-word chars
    .replace(/(\s+)/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/g, '') // Trim hyphens from start of text
    .replace(/-+$/g, '') // Trim hyphens from end of text
}

export function normalizeVNChar(str: string) {
  if (!str) return ''

  // Remove signs
  return str
    .toLowerCase()
    .replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a')
    .replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e')
    .replace(/(ì|í|ị|ỉ|ĩ)/g, 'i')
    .replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o')
    .replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u')
    .replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y')
    .replace(/(đ)/g, 'd')
}
