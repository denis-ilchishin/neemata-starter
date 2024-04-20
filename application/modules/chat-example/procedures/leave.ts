import { z } from 'zod'
import { messageEvent } from '../events.ts'
import { chatExampleProcedure } from '../procedure.ts'

export default chatExampleProcedure
  .withInput(
    z.object({
      chatId: z.number(),
    })
  )
  .withHandler(({ eventManager, connection }, { chatId }) => {
    eventManager.unsubscribe(messageEvent, { chatId }, connection)
  })
