import React from 'react'
import {
  LuHeart as Heart,
  LuMessageSquare as MessageSquare,
  LuMenu as Menu,
  LuZap as Zap,
  LuTrendingUp as TrendingUp,
  LuChrome as Home,
} from 'react-icons/lu'
import { IconType } from 'react-icons/lib'
import cn from '@hsp/ui/utils/cn'

export const sidebarLinks = [
  { label: 'Home', icon: Home },
  { label: 'Deals', icon: Zap },
  { label: 'New Arrivals', icon: TrendingUp },
  { label: 'Categories', icon: Menu },
] as const

const Sidebar = () => (
  <aside className="sidebar fixed top-(--header-height) left-0 z-40 h-[calc(100vh-64px)] w-(--sidebar-width) flex-col border-r p-4 bg-base-200">
    <div className="space-y-4">
      <div className="space-y-1">
        {sidebarLinks.map(
          (link) => (
            <NavLink
              key={link.label}
              icon={link.icon}
              iconClassName="text-accent-300"
              label={link.label}
            />
          ),
        )}
      </div>
      <div className="h-[1px] w-full bg-base-300" /> {/* Separator */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold uppercase text-fore-300">
          My Account
        </h3>
        <NavLink icon={Heart} label="Wishlist" />
        <NavLink icon={MessageSquare} label="Messages" />
      </div>
    </div>
  </aside>
)

export default Sidebar

interface NavLinkProps {
  icon: IconType
  iconClassName?: string
  label: string
}

const NavLink = ({ icon: Icon, iconClassName, label }: NavLinkProps) => (
  <a href="#" className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-fore-300 hover:bg-base-300">
    <Icon className={cn("h-5 w-5", iconClassName)} />
    <span>{label}</span>
  </a>
)
