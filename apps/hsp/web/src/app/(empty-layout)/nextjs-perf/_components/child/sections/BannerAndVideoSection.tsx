import React from 'react';
import { Button } from '@hsp/ui/components/button';
import Card from '../Card';
import { LuCircle as PlayCircle } from 'react-icons/lu';
import Image from 'next/image';

const BannerAndVideoSection = () => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
    {/* Main Banner (Simulating 1 of 3 rotating) */}
    <Card className="p-4 lg:col-span-2 bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg min-h-64">
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
    <Card className="p-2 hidden lg:block">
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
);

export default BannerAndVideoSection;
