import { publicProcedure } from '#procedures'
import testTask from 'application/common/tasks/test.ts'

export default publicProcedure.withHandler(async ({ context }) => {
  const result = await context.execute(testTask, 250).result
  return result
})
