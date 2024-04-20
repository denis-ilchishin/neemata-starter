import { tranformMessageTask } from '#modules/chat-example/tasks.ts'
import z from 'zod'
import { chatExampleProcedure } from '../procedure.ts'

export default chatExampleProcedure
  .withInput(
    z.object({
      chatId: z.number(),
      message: z.string(),
    })
  )
  .withHandler(async ({ execute }, { chatId, message }) => {
    // tranform message via  `transportMessageTask`, and then publish from another worker thread (task worker in this case)
    await execute(tranformMessageTask, { chatId, message })
  })
