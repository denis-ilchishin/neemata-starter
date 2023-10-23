import { defineTask } from '@neemata/server'
import authContext from '../contexts/auth.ts'

export default defineTask(
  (ctx, arg: number) =>
    new Promise((resolve, reject) => {
      ctx.signal.addEventListener('abort', reject, { once: true })
      // only "global" scope contexts are available here
      if (ctx.injections.auth) {
        // never runs, since "authContext" has "connection" scope
      }
      ctx.logger.info(
        'Yay! This is a message from separate thread and it does not block main thread. We can do some CPU-intensive stuff here'
      )
      new Promise((resolve) => setTimeout(resolve, 25000)).then(() =>
        resolve(arg * 2)
      )
    }),
  { auth: authContext }
)
