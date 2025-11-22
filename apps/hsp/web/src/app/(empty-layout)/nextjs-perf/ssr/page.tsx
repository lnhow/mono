import apiClient from '../_components/data/http'
import BannerAndVideoSection from '../_components/sections/BannerAndVideoSection'
import HashtagSection from '../_components/sections/HashtagSection'
import ProductListSection from '../_components/sections/ProductListSection'
import StreamingSection from '../_components/sections/StreamingSection'
import TimelineAndNewsSection from '../_components/sections/TimelineAndNewsSection'
import WebVitals from '../_components/utils/web-vitals'
import { DELAY } from '../_components/const'

export default async function SSRPage() {
  const data = await apiClient
    .get(`/api/perf-test?delay=${DELAY}`)
    .then((res) => res.data)
  console.log(
    '\x1B[35m[Dev log]\x1B[0m -> SSRPage -> hashtags:',
    Object.keys(data),
  )

  return (
    <>
      <HashtagSection data={data.hashTags} />
      <BannerAndVideoSection />
      <TimelineAndNewsSection timeline={data.timeLines} news={data.newNavis} />
      <StreamingSection />
      {/* <div className="h-[1px] w-full bg-gray-200" />{' '} */}
      {/* Section Separator */}
      {/* Reusable Product Lists */}
      <ProductListSection
        title="Recommended for You"
        products={data.recommends}
      />
      <ProductListSection title="New Arrivals" products={data.newProducts} />
      <ProductListSection
        title="Flash Deals (Ending Soon)"
        products={data.prProducts}
      />
      <WebVitals className='top-20 bottom-[unset]'/>
    </>
  )
}
