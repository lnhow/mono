import React from 'react';
import Card from '../Card';
import { mockVideos } from '../data/mockData';
import Image from 'next/image';

const StreamingSection = () => (
  <Card className="p-4">
    <h2 className="text-lg font-semibold mb-3 text-fore-400">
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
          <div key={video.id} className="flex-shrink-0 w-48">
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
);

export default StreamingSection;
