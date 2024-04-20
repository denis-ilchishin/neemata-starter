import { publicProcedure } from '#common/procedure.ts'
import { BinaryStreamResponse } from '@neematajs/application'

export default publicProcedure.withHandler(() => {
  const response = new BinaryStreamResponse('plain/text')

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

  return response.withPayload({
    some: 'rpc response payload',
  })
})
