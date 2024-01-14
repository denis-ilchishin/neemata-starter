import { publicProcedure } from '#procedures'
import { z } from 'zod'
import { messageEvent } from '../../events.ts'

export default publicProcedure
  .withInput(
    z.object({
      chatId: z.number(),
    })
  )
  .withHandler(
    async ({ context: { eventManager, connection } }, { chatId }) => {
      const [subscription] = await eventManager.subscribe(
        messageEvent,
        { chatId },
        connection
      )
      return subscription
    }
  )
