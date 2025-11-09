'use client'
import Image from 'next/image'
import {
  LuMenu as Menu,
  LuSearch as Search,
  LuShoppingCart as ShoppingCart,
  LuUser as User,
  LuBell as Bell,
  LuClock as Clock,
  LuZap as Zap,
  LuDollarSign as DollarSign,
  LuMonitor as Monitor,
  LuChevronRight as ChevronRight,
  LuTrendingUp as TrendingUp,
  LuChartBar as BarChart,
  LuHistory as History,
  LuHeart as Heart,
  LuStar as Star,
  LuMessageSquare as MessageSquare,
  LuCircle as PlayCircle, // Corrected from LuPlayCircle
  LuChrome as Home, // Corrected from LuHome
} from 'react-icons/lu'
import cn from '@hsp/ui/utils/cn'
import { ComponentPropsWithRef } from 'react'
import { IconType } from 'react-icons/lib'

// --- Mock Component Definitions (Simulating shadcn/ui) ---

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50'

  const variantClasses = {
    default: 'bg-red-600 text-white hover:bg-red-700',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
    ghost: 'hover:bg-gray-100 text-gray-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    link: 'text-red-600 underline-offset-4 hover:underline',
  }

  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
    icon: 'h-10 w-10',
  }

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<'div'>) => (
  <div
    className={cn('rounded-lg border bg-white shadow-sm', className)}
    {...props}
  >
    {children}
  </div>
)

// --- Mock Data Types ---

interface NavLink {
  label: string
  icon: React.ElementType
}

interface Product {
  id: number
  name: string
  price: number
  discount?: number
  image: string
  rating: number
  reviews: number
  isFavorite: boolean
}

interface Hashtag {
  term: string
  icon: React.ElementType
  color: string
}

interface TimelineItem {
  id: number
  user: string
  product: string
  time: string
}

interface Video {
  id: number
  title: string
  views: string
  duration: string
  thumbnail: string
}

// --- Mock Data ---

const mockHashtags: Hashtag[] = [
  { term: '#SmartwatchPro', icon: Zap, color: 'text-blue-500' },
  { term: '#BudgetLaptop', icon: DollarSign, color: 'text-green-500' },
  { term: '#NewArrivals', icon: TrendingUp, color: 'text-purple-500' },
  { term: '#StockMarket', icon: BarChart, color: 'text-yellow-600' },
  { term: '#StreamingLive', icon: Monitor, color: 'text-red-500' },
]

const mockTimeline: TimelineItem[] = [
  { id: 1, user: 'User123', product: 'Laptop X', time: '1m ago' },
  { id: 2, user: 'CoolShopper', product: 'T-Shirt Pro', time: '5m ago' },
  { id: 3, user: 'JaneDoe', product: 'Smartwatch 5', time: '10m ago' },
  { id: 4, user: 'CoderGuy', product: 'Mechanical Keyboard', time: '15m ago' },
  { id: 5, user: 'MariaR', product: 'Coffee Maker Deluxe', time: '20m ago' },
]

const mockProducts: Product[] = Array(12)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    name: `Product Title Example ${i + 1}`,
    price: 99.99 + i * 10,
    discount: i % 3 === 0 ? 15 : undefined,
    image: `https://placehold.co/400x300/FEE2E2/DC2626?text=Product+${i + 1}`,
    rating: Math.min(5, 4 + i / 8),
    reviews: 100 + i * 5,
    isFavorite: i % 4 === 0,
  }))

const mockVideos: Video[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: `Live Stream: New Product Launch ${i + 1}`,
    views: `${i * 50 + 10}K views`,
    duration: i % 2 === 0 ? 'LIVE' : '15:30',
    thumbnail: `https://placehold.co/200x150/D1D5DB/4B5563?text=Video+${i + 1}`,
  }))

const sidebarLinks: NavLink[] = [
  { label: 'Home', icon: Home },
  { label: 'Deals', icon: Zap },
  { label: 'New Arrivals', icon: TrendingUp },
  { label: 'Categories', icon: Menu },
] as const

// --- Layout Components ---

/**
 * Global Header: Logo, Search, User Actions (Cart, Profile, Notifications)
 */
