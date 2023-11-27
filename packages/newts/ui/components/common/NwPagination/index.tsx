'use client'
import { memo, useMemo } from 'react'
import { NwPaginationProps } from './type'
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export type { NwPaginationProps } from './type'

const PAGINATION_BUTTONS = 5
const resolvePaginationButtonPage = (page: number, pageCount: number) => {
  const halfPaginationButtons = Math.floor(PAGINATION_BUTTONS / 2)
  const result = {
    from: 1,
    to: pageCount,
  }

  if (pageCount <= PAGINATION_BUTTONS) {
    return result
  }

  if (page <= halfPaginationButtons) {
    result.to = PAGINATION_BUTTONS
  } else if (page >= pageCount - halfPaginationButtons) {
    result.from = pageCount - PAGINATION_BUTTONS + 1
  } else {
    result.from = page - halfPaginationButtons
    result.to = page + halfPaginationButtons
  }

  return result
}

const NwPagination = memo(function NwPagination({
  pagination,
}: NwPaginationProps) {
  console.log('[Dev Log] -> file: index.tsx:9 -> total:', pagination)
  const { total, page, pageCount } = pagination
  const searchParams = useSearchParams()
  const truncatedPage = useMemo(() => {
    const { from, to } = resolvePaginationButtonPage(page, pageCount)
    return Array.from({ length: to - from + 1 }, (_, index) => from + index)
  }, [page, pageCount])
  const isEmpty = total < 1
  const isFirstPage = page < 2
  const isLastPage = page >= pageCount

  if (isEmpty) {
    return <></>
  }

  return (
    <nav aria-label="Pagination navigation">
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <NwPaginationButton
          searchParams={searchParams}
          page={page - 1}
          disabled={isFirstPage}
          className="rounded-s-lg border-e-0"
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="w-4 h-4" aria-hidden="true" />
        </NwPaginationButton>
        {truncatedPage.map((pageNumber) => {
          return (
            <NwPaginationButton
              key={pageNumber}
              searchParams={searchParams}
              page={pageNumber}
              active={pageNumber === page}
            >
              {pageNumber}
            </NwPaginationButton>
          )
        })}
        <NwPaginationButton
          searchParams={searchParams}
          page={page + 1}
          disabled={isLastPage}
          className="rounded-e-lg"
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="w-4 h-4" aria-hidden="true" />
        </NwPaginationButton>
      </ul>
    </nav>
  )
})

export default NwPagination

export type NwPaginationButtonProps = React.PropsWithChildren<{
  active?: boolean
  disabled?: boolean
  searchParams: URLSearchParams
  page: number
  className?: string
}>

export const NwPaginationButton = memo(function NwPaginationButton({
  children,
  className,
  active,
  disabled,
  searchParams,
  page,
}: NwPaginationButtonProps) {
  const pathname = usePathname()
  const newUrl = useMemo(() => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', '' + page)
    return pathname + '?' + newSearchParams.toString()
  }, [page, searchParams, pathname])

  const colorClass = useMemo(() => {
    if (active) {
      return 'text-primary border border-blue-300 bg-primary hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:text-white pointer-events-none'
    }
    if (disabled) {
      return 'bg-gray-200 cursor-default pointer-events-none'
    }
    return 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700'
  }, [active, disabled])

  return (
    <li>
      <Link
        href={disabled ? '#' : newUrl}
        aria-disabled={disabled}
        data-disabled={disabled}
        data-active={active}
        className={
          (className ? `${className} ` : '') +
          `${colorClass} ` +
          'flex items-center justify-center px-3 h-8 ms-0 ' +
          'leading-tight border border-gray-300 dark:border-gray-700 ' +
          'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white'
        }
      >
        {children}
      </Link>
    </li>
  )
})
