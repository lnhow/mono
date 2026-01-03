import { createBridgeComponent } from '@module-federation/bridge-react/v19'
import Button from '../button'

const ButtonBridge = createBridgeComponent({
  rootComponent: Button,
})

export default ButtonBridge
