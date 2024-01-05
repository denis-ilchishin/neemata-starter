import app from '#app'
import { JsonStreamResponse } from '@neemata/application'

export default app.procedure().withHandler(({ logger }) => {
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
