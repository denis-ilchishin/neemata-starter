import { Transport } from '@neemata/adapter-uws'
import { z } from 'zod'
import application from '../../../application.ts'

export default application.api.declareProcedure({
  transport: Transport.Ws,
  input: z.object({
    roomId: z.string(),
  }),
  handle: async (ctx, data) => {
    const { websocket } = ctx.request!
    websocket!.join(data.roomId)
  },
})
