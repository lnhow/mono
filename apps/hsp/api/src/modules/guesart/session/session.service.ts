import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Socket } from 'socket.io'
import { randomUUID } from 'crypto'
import { ConfigService } from '@nestjs/config'
import { SessionDto, SessionPayload } from './session.type'

@Injectable()
export class GuesartSessionService {
  async getSession(client: Socket) {
    const session = this.getCurrentSession(client)
    if (session) {
      return session
    }

    const newSession = await this.createSession(client)
    if (!newSession) {
      client.emit('error', 'No username provided')
      client.disconnect()
      return null
    }

    client.emit('session', newSession)

    return newSession
  }

  getCurrentSession(client: Socket): SessionDto | null {
    const sessionToken = (client.handshake.auth.token ||
      client.handshake.headers.authorization) as string | undefined
    if (!sessionToken) {
      return null
    }
    try {
      return {
        ...this.jwtService.verify<SessionPayload>(sessionToken, {
          secret: this.secretKey,
        }),
        session: sessionToken,
      }
    } catch {
      return null
    }
  }

  async createSession(client: Socket): Promise<SessionDto | null> {
    const userName = (client.handshake.auth.username ||
      client.handshake.headers.username) as string | undefined
    if (!userName) {
      return null
    }

    const payload: SessionPayload = {
      userId: randomUUID(),
      userName,
    }
    const sessionToken = await this.jwtService.signAsync(payload, {
      expiresIn: GuesartSessionService.SESSION_TTL_IN_MS,
      secret: this.secretKey,
    })

    return {
      ...payload,
      session: sessionToken,
    }
  }

  constructor(
    private jwtService: JwtService,
    config: ConfigService,
  ) {
    this.secretKey = config.get('JWT_SECRET')
  }

  static readonly SESSION_TTL_IN_MS = '1d'
  private secretKey: string
}
