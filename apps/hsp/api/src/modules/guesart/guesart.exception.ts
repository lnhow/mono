import { type ArgumentsHost, Catch } from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'
import { type GrtSocket, GrtWsException } from './types/ws'

@Catch()
export class GrtWsExceptionsFilter extends BaseWsExceptionFilter<GrtWsException> {
  catch(exception: GrtWsException, host: ArgumentsHost) {
    if (exception instanceof GrtWsException) {
      if (exception.event) {
        const client: GrtSocket = host.switchToWs().getClient()
        client.emit(exception.event, {
          error: exception,
        })
        return
      }
    }

    super.catch(exception, host)
  }
}
