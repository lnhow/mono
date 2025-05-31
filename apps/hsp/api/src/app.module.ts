import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/health/health.module'
import { GrtWSModule } from './modules/guesart/guesart.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GrtWSModule,
    HealthCheckModule,
  ],
})
export class AppModule {}
