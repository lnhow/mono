import { Module } from '@nestjs/common'
import { PerfTestController } from './perf-test.controller'
import { PerfTestService } from './perf-test.service'

@Module({
  controllers: [PerfTestController],
  providers: [PerfTestService],
})
export class PerfTestModule {}
