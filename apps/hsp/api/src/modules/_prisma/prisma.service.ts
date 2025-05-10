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
    console.log(
      '\x1B[35m[Dev log]\x1B[0m -> bootstrap -> PORT:',
      configService.get('PORT'),
      configService.get('API_DATABASE_URL'),
      configService.get('API_DATABASE_NAME'),
      configService.get('API_SOCKET_ADAPTER_COLLECTION'),
    )
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
