// import { Type } from '@sinclair/typebox'

export default defineApiModule({
  auth: false,
  handler: async () => {
    return 'Simple nested endpoint'
  },
})
