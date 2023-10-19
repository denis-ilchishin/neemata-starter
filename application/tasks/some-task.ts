import { defineTask } from '@neemata/server'
import authContext from '../contexts/auth.ts'

export default defineTask(
  (ctx, arg: number) => {
    if (ctx.injections.auth) {
      // never runs, since "authContext" has "connection" scope
      // only "global" scope contexts are available here
    }
    return arg * 2
  },
  { auth: authContext }
)
