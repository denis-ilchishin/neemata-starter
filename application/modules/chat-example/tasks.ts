import app from '#app'
import { messageEvent } from './events.ts'

export const transportMessageTask = app
  .task()
  .withArgs<[{ chatId: number; message: string }]>()
  .withHandler(async ({ context }, { chatId, message }) => {
    await context.eventManager.publish(
      messageEvent,
      { message: 'Transformed: ' + message },
      { chatId }
    )
  })
