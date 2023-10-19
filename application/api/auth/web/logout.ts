import { Transport, defineProcedure } from '@neemata/server'
import { serialize } from 'cookie'
import authProvider from '../../../domain/auth.ts'
import { defaultProcedureDependencies } from '../../../domain/globals.ts'

export default defineProcedure(
  {
    httpMethod: ['get'],
    transport: Transport.Http,
    guards: (ctx) => [ctx.injections.guards.onlyAuthorized],
    handle: async (ctx, data, { setHeader }) => {
      const { cookieName, deleteUserToken } = ctx.injections.authService
      await deleteUserToken(ctx.injections.auth!.token)
      setHeader(
        'Set-Cookie',
        serialize(cookieName, '', {
          path: '/',
          httpOnly: true,
          expires: new Date(0),
        })
      )
    },
  },
  {
    ...defaultProcedureDependencies,
    authService: authProvider,
  }
)
