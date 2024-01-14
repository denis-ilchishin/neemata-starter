import { publicProcedure } from '#procedures'

export default publicProcedure.withHandler(() => {
  return 'Yay! This is the response from the server. You have made a simple rpc call!'
})
