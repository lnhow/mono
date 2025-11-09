import { Module } from '@nestjs/common'
import { HealthCheckModule } from './modules/health/health.module'
import { GrtWSModule } from './modules/guesart/guesart.module'
import { ConfigModule } from '@nestjs/config'
import { PerfTestModule } from './modules/perf-test/perf-test.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GrtWSModule,
    HealthCheckModule,
    PerfTestModule,
  ],
})
export class AppModule {}
