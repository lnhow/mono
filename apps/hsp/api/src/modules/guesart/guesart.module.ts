import { Module } from '@nestjs/common'
import { GuesartGateway } from './guesart.gateway'
import { GuesartService } from './guesart.service'
import { GuesartSessionService } from './session/session.service'
import { JwtService } from '@nestjs/jwt'

@Module({
  imports: [],
  controllers: [],
  providers: [
    GuesartGateway,
    GuesartService,
    GuesartSessionService,
    JwtService,
  ],
})
export class GuesartWSModule {}
