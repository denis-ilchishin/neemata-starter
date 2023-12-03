import { Scope } from '@neemata/application'
import { parse } from 'cookie'
import { declareProvider } from '../helpers.ts'
import authProvider from './services/auth.ts'

export default declareProvider(
  {
    scope: Scope.Connection,
    factory: async ({ injections, request }) => {
      const { headers } = request!
      const { cookieName, findUserByToken } = injections.authService
      const token = parse(headers['cookie'] || '')[cookieName]
      if (!token) return null
      const user = await findUserByToken(token)
      if (!user) return null
      return { token, user }
    },
  },
  { authService: authProvider }
)
