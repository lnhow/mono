import React from 'react';
import Card from '../Card';
import { mockVideos } from '../data/mockData';
import Image from 'next/image';

const StreamingSection = () => (
  <Card className="p-4">
    <h2 className="text-lg font-semibold mb-3 text-fore-400">
      Live Streaming & Demos
    </h2>
    <div className="max-md:space-y-4 md:flex md:space-x-4 pb-2">
      {/* Featured Live Video (Larger) */}
      <div className="flex-shrink-0 w-full md:w-96">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="https://placehold.co/600x338/EF4444/FFFFFF?text=FEATURED+LIVE+DEMO"
            alt="Featured Live Demo"
            width="600"
            height="338"
            unoptimized
            className='w-full h-auto'
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
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide snap-mandatory snap-x scroll-p-4">
        {mockVideos.map((video) => (
          <div key={video.id} className="flex-shrink-0 w-48 snap-start">
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width="600"
                height="338"
                unoptimized
                className='w-full h-full object-cover'
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
);

export const StreamingSectionSkeleton = () => (
  <Card className="p-4">
    <div className="h-7 w-48 bg-base-300 rounded mb-3 animate-pulse" />
    <div className="max-md:space-y-4 md:flex md:space-x-4 pb-2">
      <div className="flex-shrink-0 w-full md:w-96">
        <div className="relative aspect-video rounded-lg overflow-hidden bg-base-300 animate-pulse" />
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide snap-mandatory snap-x scroll-p-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex-shrink-0 w-48 snap-start">
            <div className="relative aspect-video rounded-md overflow-hidden bg-base-300 animate-pulse" />
            <div className="mt-2 h-10 w-32 bg-base-300 rounded animate-pulse" />
            <div className="mt-1 h-3 w-16 bg-base-300 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  </Card>
);

export default StreamingSection;
