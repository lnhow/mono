'use client'
import { memo, useMemo } from 'react'
import { NwPaginationProps } from './type'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import classNames from '../../../utils/classNames'

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
      <ul className="flex items-center -space-x-px h-8 text-sm join">
        <NwPaginationButton
          searchParams={searchParams}
          page={page - 1}
          disabled={isFirstPage}
        >
          <span className="sr-only">Previous</span>
          <MdOutlineChevronLeft className="w-4 h-4" aria-hidden="true" />
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
        >
          <span className="sr-only">Next</span>
          <MdOutlineChevronRight className="w-4 h-4" aria-hidden="true" />
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
}>

export const NwPaginationButton = memo(function NwPaginationButton({
  children,
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
        href={disabled ? '#' : newUrl}
        aria-disabled={disabled}
        data-disabled={disabled}
        className={classNames(
          'join-item btn btn-sm',
          disabled && 'btn-disabled',
          active && 'btn-active',
        )}
      >
        {children}
      </Link>
    </li>
  )
})
