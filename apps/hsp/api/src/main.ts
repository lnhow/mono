import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { MongoIoAdapter } from './gateways/mongo.adapter'
import { ConfigService } from '@nestjs/config'
import { isDevEnv } from './_utils/development'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')

  const configService = app.get(ConfigService)

  const mongoIoAdapter = new MongoIoAdapter(app)
  await mongoIoAdapter.initConnection(configService)
  app.useWebSocketAdapter(mongoIoAdapter)

  const PORT = configService.get<number>('PORT') || 8000
  const ENV = configService.get<string>('ENV')
  const isDev = isDevEnv(ENV)

  if (!isDev) {
    app.enableShutdownHooks()
  }

  const config = new DocumentBuilder()
    .setTitle('@hsp/app-api')
    .setDescription(
      "Random APIs that is used in HSP App because I can't find a better place to put them",
    )
    .setVersion('1.0')
    .addTag('@hsp/app-api')
    .build()
  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, documentFactory, {
    // Enable swagger UI only in development environment
    raw: isDev,
    ui: isDev,
  })

  await app.listen(PORT).then(() => {
    console.log(`Listening on port ${PORT}`)
  })
}
void bootstrap()
