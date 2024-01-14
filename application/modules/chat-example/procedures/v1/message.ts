import app from '#app'
import { transportMessageTask } from '#modules/chat-example/tasks.ts'
import z from 'zod'

export default app
  .procedure()
  .withInput(
    z.object({
      chatId: z.number(),
      message: z.string(),
    })
  )
  .withHandler(async ({ context }, { chatId, message }) => {
    // tranform message via  `transportMessageTask`, and then publish from another worker thread
    await context.execute(transportMessageTask, { chatId, message }).result
  })
