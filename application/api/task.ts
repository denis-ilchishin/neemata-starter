import { defineProcedure } from '@neemata/server'
import { randomInt } from 'crypto'
import someTask from '../tasks/some-task.ts'

export default defineProcedure({
  guards: ({ injections: { guards } }) => [guards.onlyAuthorized],
  handle: async (ctx, data) => {
    const arg = randomInt(0, 10)
    const taskResult = await ctx.invoke(someTask, { args: [arg] })
    return {
      data,
      auth: ctx.injections.auth,
      taskResult,
    }
  },
})
