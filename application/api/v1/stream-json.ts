import { publicProcedure } from '#procedures'
import { JsonStreamResponse } from '@neemata/application'

export default publicProcedure.withHandler(({ app }) => {
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
    app.logger.error(error)
  })

  return response.withPayload({
    some: 'rpc response payload',
  })
})
