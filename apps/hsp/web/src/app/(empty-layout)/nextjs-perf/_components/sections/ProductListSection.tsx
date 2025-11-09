import React from 'react';
import ProductCard from '../ProductCard';
import Card from '../Card';

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  isFavorite: boolean;
}

const ProductListSection = ({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) => (
  <Card className="max-w-full">
    <div className="flex p-4 items-center justify-between">
      <h2 className="text-xl font-bold text-fore-400">{title}</h2>
      <button className="text-red-600 text-sm hover:underline">
        View All
      </button>
    </div>
    <div className="flex px-4 pb-6 gap-4 overflow-x-auto scrollbar-hide [&>*]:min-w-64">
      {products.slice(0, 6).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </Card>
);

export default ProductListSection;
