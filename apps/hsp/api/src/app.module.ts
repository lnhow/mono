import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/health/health.module'
import { GuesartWSModule } from './modules/guesart/guesart.module'

@Module({
  imports: [GuesartWSModule, HealthCheckModule],
})
export class AppModule {}
