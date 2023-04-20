import { publicProcedure } from 'application/app'
import Zod from 'zod'

export default publicProcedure({
  auth: false,
  factory: () => ({
    input: Zod.number(),
    handler: async ({ data }) => {
      return {
        data,
      }
    },
    // output: Zod.object({
    //   b: Zod.string(),
    // }),
  }),
})
