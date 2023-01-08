import { Type } from '@sinclair/typebox'

export default defineApiModule({
  auth: false,
  schema: Type.Object({ somekey: Type.String() }),
  handler: ({ auth, data, res }) => {
    return 'nested.endpoint version 1.2'
  },
})
