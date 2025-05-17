import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { randomUUID } from 'crypto'
import { ConfigService } from '@nestjs/config'
import { SessionDto, SessionPayload } from './session.type'
import { GrtSocket } from '../guesart.type'

@Injectable()
export class GrtSessionService {
  async getOrCreateSessionIfNotExist(client: GrtSocket) {
    const session = this.getSessionFromReq(client)
    const userName = GrtSessionService._getUserNameFromAuth(client)
    const isReuseOldSession = session && session.userName === userName

    if (isReuseOldSession) {
      return session
    }

    if (!userName) {
      return null
    }
    return await this.createSession(userName, session && session.userId)
  }

  getSessionFromReq(client: GrtSocket): SessionDto | null {
    const sessionToken = GrtSessionService._getSessionFromAuth(client)
    if (!sessionToken) {
      return null
    }
    try {
      const payload = this.jwtService.verify<
        SessionPayload & { iat: number; exp: number }
      >(sessionToken, {
        secret: this.secretKey,
      })

      return {
        userId: payload.sub,
        userName: payload.userName,
        session: sessionToken,
      }
    } catch {
      return null
    }
  }

  async createSession(
    userName: string,
    userId?: string,
  ): Promise<SessionDto | null> {
    const newUserId = userId || randomUUID()
    const sessionToken = await this.jwtService.signAsync(
      {
        userName,
      },
      {
        expiresIn: GrtSessionService.SESSION_TTL,
        subject: newUserId,
        secret: this.secretKey,
      },
    )

    return {
      userId: newUserId,
      userName,
      session: sessionToken,
    }
  }

  public static extractTokenFromHeader(header?: string): string | undefined {
    const [type, token] = header?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }

  public static extractSession(client: GrtSocket) {
    return client.data.session
  }

  private static _getSessionFromAuth(client: GrtSocket) {
    if (client.handshake.auth.token) {
      return client.handshake.auth.token as string
    }

    return GrtSessionService.extractTokenFromHeader(
      client.handshake.headers.authorization,
    )
  }

  private static _getUserNameFromAuth(client: GrtSocket) {
    const userName = (client.handshake.auth.username ||
      client.handshake.headers.username) as string | undefined
    return userName
  }

  constructor(
    private jwtService: JwtService,
    config: ConfigService,
  ) {
    this.secretKey = config.get('JWT_SECRET')
  }

  static readonly SESSION_TTL = '1d'
  static readonly REFRESH_SESSION_IN_MS = 1000 // 1000 * 60 * 60 // Refresh session 1 hour before it expires
  private secretKey: string
}
