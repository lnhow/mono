// src/gateways/mongo.adapter.ts

import { IoAdapter } from '@nestjs/platform-socket.io'
import { Server, ServerOptions } from 'socket.io'
import { MongoClient } from 'mongodb'
import { createAdapter } from '@socket.io/mongo-adapter'
import { ConfigService } from '@nestjs/config'

export class MongoIoAdapter extends IoAdapter {
  private mongoClient: MongoClient
  private adapter: ReturnType<typeof createAdapter>

  async initConnection(configService: ConfigService): Promise<void> {
    const uri = configService.get<string>('API_DATABASE_URL')
    const dbName = configService.get<string>('API_DATABASE_NAME')
    const collectionName = configService.get<string>(
      'API_SOCKET_ADAPTER_COLLECTION',
    )

    this.mongoClient = new MongoClient(uri)
    await this.mongoClient.connect()

    try {
      await this.mongoClient.db(dbName).createCollection(collectionName, {
        capped: true,
        size: 1e6,
      })
    } catch {
      // Ignore if the collection already exists
    }

    const mongoCollection = this.mongoClient
      .db(dbName)
      .collection(collectionName)

    await mongoCollection.createIndex(
      { createdAt: 1 },
      { expireAfterSeconds: 3600, background: true },
    )

    this.adapter = createAdapter(mongoCollection, {
      addCreatedAtField: true,
      requestsTimeout: 20000,
      heartbeatInterval: 20000,
      heartbeatTimeout: 40000,
    })
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options) as Server

    // Apply the Mongo adapter to the Socket.IO server
    server.adapter(this.adapter)

    return server
  }

  async close() {
    if (this.mongoClient) {
      await this.mongoClient.close()
    }
  }
}
