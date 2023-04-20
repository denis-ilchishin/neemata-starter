import { UserApplication } from '@neemata/core'

const app = new UserApplication()

app.auth = 'serviceAuth'

export default app

export const publicProcedure = app.declareProcedure({
  // middleware: {
  //   serviceAuthMiddleware: true,
  // },
  // deps: {
  //   dbKnex: true,
  // },
})
