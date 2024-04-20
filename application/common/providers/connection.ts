import { CONNECTION_PROVIDER, Provider, Scope } from '@neematajs/application'
import { parse } from 'cookie'
import { authService } from './auth.ts'

export const authProvider = new Provider()
  .withScope(Scope.Connection)
  .withDependencies({ authService, connection: CONNECTION_PROVIDER })
  .withFactory(({ authService, connection }) => {
    let token: string | undefined
    const { cookie, authorization } = connection.data.headers

    if (cookie) {
      token = parse(cookie)[authService.cookieName]
    } else if (authorization) {
      token = authorization.split(' ')[1]
    }

    if (token) {
      // pretending to parse jwt
      const [encodedHeader, encodedPayload] = token.split('.')
      const { id, scope } = JSON.parse(
        Buffer.from(encodedPayload, 'base64url').toString()
      )

      return {
        id,
        scope,
      }
    }
  })
