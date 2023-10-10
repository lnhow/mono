'use client'

import ChevronRight from '@mui/icons-material/ChevronRight'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import { IconButton } from '@mui/material'
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
    <div id="nw-nav-cat" className='relative overflow-hidden'>
      <div className="
        btn-prev -left-2.5 absolute z-10
        bg-gradient-to-r from-zinc-300 dark:from-zinc-800
        [&.swiper-button-lock]:hidden
        [&.swiper-button-disabled]:hidden
      ">
        <IconButton className='p-0.5 rounded [&_.MuiTouchRipple-root_.MuiTouchRipple-child]:rounded'>
          <ChevronLeft className='text-4xl' />
        </IconButton>
      </div>
      <div className="
        btn-next -right-2.5 absolute z-10
        bg-gradient-to-l from-zinc-300 dark:from-zinc-800
        [&.swiper-button-lock]:hidden
        [&.swiper-button-disabled]:hidden
      ">
        <IconButton className='p-0.5 rounded [&_.MuiTouchRipple-root_.MuiTouchRipple-child]:rounded'>
          <ChevronRight className='text-4xl' />
        </IconButton>
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
