import { Transport } from '@neemata/adapter-uws'
import { z } from 'zod'
import application from '../../../application.ts'

export default application.api.declareProcedure({
  transport: Transport.Ws,
  input: z.object({
    roomId: z.string(),
    message: z.string(),
  }),
  handle: async ({ request }, data) => {
    const { websocket } = request!
    const room = websocket!.rooms.get(data.roomId)
    if (room) room.publish('message', data.message)
  },
})