const AppHeader: React.FC = () => (
  <header className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between bg-white px-4 shadow-md">
    {/* Left: Logo and Menu */}
    <div className="flex items-center space-x-3">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-1">
        <ShoppingCart className="h-7 w-7 text-red-600" />
        <span className="text-xl font-bold text-red-600">E-Com</span>
      </div>
    </div>

    {/* Center: Search Bar (Hidden on Mobile) */}
    <div className="hidden flex-1 items-center justify-center px-4 md:flex md:max-w-xl">
      <div className="w-full max-w-lg">
        <form className="flex rounded-lg border border-gray-300 bg-gray-100">
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
            <Search className="h-5 w-5 text-gray-600" />
          </Button>
        </form>
      </div>
    </div>

    {/* Right: Actions */}
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" className="md:hidden">
        <Search className="h-6 w-6" />
      </Button>
      <Button variant="ghost" size="icon">
        <Bell className="h-6 w-6 text-gray-600" />
      </Button>
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-6 w-6 text-gray-600" />
      </Button>
      <Button variant="secondary" size="icon" className="rounded-full">
        <User className="h-6 w-6" />
      </Button>
    </div>
  </header>
)

/**
 * Main Sidebar (always open on desktop for this complex layout)
 */
const MainSidebar = () => (
  <aside className="fixed top-16 left-0 z-40 hidden h-[calc(100vh-64px)] w-56 flex-col border-r bg-white p-4 md:flex">
    <div className="space-y-4">
      <div className="space-y-1">
        {sidebarLinks.map((link) => (
          <a
            key={link.label}
            href="#"
            className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <link.icon className="h-5 w-5 text-red-600" />
            <span>{link.label}</span>
          </a>
        ))}
      </div>
      <div className="h-[1px] w-full bg-gray-200" /> {/* Separator */}
      <div className="space-y-1">
        <h3 className="px-3 text-xs font-semibold uppercase text-gray-500">
          My Account
        </h3>
        <NavLink icon={Heart} label="Wishlist" />
        <NavLink icon={History} label="Orders" />
        <NavLink icon={MessageSquare} label="Messages" />
      </div>
    </div>
  </aside>
)

interface NavLinkProps {
  icon: IconType
  label: string
}

const NavLink = ({ icon: Icon, label }: NavLinkProps) => (
  <a
    href="#"
    className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
  >
    <Icon className="h-5 w-5 text-gray-500" />
    <span>{label}</span>
  </a>
)

// --- Content Sections ---

/**
 * 1. Hashtags/Search Terms Section
 */
const HashtagSection = () => (
  <Card className="p-4">
    <h2 className="mb-3 text-lg font-semibold text-gray-800">
      Trending Topics
    </h2>
    <div className="flex flex-wrap gap-2">
      {mockHashtags.map((tag) => (
        <Button
          key={tag.term}
          variant="secondary"
          size="sm"
          className="rounded-full text-xs"
        >
          <tag.icon className={cn('mr-1 h-3 w-3', tag.color)} />
          {tag.term}
        </Button>
      ))}
    </div>
  </Card>
)

/**
 * 2. Banners and Featured Video Section
 */
const BannerAndVideoSection: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    {/* Main Banner (Simulating 1 of 3 rotating) */}
    <Card className="p-4 lg:col-span-2 bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Summer Mega Sale!</h2>
          <p className="mt-1 text-sm opacity-90">
            Up to 70% off on all electronics. Limited time only!
          </p>
        </div>
        <Button
          variant="secondary"
          className="bg-white text-red-600 hover:bg-gray-100"
        >
          Shop Now
        </Button>
      </div>
    </Card>

    {/* Featured Video */}
    <Card className="p-2">
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          src="https://placehold.co/600x400/1D4ED8/FFFFFF?text=Featured+Video"
          alt="Featured Video"
          width="600"
          height="400"
          unoptimized
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <PlayCircle className="h-10 w-10 text-white opacity-80" />
        </div>
        <span className="absolute bottom-1 left-2 text-xs text-white font-medium">
          Product Review: Model Z
        </span>
      </div>
    </Card>
  </div>
)

/**
 * 3. Timeline (Recently Bought) and News Navigation
 */
const TimelineAndNewsSection: React.FC = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
    {/* Timeline: Recently Bought */}
    <Card className="p-4 lg:col-span-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-red-600" />
          Live Purchases Feed
        </h2>
        <Button variant="link" size="sm">
          View All
        </Button>
      </div>
      <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {mockTimeline.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 flex items-center space-x-2 text-sm bg-gray-50 p-2 rounded-full border"
          >
            <User className="h-4 w-4 text-gray-500" />
            <span className="font-semibold text-gray-800">{item.user}</span>
            <span className="text-gray-600">bought</span>
            <span className="font-medium text-red-600">{item.product}</span>
            <span className="text-gray-400">({item.time})</span>
          </div>
        ))}
      </div>
    </Card>

    {/* News/Navigation Placeholder */}
    <Card className="p-4 lg:col-span-1">
      <h2 className="text-lg font-semibold mb-3">Company News</h2>
      <ul className="space-y-2 text-sm">
        <li className="text-gray-700 hover:text-red-600 cursor-pointer line-clamp-1">
          Q3 Earnings Call Highlights...
        </li>
        <li className="text-gray-700 hover:text-red-600 cursor-pointer line-clamp-1">
          Store Locator updated for Asia region.
        </li>
        <li className="text-gray-700 hover:text-red-600 cursor-pointer line-clamp-1">
          New payment methods available!
        </li>
      </ul>
    </Card>
  </div>
)

