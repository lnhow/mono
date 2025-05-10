import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MongoIoAdapter } from './gateways/mongo.adapter'
import { ConfigService } from '@nestjs/config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  const PORT = configService.get<number>('PORT')

  const mongoIoAdapter = new MongoIoAdapter(app)
  await mongoIoAdapter.initConnection(configService)
  app.useWebSocketAdapter(mongoIoAdapter)

  await app.listen(PORT).then(() => {
    console.log(`Listening on port ${PORT}`)
  })
}
void bootstrap()
