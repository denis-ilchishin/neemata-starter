import { Transport } from '@neemata/adapter-uws'
import { TypeOf, z } from 'zod'
import application from '../../../application.ts'

const schema = z.object({
  roomId: z.string(),
  message: z.string(),
})

export default application.api.declareProcedure({
  transport: Transport.Ws,
  input: schema,
  handle: async ({ request }, data: TypeOf<typeof schema>) => {
    const { websocket } = request!
    const room = websocket!.rooms.get(data.roomId)
    if (room) room.publish('message', data.message)
  },
})
