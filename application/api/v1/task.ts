import { Transport } from '@neemata/adapter-uws'
import { declareProcedure } from '../../helpers.ts'
import { testTask } from '../../tasks/test.ts'

export default declareProcedure({
  transport: Transport.Http,
  handle: ({ execute }) => {
    return execute(testTask, 250).result
  },
})
