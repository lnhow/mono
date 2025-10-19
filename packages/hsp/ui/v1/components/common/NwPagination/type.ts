export type TNwPagination = {
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export type NwPaginationProps = {
  pagination: TNwPagination
}

export const defaultPagination = {
  page: 1,
  pageCount: 0,
  total: 0,
  pageSize: 0,
} as const