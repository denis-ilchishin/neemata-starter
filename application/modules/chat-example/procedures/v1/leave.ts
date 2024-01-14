import { publicProcedure } from '#procedures'
import { z } from 'zod'
import { messageEvent } from '../../events.ts'

export default publicProcedure
  .withInput(
    z.object({
      chatId: z.number(),
    })
  )
  .withHandler(({ context: { eventManager, connection } }, { chatId }) => {
    eventManager.unsubscribe(messageEvent, { chatId }, connection)
  })
