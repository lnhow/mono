import { Controller, Get } from '@nestjs/common'
import type { PrismaService } from '../_prisma/prisma.service'
// import { ApiTags } from '@nestjs/swagger'

// @ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  getHealth() {
    return { status: 'ok' }
  }

  @Get('db')
  async getDbHealth() {
    const result = await this.prisma.test.findMany()
    return { status: 'ok', data: result }
  }
}
