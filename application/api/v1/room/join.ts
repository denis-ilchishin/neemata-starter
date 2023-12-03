import { Transport } from '@neemata/adapter-uws'
import { z } from 'zod'
import { declareProcedure } from '../../../helpers.ts'

export default declareProcedure({
  transport: Transport.Ws,
  input: z.object({
    roomId: z.string(),
  }),
  handle: async (ctx, data) => {
    const { websocket } = ctx.request!
    websocket!.join(data.roomId)
  },
})
