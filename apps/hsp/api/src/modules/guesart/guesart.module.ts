import { Module } from '@nestjs/common'
import { GrtGateway } from './guesart.gateway'
import { GrtService } from './guesart.service'
import { GrtSessionService } from './session/session.service'
import { JwtService } from '@nestjs/jwt'
import { GrtRoomService } from './room/room.service'
import { PrismaService } from '../_prisma/prisma.service'

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
