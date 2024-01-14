import app from '#app'

export const messageEvent = app
  .event()
  .withOptions<{ chatId: number }>()
  .withPayload<{ message: string }>()
