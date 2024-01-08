import { publicProcedure } from '#procedures'
import { testTask } from '../../tasks/test.ts'

export default publicProcedure.withHandler(async ({ app }) => {
  return await app.execute(testTask, 250).result
})
