import { Text3D, useFont } from '@react-three/drei'
import { font } from '../../../_shared/const'
import { Mesh } from 'three/src/Three.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js'
import { useEffect, useRef } from 'react'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useAtomValue } from 'jotai'
import { cakeAtom, SCENE_CONFIG, TEXT } from '../_state'

export default function TextMessage() {
  const cake = useAtomValue(cakeAtom)
  const threeFont = useFont(font)
  const refText = useRef<Mesh>(null)

  useEffect(() => {
    if (!refText.current) {
      return
    }

    const lines = cake.message.split('\n')
    const geometries = lines.map((line, index) => {
      const geometry = new TextGeometry(line, {
        // @ts-expect-error False positive
        font: threeFont,
        size: TEXT.SIZE,
        depth: 0.2,
      })

      geometry.center()
      geometry.translate(0, -index * TEXT.LINE_HEIGHT, 0)

      return geometry
    })

    const mergedGeometry = mergeGeometries(geometries)
    mergedGeometry.center()

    refText.current.geometry = mergedGeometry

    return () => {
      mergedGeometry.dispose()
    }
  }, [threeFont, cake.message])

  useGSAP(
    () => {
      if (!refText.current) {
        return
      }
      gsap.fromTo(
        refText.current.scale,
        { x: 0, y: 0, z: 0 },
        { x: 1, y: 1, z: 1, duration: 1, delay: 0.8, ease: 'bounce.out' },
      )
    },
    { scope: refText },
  )

  return (
    <Text3D font={threeFont.data} position={[0, 1.5, -2]} ref={refText}>
      <meshToonMaterial color={SCENE_CONFIG[cake.scene].textColor} />
    </Text3D>
  )
}
