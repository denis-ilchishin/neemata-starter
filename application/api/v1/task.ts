import { declareProcedure } from '../../helpers.ts'
import { testTask } from '../../tasks/test.ts'

export default declareProcedure({
  handle: async ({ execute }) => {
    return { result: await execute(testTask, 250).result }
  },
})
