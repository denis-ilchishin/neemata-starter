import { createJsonResponse } from '@neemata/application'
import { declareProcedure } from '../../helpers.ts'

export default declareProcedure({
  handle: ({ logger }) => {
    const response = createJsonResponse({ some: 'rpc response payload' }).with<
      [string, number]
    >()

    let i = 0

    const interval = setInterval(() => {
      if (i < 10) {
        response.write([`${i}`, i])
        i++
      } else {
        response.end()
        clearInterval(interval)
      }
    }, 250)

    response.once('error', (error) => {
      clearInterval(interval)
      logger.error(error)
    })

    return response
  },
})
