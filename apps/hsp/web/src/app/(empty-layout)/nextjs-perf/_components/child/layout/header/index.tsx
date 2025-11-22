import {
  LuMenu as Menu,
  LuSearch as Search,
  LuShoppingCart as ShoppingCart,
  LuBell as Bell,
} from 'react-icons/lu'
import { Button } from '@hsp/ui/components/button'
import { ThemeToggle } from '@hsp/ui/utils/theme/ThemeToggle'
import { mockCompanyName } from '../../data/mockData'
import { PropsWithChildren } from 'react'

const Header = ({ children }: PropsWithChildren) => (
  <header className="fixed top-0 left-0 right-0 z-50 flex h-(--header-height) items-center justify-between bg-base-200 px-4 shadow-md">
    {/* Left: Logo and Menu */}
    <div className="flex items-center space-x-3">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-1">
        <ShoppingCart className="h-7 w-7 text-accent-300" />
        <span className="text-xl font-bold text-accent-300">
          {mockCompanyName}
        </span>
      </div>
    </div>

    {/* Center: Search Bar (Hidden on Mobile) */}
    <div className="hidden flex-1 items-center justify-center px-4 md:flex md:max-w-xl">
      <div className="w-full max-w-lg">
        <form className="flex rounded-lg border border-fore-100 bg-base-200">
          <input
            type="text"
            placeholder="Search products, videos, or news..."
            className="flex-1 rounded-l-lg bg-transparent px-4 py-2 text-sm focus:outline-none"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="rounded-l-none rounded-r-lg"
          >
            <Search className="h-5 w-5 text-fore-200" />
          </Button>
        </form>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" className="md:hidden">
        <Search className="h-6 w-6" />
      </Button>
      <ThemeToggle variant="ghost" />
      {/* TODO: Change if logged in */}
      <Button variant="ghost" size="icon">
        <Bell className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-6 w-6" />
      </Button>
      {children}
    </div>
  </header>
)

export default Header
