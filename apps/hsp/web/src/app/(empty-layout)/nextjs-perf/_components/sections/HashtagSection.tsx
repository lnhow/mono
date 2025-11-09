import React from 'react';
import { Button } from '@hsp/ui/components/button';
import { mockHashtags } from '../data/mockData';
import Card from '../Card';
import cn from '@hsp/ui/utils/cn';

const HashtagSection = () => (
  <Card className="p-4">
    <h2 className="mb-3 text-lg font-semibold text-fore-400">
      Trending Topics
    </h2>
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide [&>*]:flex-shrink-0">
      {mockHashtags.map((tag) => (
        <Button
          key={tag.term}
          variant="outline"
          size="sm"
          className="rounded-full text-xs"
        >
          <tag.icon className={cn('mr-1 h-3 w-3', tag.color)} />
          {tag.term}
        </Button>
      ))}
    </div>
  </Card>
);

export default HashtagSection;
