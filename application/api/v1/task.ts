import app from '#app'
import { testTask } from '../../tasks/test.ts'

export default app.procedure().withHandler(async ({ execute }) => {
  return await execute(testTask, 250).result
})
