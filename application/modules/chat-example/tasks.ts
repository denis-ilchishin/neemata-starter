import {
  EVENT_MANAGER_PROVIDER,
  LOGGER_PROVIDER,
  Task,
} from '@neematajs/application'
import { messageEvent } from './events.ts'

export const tranformMessageTask = new Task()
  .withDependencies({
    eventManager: EVENT_MANAGER_PROVIDER,
    logger: LOGGER_PROVIDER,
  })
  .withHandler(
    async (
      { eventManager, logger },
      { chatId, message }: { chatId: number; message: string }
    ) => {
      // here we can emit an event to the clients, that are connected to api workers
      logger.info({ chatId, message }, 'Transforming message')
      await eventManager.publish(
        messageEvent,
        { message: 'Transformed: ' + message },
        { chatId }
      )
    }
  )
