import app from '#app'
import { Scope } from '@neemata/application'
import authServiceProvider from './services/auth.ts'

export const userProvider = app
  .provider()
  .withDependencies({ authService: authServiceProvider })
  .withScope(Scope.Connection)
  .withFactory(async ({ injections, client }) => {
    const { token } = client.data
    const { cookieName, findUserByToken } = injections.authService
    const user = await findUserByToken(token)
    if (!user) return null
    return { token, user }
  })

export const clientProvider = app.clientProvider().withFactory(() => {
  return (t) => {
    return {
      token: 'a',
    }
  }
})
