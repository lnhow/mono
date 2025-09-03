import React, { ComponentPropsWithRef, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Group } from 'three'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { useAtomValue } from 'jotai'
import { cakeSceneAtom, SCENE_CONFIG } from '../_state'

const ANIMATION: Record<
  'position' | 'scale' | 'rotation',
  { from: gsap.TweenVars; to: gsap.TweenVars }
> = {
  position: {
    from: {
      x: 0,
      y: 2,
      z: 0,
    },
    to: {
      x: 0,
      y: -2,
      z: 0,
    },
  },
  scale: {
    from: {
      x: 0.02,
      y: 0.02,
      z: 0.02,
    },
    to: {
      x: 0.4,
      y: 0.4,
      z: 0.4,
    },
  },
  rotation: {
    from: {
      x: 0,
      y: 0,
      z: 0,
    },
    to: {
      x: 0,
      y: Math.PI * 1.5,
      z: 0,
    },
  },
} as const

export function Cake(props: ComponentPropsWithRef<'group'>) {
  const cakeScene = useAtomValue(cakeSceneAtom)
  const { scene } = useGLTF(SCENE_CONFIG[cakeScene].model.link)
  const container = useRef<Group>(null)

  useGSAP(
    () => {
      if (!container.current) {
        return
      }
      gsap.fromTo(container.current.rotation, ANIMATION.rotation.from, {
        ...ANIMATION.rotation.to,
        duration: 1,
        ease: 'circ.out',
      })
      gsap.fromTo(container.current.scale, ANIMATION.scale.from, {
        ...ANIMATION.scale.to,
        duration: 1,
        ease: 'steps.out',
      })
      gsap.fromTo(container.current.position, ANIMATION.position.from, {
        ...ANIMATION.position.to,
        duration: 1,
        ease: 'bounce.out',
        delay: 0.2,
      })
    },
    { scope: container },
  )

  return (
    <group ref={container} {...props}>
      <primitive className="cake" object={scene} {...SCENE_CONFIG[cakeScene].model.attributes} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshToonMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}
