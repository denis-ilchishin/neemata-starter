import app from '#app'
import { parse } from 'cookie'
import { authService } from './services/auth.ts'

export const connectionProvider = app
  .connection()
  .withDependencies({ authService })
  .withFactory(({ authService }) => {
    return ({ headers }) => {
      let token: string | undefined
      const { cookie, authorization } = headers

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
    }
  })