/**
 * 4. Streaming Section
 */
const StreamingSection: React.FC = () => (
  <Card className="p-4">
    <h2 className="text-lg font-semibold mb-3 text-gray-800">
      Live Streaming & Demos
    </h2>
    <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
      {/* Featured Live Video (Larger) */}
      <div className="flex-shrink-0 w-80 md:w-96">
        <div className="relative aspect-video rounded-lg overflow-hidden border-4 border-red-500">
          <Image
            src="https://placehold.co/600x338/EF4444/FFFFFF?text=FEATURED+LIVE+DEMO"
            alt="Featured Live Demo"
            width="600"
            height="338"
            unoptimized
          />
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
            LIVE
          </span>
          <span className="absolute bottom-2 left-2 text-white text-sm font-medium">
            Unboxing the latest console
          </span>
        </div>
      </div>

      {/* List of Streaming Videos (Scrollable) */}
      <div className="flex space-x-3">
        {mockVideos.map((video) => (
          <div key={video.id} className="flex-shrink-0 w-40">
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width="600"
                height="338"
                unoptimized
              />
              {video.duration === 'LIVE' ? (
                <span className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded">
                  LIVE
                </span>
              ) : (
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              )}
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium line-clamp-2">
                {video.title}
              </h3>
              <p className="text-xs text-gray-500">{video.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>
)

/**
 * 5. Product List Card (Reusable for various lists)
 */
const ProductCard = ({ product }: { product: Product }) => (
  <Card className="flex flex-col p-3 transition-shadow duration-300 hover:shadow-lg">
    <div className="relative aspect-[4/3] overflow-hidden rounded-md">
      <Image
        src={product.image}
        alt={product.name}
        width="400"
        height="300"
        unoptimized
      />
      {product.discount && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{product.discount}%
        </span>
      )}
    </div>
    <div className="mt-3 flex flex-col flex-grow">
      <h3 className="text-sm font-medium text-gray-800 line-clamp-2 flex-grow">
        {product.name}
      </h3>
      <div className="flex items-center mt-1 text-sm font-bold text-red-600">
        <DollarSign className="h-4 w-4 mr-0.5" />
        {product.price.toFixed(2)}
      </div>
      <div className="flex items-center text-xs text-gray-500 mt-1">
        <div className="flex text-yellow-500 mr-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < Math.floor(product.rating)
                    ? 'fill-current'
                    : 'text-gray-300',
                )}
              />
            ))}
        </div>
        ({product.reviews})
      </div>
    </div>
    <Button
      variant="ghost"
      size="icon"
      className="absolute top-2 left-2 rounded-full h-8 w-8 text-red-500 hover:bg-white/50"
      onClick={() => console.log('Toggle Favorite')}
    >
      <Heart
        className={cn(
          'h-4 w-4',
          product.isFavorite ? 'fill-red-500' : 'text-gray-400',
        )}
      />
    </Button>
  </Card>
)

const ProductListSection = ({
  title,
  products,
}: {
  title: string
  products: Product[]
}) => (
  <Card className="p-4">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <Button variant="link" size="sm" className="text-red-600">
        View All <ChevronRight className="ml-1 h-4 w-4" />
      </Button>
    </div>
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products.slice(0, 6).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </Card>
)

/**
 * Main Application Component
 */
export default function App() {
  // Main content padding based on fixed header (16) and fixed sidebar (56) on desktop
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <AppHeader />

      <div className="flex pt-16">
        <MainSidebar />

        {/* Main Content Area */}
        <div className="flex-1 md:ml-56 p-4 md:p-6 space-y-6">
          <HashtagSection />
          <BannerAndVideoSection />
          <TimelineAndNewsSection />
          <StreamingSection />
          <div className="h-[1px] w-full bg-gray-200" />{' '}
          {/* Section Separator */}
          {/* Reusable Product Lists */}
          <ProductListSection
            title="Recommended for You"
            products={mockProducts}
          />
          <ProductListSection
            title="Best Sellers in Electronics"
            products={mockProducts}
          />
          <ProductListSection
            title="Flash Deals (Ending Soon)"
            products={mockProducts}
          />
          <footer className="py-8 text-center text-sm text-gray-500">
            © 2025 E-Com Clone. All rights reserved.
          </footer>
        </div>
      </div>
    </div>
  )
}
