import { createBridgeComponent } from '@module-federation/bridge-react/v19'
import Card from '../card'

const CardBridge = createBridgeComponent({
  rootComponent: Card,
})

export default CardBridge
