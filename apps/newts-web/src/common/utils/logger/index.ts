import { isProductionEnv } from '../common'

export const logger = {
  log: (...args: unknown[]) => {
    if (isProductionEnv) {
      return
    }
    console.log(args)
  },
}

export default logger
