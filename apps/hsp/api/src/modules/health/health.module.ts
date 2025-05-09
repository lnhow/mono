import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { PrismaService } from '../_prisma/prisma.service'

@Module({
  controllers: [HealthController],
  providers: [PrismaService],
})
export class HealthCheckModule {}
