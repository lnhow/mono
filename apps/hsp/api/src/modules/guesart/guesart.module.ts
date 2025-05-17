import { Module } from '@nestjs/common'
import { GrtGateway } from './guesart.gateway'
import { GrtService } from './guesart.service'
import { GrtSessionService } from './session/session.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [],
  controllers: [],
  providers: [GrtGateway, GrtService, GrtSessionService, JwtService],
})
export class GrtWSModule {}
