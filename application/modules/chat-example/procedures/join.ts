import { z } from 'zod'
import { messageEvent } from '../events.ts'
import { chatExampleProcedure } from '../procedure.ts'

export default chatExampleProcedure
  .withInput(
    z.object({
      chatId: z.number(),
    })
  )
  .withHandler(async ({ eventManager, connection }, { chatId }) => {
    const { subscription } = await eventManager.subscribe(
      messageEvent,
      { chatId },
      connection
    )
    return subscription
  })
