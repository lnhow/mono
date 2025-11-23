import apiClient from '../_components/child/data/http'
import BannerAndVideoSection from '../_components/child/sections/BannerAndVideoSection'
import HashtagSection from '../_components/child/sections/HashtagSection'
import ProductListSection from '../_components/child/sections/ProductListSection'
import StreamingSection from '../_components/child/sections/StreamingSection'
import TimelineAndNewsSection from '../_components/child/sections/TimelineAndNewsSection'
import WebVitals from '../_components/utils/web-vitals'
import { DELAY } from '../_components/const'
import { fetchUserData } from '../_components/child/data/api-server'

export const metadata = {
  title: 'NextJS SSR, No Suspense',
}

export default async function SSRPage() {
  return (
    <WithData />
  )
}

async function WithData() {
  const user = await fetchUserData()
  const data = await apiClient
    .get(`/api/perf-test?delay=${DELAY}`)
    .then((res) => res.data)
  console.log('\x1B[35m[Dev log]\x1B[0m -> WithData -> data:', data.banners)

  return (
    <>
      <HashtagSection data={data.hashTags} />
      <BannerAndVideoSection
        banners={data.banners.main}
        subBanner={data.subBanner}
      />
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
