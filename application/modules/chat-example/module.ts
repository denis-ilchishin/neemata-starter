import { Module } from '@neematajs/application'
import { messageEvent } from './events.ts'
import join from './procedures/join.ts'
import leave from './procedures/leave.ts'
import message from './procedures/message.ts'
import { tranformMessageTask } from './tasks.ts'

export const chatExampleModule = new Module()
  .withProcedures({
    join,
    leave,
    message,
  })
  .withEvents({
    message: messageEvent,
  })
  .withTasks({
    transform: tranformMessageTask,
  })
