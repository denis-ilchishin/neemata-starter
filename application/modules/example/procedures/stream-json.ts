import { publicProcedure } from '#common/procedure.ts'
import { JsonStreamResponse, LOGGER_PROVIDER } from '@neematajs/application'

export default publicProcedure
  .withDependencies({ logger: LOGGER_PROVIDER })
  .withHandler(({ logger }) => {
    const response = new JsonStreamResponse().withChunk<[string, number]>()

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

    return response.withPayload({
      some: 'rpc response payload',
    })
  })
