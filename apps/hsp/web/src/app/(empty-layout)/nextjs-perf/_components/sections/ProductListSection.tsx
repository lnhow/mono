import React from 'react'
import ProductCard, { Product, ProductCardSkeleton } from '../ProductCard'
import Card from '../Card'

const ProductListSection = ({
  title,
  products,
}: {
  title: string
  products: Product[]
}) => (
  <Card className="max-w-full">
    <div className="flex p-4 items-center justify-between">
      <h2 className="text-xl font-bold text-fore-400">{title}</h2>
      <button className="text-red-600 text-sm hover:underline">View All</button>
    </div>
    <div className="flex px-4 pb-6 gap-4 overflow-x-auto scrollbar-hide [&>*]:min-w-64 snap-x snap-mandatory scroll-p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} className="snap-start" />
      ))}
    </div>
  </Card>
)

export const ProductListSectionSkeleton = () => (
  <Card className="max-w-full">
    <div className="flex p-4 items-center justify-between">
      <div className="h-6 w-32 bg-base-300 rounded animate-pulse" />
      <div className="h-4 w-16 bg-base-300 rounded animate-pulse" />
    </div>
    <div className="flex px-4 pb-6 gap-4 overflow-x-auto scrollbar-hide [&>*]:min-w-64 snap-x snap-mandatory scroll-p-4">
      {[...Array(4)].map((_, i) => (
        <ProductCardSkeleton key={i} className="snap-start" />
      ))}
    </div>
  </Card>
)

export default ProductListSection
