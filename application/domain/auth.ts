import { Scope } from '@neemata/application'
import { parse } from 'qs'
import { declareProvider } from '../helpers.ts'
import authServiceProvider from './services/auth.ts'

export const userProvider = declareProvider(
  {
    scope: Scope.Connection,
    factory: async ({ injections, client }) => {
      const { token } = client.data
      const { cookieName, findUserByToken } = injections.authService
      const user = await findUserByToken(token)
      if (!user) return null
      return { token, user }
    },
  },
  { authService: authServiceProvider }
)

export const httpClientProvider = declareProvider((ctx, { headers }) => {
  const { cookie, authorization } = headers
  const token = cookie
    ? parse(headers['cookie'] || '')
    : authorization
    ? authorization.split(': ')[1]
    : undefined
  return { token }
})
