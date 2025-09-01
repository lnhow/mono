import { Center, Text3D, useMatcapTexture } from '@react-three/drei'
import { font } from '../../../_shared/const'
import { SRGBColorSpace } from 'three/src/Three.js'

export default function TextMessage() {
  const [matcapTexture] = useMatcapTexture(
      '7B5254_E9DCC7_B19986_C8AC91',
      256,
      (texture) => {
        const textures = Array.isArray(texture) ? texture : [texture]
        for (const item of textures) {
          item.colorSpace = SRGBColorSpace
        }
      },
    )
  return (
    <Center position={[0, 1.5, -2]}>
      <Text3D font={font} size={0.5}>
        {'Happy\nbirthday!'}
        <meshMatcapMaterial color="#fdd0d3" matcap={matcapTexture} />
      </Text3D>
    </Center>
  )
}
