import { ComponentPropsWithRef } from 'react'

export type HspPlayerProps = ComponentPropsWithRef<'video'>

export default function HspPlayer(props: HspPlayerProps) {
  return (
    <figure>
      <video {...props}>Your browser does not support the video tag.</video>
      <figcaption className="text-center mt-2">
        Sample Video - Custom HTML Video Player
      </figcaption>
    </figure>
  )
}
