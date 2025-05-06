import { Module } from '@nestjs/common'
import { GuesartGateway } from './guesart.gateway'

@Module({
  imports: [],
  controllers: [],
  providers: [GuesartGateway],
})
export class GuesartWSModule {}
