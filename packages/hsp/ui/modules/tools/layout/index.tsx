'use client'
import { BaseLayoutProps } from '@hsp/ui/layouts/types'
import Link, { LinkProps } from '@hsp/ui/shared/components/navigation/Link'
import classNames from '@hsp/ui/utils/classNames'
import { useTranslation } from '@i18n/client'
import { usePathname } from 'next/navigation'
import { Suspense, memo, useMemo } from 'react'
import { nsLayoutTools } from './const'
import { MdMenu } from 'react-icons/md'

const menuItems = [
  {
    href: '/',
    key: 'home',
  },
  {
    href: '/tools/constrast-checker',
    key: 'constrast-checker',
  },
]

export default function ToolsLayout({ children }: BaseLayoutProps) {
  return (
    <div role="main" className="lg:-mt-8 lg:-mx-4 -mb-16">
      <nav role="menubar" className="drawer lg:drawer-open">
        <input id="drawer-tools" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className="bg-base-200 fixed bottom-4 left-4 rounded-lg lg:hidden">
            <label htmlFor='drawer-tools' className="btn btn-square btn-neutral drawer-button" aria-label="toggle sidebar">
              <MdMenu className='icon-md' />
            </label>
          </div>
          {children}
        </div>
        <div className="drawer-side z-20">
          <label
            htmlFor="drawer-tools"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content gap-1">
            <Suspense>
              {menuItems.map((item) => {
                return (
                  <ToolsLink
                    key={item.key}
                    href={item.href}
                    i18nKey={item.key}
                  ></ToolsLink>
                )
              })}
            </Suspense>
          </ul>
        </div>
      </nav>
    </div>
  )
}

const ToolsLink = memo(function ToolsLink({
  href,
  i18nKey,
  ...props
}: LinkProps & { i18nKey: string }) {
  const { t } = useTranslation(nsLayoutTools)
  const pathname = usePathname()
  const isSelected = useMemo(() => {
    console.log(pathname.endsWith(href.toString()), pathname, href)
    return pathname.endsWith(href.toString())
  }, [pathname, href])
  return (
    <li>
      <Link
        className={classNames(
          'btn btn-neutral flex justify-center items-center',
          isSelected && 'btn-active'
        )}
        href={href}
        {...props}
      >
        <span className="leading-8">{t(i18nKey)}</span>
      </Link>
    </li>
  )
})
