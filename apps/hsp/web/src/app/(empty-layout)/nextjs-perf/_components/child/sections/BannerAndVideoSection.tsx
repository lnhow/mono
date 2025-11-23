import React from 'react'
import Card from '../Card'
import { LuPlay as PlayCircle } from 'react-icons/lu'
import Image from 'next/image'

// For banners.main.desktop (array of banner objects)
export interface Banner {
  id: number
  title: string
  content: string
  imageUrl: string
  linkUrl: string
  // Add other fields if present in your actual data
}

export interface SubBanner {
  title: string
  youtubeId: string
  detailUrl: string
  isNew: boolean
  rating: number
  thumbnailUrl: string
}

const BannerAndVideoSection = ({
  banners,
  subBanner,
}: {
  banners: {
    desktop: Banner[]
    mobile: Banner[]
  }
  subBanner: SubBanner
}) => {
  if (!banners || banners.desktop.length < 1 || banners.mobile.length < 1) {
    return null
  }

  // Simulating displaying the first banner
  const desktopBanner = banners.desktop[0] as Banner
  const mobileBanner = banners.mobile[0] as Banner

  return (
    <div className="flex gap-4">
      {/* Main Banner (Simulating 1 of 3 rotating) */}
      <Card className="flex-1 flex-shrink-0 lg:col-span-2 bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-lg min-h-64">
        <Image
          src={desktopBanner.imageUrl}
          alt={desktopBanner.title}
          width={1920}
          height={270}
          priority
          unoptimized
          className="w-full h-full object-cover rounded-md hidden md:block"
        />
        <Image
          src={mobileBanner.imageUrl}
          alt={mobileBanner.title}
          width={640}
          height={270}
          priority
          unoptimized
          className="w-full h-full object-cover rounded-md block md:hidden"
        />
      </Card>

      {/* Featured Video */}
      {subBanner && (
        <Card className="hidden lg:block w-84">
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={subBanner.thumbnailUrl}
              alt={subBanner.title}
              width="240"
              height="135"
              unoptimized
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="h-10 w-10 opacity-80" />
            </div>
          </div>
          <div className="p-2">
            <span className="text-sm font-medium">{subBanner.title}</span>
          </div>
        </Card>
      )}
    </div>
  )
}

export default BannerAndVideoSection
