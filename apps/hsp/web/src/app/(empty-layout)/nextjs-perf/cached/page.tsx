import apiClient from '../_components/child/data/http'
import BannerAndVideoSection from '../_components/child/sections/BannerAndVideoSection'
import HashtagSection, {
  HashtagSectionSkeleton,
} from '../_components/child/sections/HashtagSection'
import ProductListSection, {
  ProductListSectionSkeleton,
} from '../_components/child/sections/ProductListSection'
import StreamingSection, {
  StreamingSectionSkeleton,
} from '../_components/child/sections/StreamingSection'
import TimelineAndNewsSection, {
  TimelineAndNewsSectionSkeleton,
} from '../_components/child/sections/TimelineAndNewsSection'
import WebVitals from '../_components/utils/web-vitals'
import { DELAY } from '../_components/const'
import { Suspense } from 'react'
import { fetchUserData } from '../_components/child/data/api-server'
import { cacheLife } from 'next/cache'

export const metadata = {
  title: 'NextJS Suspense + Cache component',
}

export default async function SSRPage() {
  return (
    <>
      <Suspense fallback={<HashtagSectionSkeleton />}>
        <Hashtags />
      </Suspense>
      <BannerAndVideoSection />
      <Suspense fallback={<TimelineAndNewsSectionSkeleton />}>
        <TimelinesAndNews />
      </Suspense>
      <Suspense fallback={<StreamingSectionSkeleton />}>
        <StreamingSection />
      </Suspense>
      {/* <div className="h-[1px] w-full bg-gray-200" />{' '} */}
      {/* Section Separator */}
      {/* Reusable Product Lists */}
      <Suspense fallback={<ProductListSectionSkeleton />}>
        <Recommends />
      </Suspense>
      <Suspense fallback={<ProductListSectionSkeleton />}>
        <NewProducts />
      </Suspense>
      <Suspense fallback={<ProductListSectionSkeleton />}>
        <PrProducts />
      </Suspense>
      <WebVitals />
    </>
  )
}

async function Hashtags() {
  // 'use cache'
  // cacheLife('hours')

  const data = await apiClient
    .get(`/api/perf-test/hashTags?delay=${DELAY}`)
    .then((res) => res.data)
  return <HashtagSection data={data} />
}

async function TimelinesAndNews() {
  'use cache'
  cacheLife('minutes')
  const [timeLines, newNavis] = await Promise.all([
    apiClient
      .get(`/api/perf-test/timeLines?delay=${DELAY}`)
      .then((res) => res.data),
    apiClient
      .get(`/api/perf-test/newNavis?delay=${DELAY}`)
      .then((res) => res.data),
  ])
  return <TimelineAndNewsSection timeline={timeLines} news={newNavis} />
}

async function Recommends() {
  // 'use cache'
  // cacheLife('hours')
  const user = await fetchUserData()
  if (!user) {
    return null
  }

  const data = await apiClient
    .get(`/api/perf-test/recommends?delay=${DELAY}`)
    .then((res) => res.data)
  return <ProductListSection title="Recommended for You" products={data} />
}

async function NewProducts() {
  // 'use cache'
  // cacheLife('hours')
  const data = await apiClient
    .get(`/api/perf-test/newProducts?delay=${DELAY}`)
    .then((res) => res.data)
  return <ProductListSection title="New Arrivals" products={data} />
}

async function PrProducts() {
  // 'use cache'
  // cacheLife('hours')
  const data = await apiClient
    .get(`/api/perf-test/prProducts?delay=${DELAY}`)
    .then((res) => res.data)
  return (
    <ProductListSection title="Flash Deals (Ending Soon)" products={data} />
  )
}
