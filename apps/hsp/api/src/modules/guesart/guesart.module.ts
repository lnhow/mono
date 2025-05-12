import { Module } from '@nestjs/common'
import { GuesartGateway } from './guesart.gateway'
import { GuesartService } from './guesart.service'

@Module({
  imports: [],
  controllers: [],
  providers: [GuesartGateway, GuesartService],
})
export class GuesartWSModule {}
