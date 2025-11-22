import { IconType } from 'react-icons/lib'
// import {
//   LuZap as Zap,
//   LuDollarSign as DollarSign,
//   LuMonitor as Monitor,
//   LuTrendingUp as TrendingUp,
//   LuChartBar as BarChart,
// } from 'react-icons/lu'

export interface NavLink {
  label: string
  icon: React.ElementType
}

export interface Product {
  id: number
  name: string
  price: number
  discount?: number
  image: string
  rating: number
  reviews: number
  isFavorite: boolean
}

export interface Hashtag {
  term: string
  icon: IconType
  color: string
}

export interface TimelineItem {
  id: number
  user: string
  product: string
  time: string
}

export interface Video {
  id: number
  title: string
  views: string
  duration: string
  thumbnail: string
}

export const mockCompanyName = 'Acme'


// export const mockHashtags: Hashtag[] = [
//   { term: '#SmartwatchPro', icon: Zap, color: 'text-blue-500' },
//   { term: '#BudgetLaptop', icon: DollarSign, color: 'text-green-500' },
//   { term: '#NewArrivals', icon: TrendingUp, color: 'text-purple-500' },
//   { term: '#StockMarket', icon: BarChart, color: 'text-yellow-600' },
//   { term: '#StreamingLive', icon: Monitor, color: 'text-red-500' },
// ]

export const mockTimeline: TimelineItem[] = [
  { id: 1, user: 'User123', product: 'Laptop X', time: '1m ago' },
  { id: 2, user: 'CoolShopper', product: 'T-Shirt Pro', time: '5m ago' },
  { id: 3, user: 'JaneDoe', product: 'Smartwatch 5', time: '10m ago' },
  { id: 4, user: 'CoderGuy', product: 'Mechanical Keyboard', time: '15m ago' },
  { id: 5, user: 'MariaR', product: 'Coffee Maker Deluxe', time: '20m ago' },
]

export const mockProducts: Product[] = Array(12)
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

export const mockVideos: Video[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i + 1,
    title: `Live Stream: New Product Launch ${i + 1}`,
    views: `${i * 50 + 10}K views`,
    duration: i % 2 === 0 ? 'LIVE' : '15:30',
    thumbnail: `https://placehold.co/200x150/D1D5DB/4B5563?text=Video+${i + 1}`,
  }))
