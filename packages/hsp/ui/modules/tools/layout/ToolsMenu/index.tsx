'use client'

import Link, { LinkProps } from '@hsp/ui/shared/components/navigation/Link'
import classNames from '@hsp/ui/utils/classNames'
import { useTranslation } from '@i18n/client'
import { usePathname } from 'next/navigation'
import { memo, useMemo } from 'react'
import { nsLayoutTools } from '../const'
import {
  MenuItem,
  MenuItemGroup,
  MenuItemLink,
  isMenuItemLink,
  menuItems,
} from './const'
import { MdOpenInNew } from 'react-icons/md'

export default function SideMenu() {
  return (
    <>
      {menuItems.map((item) => {
        return <ToolsItem key={item.key} item={item} />
      })}
    </>
  )
}

const ToolsItem = memo(function ToolsItem({ item }: { item: MenuItem }) {
  if (isMenuItemLink(item)) {
    return <ToolsLink href={item.href} i18nKey={item.key} />
  }

  return <ToolsGroup item={item} />
})

const ToolsLink = memo(function ToolsLink({
  href,
  i18nKey,
  ...props
}: LinkProps & { i18nKey: string }) {
  const { t } = useTranslation(nsLayoutTools)
  const pathname = usePathname()
  const isSelected = useMemo(() => {
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

const ToolsGroup = memo(function ToolsGroup({ item }: { item: MenuItemGroup }) {
  const { t } = useTranslation(nsLayoutTools)
  return (
    <li>
      <h6
        className={
          'px-4 py-1 bg-base-100 flex justify-center items-center menu-title rounded'
        }
      >
        <span className="leading-8">{t(item.key)}</span>
      </h6>
      <div className="all-unset flex flex-wrap hover:!cursor-auto hover:!bg-transparent active:!bg-transparent focus:!bg-transparent">
        {item.items.map((item) => {
          return <ToolsGroupLink key={item.key} item={item} />
        })}
      </div>
    </li>
  )
})

const ToolsGroupLink = memo(function ToolsGroupLink({
  item,
}: {
  item: MenuItemLink
}) {
  const { t } = useTranslation(nsLayoutTools)
  const pathname = usePathname()
  const isSelected = useMemo(() => {
    return pathname.endsWith(item.href.toString())
  }, [pathname, item.href])
  return (
    <Link
      className={classNames(
        'btn btn-neutral flex flex-col justify-center items-center px-2 py-3 flex-1 min-w-[120px] h-full relative',
        isSelected && 'btn-active'
      )}
      title={t(item.key)}
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener nofollow noreferer' : undefined}
    >
      {item.icon && <item.icon className="icon-md" />}
      <span className="block">{t(item.key)}</span>
      {item.external && <MdOpenInNew className="absolute top-1 right-1" />}
    </Link>
  )
})
