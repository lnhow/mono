'use client'
import { memo, use, useMemo } from 'react'
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
  return {
    from: PAGINATION_BUTTONS * (page - 1) + 1,
    to: Math.min(PAGINATION_BUTTONS * page, pageCount),
  }
}

const NwPagination = memo(function NwPagination({
  pagination,
}: NwPaginationProps) {
  console.log('[Dev Log] -> file: index.tsx:9 -> total:', pagination)
  const { total, page, pageCount } = pagination
  const searchParams = useSearchParams()
  const truncatedPage = useMemo(() => {
    const { from, to } = resolvePaginationButtonPage(page, pageCount)
    return Array.from({ length: to - from + 1 }, (value, index) => from + index)
  }, [page, pageCount])
  const isEmpty = total < 1
  const isFirstPage = page === 1
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
        {/*
        <li>
          <a
            href="#"
            aria-current="page"
            className="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            3
          </a>
        </li>
        */}
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

  return (
    <li>
      <Link
        href={newUrl}
        aria-disabled={disabled}
        data-active={active}
        className={
          (className ? `${className} ` : '') +
          'flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
        }
      >
        {children}
      </Link>
    </li>
  )
})
