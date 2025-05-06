import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { GuesartGateway } from './modules/guesart/guesart.gateway'

@Module({
  imports: [GuesartGateway],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
