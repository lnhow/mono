import React from 'react'
import { Button } from '@hsp/ui/components/button'
import Card from '../Card'
import { LuClock as Clock, LuUser as User } from 'react-icons/lu'
import { mockTimeline } from '../data/mockData'

const TimelineAndNewsSection = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
    {/* Timeline: Recently Bought */}
    <Card className="md:col-span-2 min-h-60">
      <Card.Title className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-fore-400 flex items-center">
          <Clock className="h-5 w-5 mr-2 text-red-600" />
          Live Purchases Feed
        </h2>
        <Button variant="link" size="sm">
          View All
        </Button>
      </Card.Title>
      <Card.Body className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
        {mockTimeline.map(
          (item) => (
            <div
              key={item.id}
              className="flex-shrink-0 flex items-center space-x-2 text-sm bg-base-400 p-2 rounded-full border"
            >
              <User className="h-4 w-4 text-fore-300" />
              <span className="font-semibold text-fore-400">{item.user}</span>
              <span className="text-fore-300">bought</span>
              <span className="font-medium text-red-600">{item.product}</span>
              <span className="text-fore-300">({item.time})</span>
            </div>
          ),
        )}
      </Card.Body>
    </Card>

    {/* News/Navigation Placeholder */}
    <Card className="md:col-span-2 min-h-60">
      <Card.Title>
        <h2 className="text-lg font-semibold text-fore-400 mb-3">Company News</h2>
      </Card.Title>
      <Card.Body>
      <ul className="space-y-2 text-sm">
        <li className="text-fore-300 hover:text-red-600 cursor-pointer line-clamp-1">
          Q3 Earnings Call Highlights...
        </li>
        <li className="text-fore-300 hover:text-red-600 cursor-pointer line-clamp-1">
          Store Locator updated for Asia region.
        </li>
        <li className="text-fore-300 hover:text-red-600 cursor-pointer line-clamp-1">
          New payment methods available!
        </li>
      </ul>
      </Card.Body>
    </Card>
  </div>
)

export default TimelineAndNewsSection
