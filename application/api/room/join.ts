import { Transport, defineProcedure } from '@neemata/server'
import { z } from 'zod'
import { defaultProcedureDependencies } from '../../domain/globals.ts'

const schema = z.object({
  roomId: z.string(),
})

export default defineProcedure(
  {
    transport: Transport.Ws,
    input: (ctx, data) => schema.parseAsync(data),
    handle: async (ctx, data, { websocket }) => {
      websocket.join(data.roomId)
    },
  },
  { ...defaultProcedureDependencies }
)
