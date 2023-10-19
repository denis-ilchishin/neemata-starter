import { Transport, defineProcedure } from '@neemata/server'
import { z } from 'zod'

const schema = z.object({
  roomId: z.string(),
  message: z.string(),
})

export default defineProcedure({
  transport: Transport.Ws,
  input: (ctx, data) => schema.parseAsync(data),
  handle: async (ctx, data, { websocket }) => {
    const room = websocket.rooms().get(data.roomId)
    if (room) room.publish('message', data.message)
  },
})
