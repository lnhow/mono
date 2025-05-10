import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MongoIoAdapter } from './gateways/mongo.adapter'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT') || 8000
  console.log(
    '\x1B[35m[Dev log]\x1B[0m -> bootstrap -> PORT:',
    PORT,
    configService.get('API_DATABASE_URL'),
    configService.get('API_DATABASE_NAME'),
    configService.get('API_SOCKET_ADAPTER_COLLECTION'),
  )

  const mongoIoAdapter = new MongoIoAdapter(app)
  await mongoIoAdapter.initConnection(configService)
  app.useWebSocketAdapter(mongoIoAdapter)

  await app.listen(PORT).then(() => {
    console.log(`Listening on port ${PORT}`)
  })
}
void bootstrap()
