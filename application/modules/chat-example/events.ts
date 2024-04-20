import { Event } from '@neematajs/application'

export const messageEvent = new Event()
  .withOptions<{ chatId: number }>()
  .withPayload<{ message: string }>()
