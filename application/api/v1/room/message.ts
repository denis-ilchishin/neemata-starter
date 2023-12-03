import { Transport } from '@neemata/adapter-uws'
import { z } from 'zod'
import { declareProcedure } from '../../../helpers.ts'

export default declareProcedure({
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
