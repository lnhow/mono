import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MongoIoAdapter } from './gateways/mongo.adapter'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService)

  const mongoIoAdapter = new MongoIoAdapter(app)
  await mongoIoAdapter.initConnection(configService)
  app.useWebSocketAdapter(mongoIoAdapter)

  const PORT = configService.get<number>('PORT') || 8000
  const ENV = configService.get<string>('ENV')

  if (ENV !== 'local') {
    app.enableShutdownHooks()
  }

  await app.listen(PORT).then(() => {
    console.log(`Listening on port ${PORT}`)
  })
}
void bootstrap()
