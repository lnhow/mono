import React from 'react'
import { Button } from '@hsp/ui/components/button'
// import { mockHashtags } from '../data/mockData';
import Card from '../Card'
// import cn from '@hsp/ui/utils/cn';

interface HashtagSectionProps {
  data: Array<string>
}

const HashtagSection = ({ data }: HashtagSectionProps) => (
  <Card className="p-4">
    <h2 className="mb-3 text-lg font-semibold text-fore-400">
      Trending Topics
    </h2>
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide [&>*]:flex-shrink-0">
      {data.map((tag, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="rounded-full text-xs"
        >
          {/* <tag.icon className={cn('mr-1 h-3 w-3')} /> */}
          {tag}
        </Button>
      ))}
    </div>
  </Card>
)

export const HashtagSectionSkeleton = () => (
  <Card className="p-4">
    <div className="mb-3 h-7 w-32 bg-base-300 rounded animate-pulse" />
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide [&>*]:flex-shrink-0">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="h-8 w-16 bg-base-300 rounded-full animate-pulse"
        />
      ))}
    </div>
  </Card>
)

export default HashtagSection
