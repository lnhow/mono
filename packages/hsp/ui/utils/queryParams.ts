export const sanitizeSearchParam = (params: string | string[]) => {
  return Array.isArray(params) ? params[0] : params
}