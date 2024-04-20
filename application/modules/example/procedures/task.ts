import { publicProcedure } from '#common/procedure.ts'
import { EXECUTE_PROVIDER } from '@neematajs/application'
import testTask from 'application/core/tasks/test.ts'

export default publicProcedure
  .withDependencies({
    execute: EXECUTE_PROVIDER,
  })
  .withHandler(async ({ execute }) => {
    const { error, result } = await execute(testTask, 250)
    if (error) throw error
    return result
  })
