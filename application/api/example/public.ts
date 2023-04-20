import { publicProcedure } from 'application/app'
import Zod from 'zod'

export default publicProcedure({
  auth: false,
  factory: () => ({
    input: Zod.string(),
    handler: async ({ data }) => {
      return data.charAt(0)
    },
  }),
})
