'use client'

import { PropsWithChildren, memo, useEffect, useRef } from 'react'
import { SwiperContainer, register } from 'swiper/element/bundle'

register()

const SwiperContainer = memo(function SwiperContainer({
  children,
}: PropsWithChildren) {
  const swiperElRef = useRef<SwiperContainer | null>(null)

  useEffect(() => {
    const swiper = swiperElRef.current
    if (swiper === null) {
      return
    }
    const params: Partial<SwiperContainer> = {
      injectStyles: [
        `
          .swiper {
            --swiper-navigation-sides-offset: 0px;
            --swiper-navigation-color: black;
          }
          .swiper ~ .dark {
            --swiper-navigation-color: white;
          }
        `,
        `
          .swiper-button-prev, .swiper-button-next {
            @apply bg-gradient-to-l from-zinc-800
          }
          .swiper-button-prev svg, .swiper-button-next svg {
            width: 24px;
            height: 24px;
          }
          .swiper-button-disabled {
            visibility: hidden;
          }
        `,
      ],
    }
    Object.assign(swiper, params)
    swiper.initialize()
  }, [])

  return (
    <swiper-container
      class="overflow-hidden m-0"
      ref={swiperElRef}
      init="false"
      slides-per-view="auto"
      navigation="true"
    >
      {children}
    </swiper-container>
  )
})

export default SwiperContainer
