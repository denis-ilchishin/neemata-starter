import { Transport, defineProcedure } from '@neemata/server'

export default defineProcedure({
  transport: Transport.Http,
  handle: () =>
    'Yay! This is the response from the server. You have made an rpc call via HTTP transport',
})
