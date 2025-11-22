import React from 'react'
import Image from 'next/image'
import { Button } from '@hsp/ui/components/button'
import Card from '../Card'
import {
  LuClock as Clock,
  // LuUser as User
} from 'react-icons/lu'
// import { mockTimeline } from '../data/mockData'

export interface Product {
  id: number
  name: string
  imageUrl: string
  price: number
  url: string
  sellerInfo: {
    id: number
    name: string
    avatarUrl: string
  }
}

export interface News {
  label: string
  url: string
  icon: string
  isBeta: boolean
}

const ITEMS_PER_GROUP = 3

const TimelineAndNewsSection = ({
  timeline,
  news,
}: {
  timeline: Product[]
  news: News[]
}) => {
  const groupedTimeline = timeline.reduce<Product[][]>(
    (groups, item, index) => {
      const groupIndex = Math.floor(index / ITEMS_PER_GROUP)
      if (!groups[groupIndex]) {
        groups[groupIndex] = []
      }
      groups[groupIndex].push(item)
      return groups
    },
    [],
  )

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* Timeline: Recently Bought */}
      <Card className="md:col-span-2 min-h-93">
        <Card.Title className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-fore-400 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-red-600" />
            Live Purchases Feed
          </h2>
          <Button variant="link" size="sm">
            View All
          </Button>
        </Card.Title>
        <Card.Body className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory scroll-p-4">
          {groupedTimeline.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex flex-col space-y-4 flex-shrink-0 snap-start"
            >
              {group.map((item) => (
                <ProductItem key={item.id} item={item} />
              ))}
            </div>
          ))}
        </Card.Body>
      </Card>

      {/* News/Navigation Placeholder */}
      <Card className="md:col-span-2 min-h-93">
        <Card.Title>
          <h2 className="text-lg font-semibold text-fore-400 mb-3">News</h2>
        </Card.Title>
        <Card.Body>
          <ul className="space-y-2 text-sm">
            {news.map((item, index) => (
              <li
                key={index}
                className="text-fore-300 hover:text-red-600 cursor-pointer line-clamp-1"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
    </div>
  )
}

export default TimelineAndNewsSection

function ProductItem({ item }: { item: Product }) {
  return (
    <div
      key={item.id}
      className="flex-shrink-0 flex items-center space-x-2 text-sm bg-base-400 rounded-lg overflow-hidden border w-full pr-4"
    >
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={80}
        height={80}
        unoptimized
        className="object-contain"
      />
      {/* <User className="h-4 w-4 text-fore-300" /> */}
      {/* <span className="font-semibold text-fore-400">{item.user}</span> */}
      {/* <span className="text-fore-300">bought</span> */}
      <span className="font-medium text-fore-400">{item.name}</span>
      {/* <span className="text-fore-300">({item.time})</span> */}
    </div>
  )
}

// Skeleton component for TimelineAndNewsSection
export const TimelineAndNewsSectionSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      {/* Timeline: Recently Bought */}
      <Card className="md:col-span-2 min-h-93">
        <Card.Title className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-fore-400 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-red-600" />
            Live Purchases Feed
          </h2>
          <Button variant="link" size="sm">
            View All
          </Button>
        </Card.Title>
        <Card.Body className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
          {/* Timeline skeleton items go here */}
          <div className="h-10 bg-base-300 rounded w-full animate-pulse" />
        </Card.Body>
      </Card>

      {/* News/Navigation Placeholder */}
      <Card className="md:col-span-2 min-h-93">
        <Card.Title>
          <h2 className="text-lg font-semibold text-fore-400 mb-3">News</h2>
        </Card.Title>
        <Card.Body>
          <ul className="space-y-2 text-sm">
            {/* News skeleton items go here */}
            <li className="h-4 bg-base-300 rounded w-full animate-pulse" />
            <li className="h-4 bg-base-300 rounded w-full animate-pulse" />
            <li className="h-4 bg-base-300 rounded w-full animate-pulse" />
          </ul>
        </Card.Body>
      </Card>
    </div>
  )
}
