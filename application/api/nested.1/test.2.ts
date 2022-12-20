import { Transport } from '@neemata/common'

export default defineApiModule({
  schema: lib.zod.object({
    a: lib.zod.string(),
  }),
  auth: true,
  transport: Transport.Http,
  handler: () => {
    return 'nested.test version 1.2'
  },
})
