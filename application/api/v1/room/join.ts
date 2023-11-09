import { Transport } from '@neemata/adapter-uws'
import { TypeOf, z } from 'zod'
import application from '../../../application.ts'

const schema = z.object({
  roomId: z.string(),
})

export default application.api.declareProcedure({
  transport: Transport.Ws,
  input: schema,
  handle: async (ctx, data: TypeOf<typeof schema>) => {
    const { websocket } = ctx.request!
    websocket!.join(data.roomId)
  },
})
