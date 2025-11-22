import apiClient from '../_components/data/http'
import BannerAndVideoSection from '../_components/sections/BannerAndVideoSection'
import HashtagSection from '../_components/sections/HashtagSection'
import ProductListSection from '../_components/sections/ProductListSection'
import StreamingSection from '../_components/sections/StreamingSection'
import TimelineAndNewsSection from '../_components/sections/TimelineAndNewsSection'
import WebVitals from '../_components/utils/web-vitals'
import { DELAY } from '../_components/const'
import { fetchUserData } from '../_components/data/api-server'

export default async function SSRPage() {
  const user = await fetchUserData()
  const data = await apiClient
    .get(`/api/perf-test?delay=${DELAY}`)
    .then((res) => res.data)

  return (
    <>
      <HashtagSection data={data.hashTags} />
      <BannerAndVideoSection />
      <TimelineAndNewsSection timeline={data.timeLines} news={data.newNavis} />
      <StreamingSection />
      {user && (
        <ProductListSection
          title="Recommended for You"
          products={data.recommends}
        />
      )}
      <ProductListSection title="New Arrivals" products={data.newProducts} />
      <ProductListSection
        title="Flash Deals (Ending Soon)"
        products={data.prProducts}
      />
      <WebVitals />
    </>
  )
}
