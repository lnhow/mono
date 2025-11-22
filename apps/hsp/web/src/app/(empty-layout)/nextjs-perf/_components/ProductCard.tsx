'use client'
import React from 'react'
import {
  LuDollarSign as DollarSign,
  // LuStar as Star
} from 'react-icons/lu'
import Image from 'next/image'
import Card from './Card'
// import cn from '@hsp/ui/utils/cn';

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

const ProductCard = ({ product }: { product: Product }) => (
  <Card className="flex flex-col p-3 transition-shadow duration-300 hover:shadow-lg">
    <div className="relative aspect-[4/3] overflow-hidden rounded-md">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={300}
        unoptimized
        className="w-full h-full object-cover"
      />
      {/* {product.discount && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          -{product.discount}%
        </span>
      )} */}
    </div>
    <div className="mt-3 flex flex-col flex-grow">
      <h3 className="text-sm font-medium text-fore-300 line-clamp-2 flex-grow">
        {product.name}
      </h3>
      <div className="flex items-center mt-1 text-sm font-bold text-red-600">
        <DollarSign className="h-4 w-4 mr-0.5" />
        {product.price.toFixed(2)}
      </div>
      <div className="flex items-center text-xs text-fore-200 mt-1">
        {/* <div className="flex text-yellow-500 mr-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < Math.floor(product.rating)
                    ? 'fill-current'
                    : 'text-fore-200',
                )}
              />
            ))}
        </div> */}
        {/* ({product.reviews}) */}
      </div>
    </div>
    {/* <Button
      className="absolute top-2 left-2 rounded-full h-8 w-8 text-red-500 hover:bg-white/50"
      onClick={() => console.log('Toggle Favorite')}
    >
      <Heart
        className={cn(
          'h-4 w-4',
          product.isFavorite ? 'fill-red-500' : 'text-gray-400',
        )}
      />
    </Button> */}
  </Card>
)

export default ProductCard
