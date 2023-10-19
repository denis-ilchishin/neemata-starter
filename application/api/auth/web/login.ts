import {
  ApiError,
  ErrorCode,
  Transport,
  defineProcedure,
} from '@neemata/server'
import { serialize } from 'cookie'
import { z } from 'zod'
import authProvider from '../../../domain/auth.ts'
import { defaultProcedureDependencies } from '../../../domain/globals.ts'

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default defineProcedure(
  {
    transport: Transport.Http,
    httpMethod: ['get'],
    guards: (ctx) => [ctx.injections.guards.onlyUnauthorized],
    input: (ctx, data) => schema.parseAsync(data),
    handle: async ({ injections: { authService } }, data, { setHeader }) => {
      const user = await authService.findUserByEmail(data.email)
      if (!user) throw new ApiError(ErrorCode.BadRequest)
      const { token } = await authService.createUserToken(user.id)
      const cookie = serialize(authService.cookieName, token, {
        path: '/',
        httpOnly: true,
      })
      setHeader('Set-Cookie', cookie)
    },
  },
  {
    ...defaultProcedureDependencies,
    authService: authProvider,
  }
)
