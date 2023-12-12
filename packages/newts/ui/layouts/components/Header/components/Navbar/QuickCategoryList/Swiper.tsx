'use client'

import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
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
      navigation: {
        nextEl: '#nw-nav-cat .btn-next',
        prevEl: '#nw-nav-cat .btn-prev',
      },
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
            @apply bg-gradient-to-l from-bgprimary-800
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
    if (typeof document !== 'undefined') {
      document.querySelector('#nw-nav-cat .btn-next')?.classList.remove('invisible')
      document.querySelector('#nw-nav-cat .btn-prev')?.classList.remove('invisible')
    }
  }, [])

  return (
    <div id="nw-nav-cat" className='relative overflow-hidden'>
      <div className="
        btn-prev left-0 absolute z-10 invisible
        w-12 flex justify-start
        bg-gradient-to-r from-bgprimary-300 dark:from-bgprimary-800
        transition-opacity
        [&.swiper-button-lock]:invisible
        [&.swiper-button-lock]:opacity-0
        [&.swiper-button-disabled]:invisible
        [&.swiper-button-disabled]:opacity-0
      ">
        <button className='btn btn-square btn-ghost'>
          <ChevronLeft className='text-4xl' />
        </button>
      </div>
      <div className="
        btn-next right-0 absolute z-10 invisible
        w-12 flex justify-end
        bg-gradient-to-l from-bgprimary-300 dark:from-bgprimary-800
        transition-opacity
        [&.swiper-button-lock]:invisible
        [&.swiper-button-lock]:opacity-0
        [&.swiper-button-disabled]:invisible
        [&.swiper-button-disabled]:opacity-0
      ">
        <button className='btn btn-square btn-ghost'>
          <ChevronRight className='text-4xl' />
        </button>
      </div>
      <swiper-container
        class="m-0"
        ref={swiperElRef}
        init="false"
        slides-per-view="auto"
        navigation="true"
      >
        {children}
      </swiper-container>
    </div>
  )
})

export default SwiperContainer
