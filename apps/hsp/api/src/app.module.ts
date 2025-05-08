import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/health/health.module'
import { GuesartWSModule } from './modules/guesart/guesart.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GuesartWSModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
