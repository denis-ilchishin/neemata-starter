import { Transport } from '@neemata/adapter-uws'
import application from '../../application.ts'

export default application.api.declareProcedure({
  transport: Transport.Http,
  handle: () =>
    'Yay! This is the response from the server. You have made a rpc call via HTTP transport',
})
