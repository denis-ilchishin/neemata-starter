import { Transport } from '@neemata/adapter-uws'
import { declareProcedure } from '../../helpers.ts'

export default declareProcedure({
  transport: Transport.Http,
  handle: () =>
    'Yay! This is the response from the server. You have made a rpc call via HTTP transport',
})
