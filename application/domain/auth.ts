import { defineContext } from '@neemata/server'
import { parse } from 'cookie'
import authProvider from '../domain/auth.js'

export default defineContext(
  {
    scope: 'connection',
    factory: async (ctx, { headers }) => {
      const { cookieName, findUserByToken } = ctx.injections.authService
      const token = parse(headers['cookie'] || '')[cookieName]
      if (!token) return null
      const user = await findUserByToken(token)
      if (!user) return null
      return { token, user }
    },
  },
  { authService: authProvider }
)
