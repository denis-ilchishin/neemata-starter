import { createBinaryResponse } from '@neemata/application'
import { declareProcedure } from '../../helpers.ts'

export default declareProcedure({
  handle: ({ logger }) => {
    const response = createBinaryResponse<{ some: string }, Uint8Array>(
      'plain/text',
      {
        some: 'rpc response payload',
      }
    )
    let i = 0
    const interval = setInterval(() => {
      if (i < 10) {
        response.write(`This is the ${i}th line`)
        i++
      } else {
        response.end()
        clearInterval(interval)
      }
    }, 250)
    return response
  },
})
