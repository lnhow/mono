import apiClient from '../_components/data/http'
import BannerAndVideoSection from '../_components/sections/BannerAndVideoSection'
import HashtagSection from '../_components/sections/HashtagSection'
import ProductListSection from '../_components/sections/ProductListSection'
import StreamingSection from '../_components/sections/StreamingSection'
import TimelineAndNewsSection from '../_components/sections/TimelineAndNewsSection'
import { DELAY } from '../_const'
import { cacheLife } from 'next/cache'
import { Suspense } from 'react'

export default async function SSRPage() {
  return (
    <>
      <Hashtags />
      <BannerAndVideoSection />
      <Suspense fallback={<div>Loading Timelines and News...</div>}>
        <TimelinesAndNews />
      </Suspense>
      <Suspense fallback={<div>Loading Streaming...</div>}>
        <StreamingSection />
      </Suspense>
      {/* <div className="h-[1px] w-full bg-gray-200" />{' '} */}
      {/* Section Separator */}
      {/* Reusable Product Lists */}
      <Suspense fallback={<div>Loading Recommended Products...</div>}>
        <Recommends />
      </Suspense>
      <Suspense fallback={<div>Loading New Products...</div>}>
        <NewProducts />
      </Suspense>
      <Suspense fallback={<div>Loading PR Products...</div>}>
        <PrProducts />
      </Suspense>
    </>
  )
}

async function Hashtags() {
  'use cache'
  cacheLife('hours')

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
  'use cache'
  cacheLife('hours')
  const data = await apiClient
    .get(`/api/perf-test/recommends?delay=${DELAY}`)
    .then((res) => res.data)
  return <ProductListSection title="Recommended for You" products={data} />
}

async function NewProducts() {
  'use cache'
  cacheLife('threeMinutes')
  const data = await apiClient
    .get(`/api/perf-test/newProducts?delay=${DELAY}`)
    .then((res) => res.data)
  return <ProductListSection title="New Arrivals" products={data} />
}

async function PrProducts() {
  'use cache'
  cacheLife('threeMinutes')
  const data = await apiClient
    .get(`/api/perf-test/prProducts?delay=${DELAY}`)
    .then((res) => res.data)
  return (
    <ProductListSection title="Flash Deals (Ending Soon)" products={data} />
  )
}
