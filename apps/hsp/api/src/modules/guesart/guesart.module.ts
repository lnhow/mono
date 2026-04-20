import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../_prisma/prisma.service'
import { GrtGateway } from './guesart.gateway'
import { GrtService } from './guesart.service'
import { GrtRoomService } from './room/room.service'
import { GrtSessionService } from './session/session.service'

@Module({
  imports: [],
  controllers: [],
  providers: [
    GrtGateway,
    GrtService,
    GrtSessionService,
    GrtRoomService,
    JwtService,
    PrismaService,
  ],
})
export class GrtWSModule {}
