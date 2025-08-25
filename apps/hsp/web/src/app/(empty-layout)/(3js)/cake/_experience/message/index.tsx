import { Center, Text3D } from '@react-three/drei'
import { font } from '../../../_shared/const'

export default function TextMessage() {
  return (
    <Center position={[0, 1.5, -2]}>
      <Text3D font={font} size={0.5}>
        {'Happy\nbirthday!'}
        <meshStandardMaterial color="#f5f5f5" />
      </Text3D>
    </Center>
  )
}
