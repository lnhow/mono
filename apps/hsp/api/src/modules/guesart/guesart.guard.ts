import {
  type CanActivate,
  type ExecutionContext,
  Injectable,
} from '@nestjs/common'
import type { GrtSocket } from './types/ws'

@Injectable()
export class GrtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const client = context.switchToWs().getClient<GrtSocket>()
    const sessionUserId = client.data?.session?.userId
    return sessionUserId ? true : false
  }
}
