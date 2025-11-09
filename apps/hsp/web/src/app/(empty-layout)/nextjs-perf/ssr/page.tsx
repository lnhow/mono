import App from '../_components'
import { mockProducts } from '../_components/data/mockData'
import BannerAndVideoSection from '../_components/sections/BannerAndVideoSection'
import HashtagSection from '../_components/sections/HashtagSection'
import ProductListSection from '../_components/sections/ProductListSection'
import StreamingSection from '../_components/sections/StreamingSection'
import TimelineAndNewsSection from '../_components/sections/TimelineAndNewsSection'

export default function SSRPage() {
  return (
    <>
      <HashtagSection />
      <BannerAndVideoSection />
      <TimelineAndNewsSection />
      <StreamingSection />
      {/* <div className="h-[1px] w-full bg-gray-200" />{' '} */}
      {/* Section Separator */}
      {/* Reusable Product Lists */}
      <ProductListSection title="Recommended for You" products={mockProducts} />
      <ProductListSection
        title="Best Sellers in Electronics"
        products={mockProducts}
      />
      <ProductListSection
        title="Flash Deals (Ending Soon)"
        products={mockProducts}
      />
    </>
  )
}
