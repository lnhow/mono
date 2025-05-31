import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from 'generated/prisma'

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private logger: Logger = new Logger('PrismaService')
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('API_DATABASE_URL'),
        },
      },
    })
  }
  async onModuleInit() {
    await this.$connect()
    this.logger.log('PrismaService: onModuleInit')
  }
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
