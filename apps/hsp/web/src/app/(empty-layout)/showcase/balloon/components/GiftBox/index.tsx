// Ref: https://codesandbox.io/p/sandbox/gift-box-css-v1vrb?file=%2Fsrc%2FGiftBoxAnimation.js%3A27%2C12-27%2C19
import { ComponentPropsWithoutRef } from 'react'
import './style.css'
import box from './box.png'
import boxLid from './box-lid.png'
import Image from 'next/image'
import cn from '@hsp/ui/src/utils/cn'

export default function GiftBox({
  started,
  ...props
}: ComponentPropsWithoutRef<'button'> & { started: boolean }) {
  return (
    <button
      {...props}
      data-start={started}
      className={cn(
        'group box flex flex-col justify-center items-center fixed bottom-8 left-[calc(50%-40px)] w-20',
        'data-[start=true]:pointer-events-none'
      )} //
      title="Nhấn để mở"
    >
      <Image
        src={boxLid}
        className="lid -mb-2 z-10 shadow-sm w-20 transition-opacity group-data-[start=true]:opacity-0"
        alt="Nắp quà"
      />
      <Image
        src={box}
        className="bottom w-[72px] transition-opacity duration-700 group-data-[start=true]:opacity-0"
        alt="Quà"
      />
    </button>
  )
}
