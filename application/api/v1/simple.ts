import { declareProcedure } from '../../helpers.ts'

export default declareProcedure({
  handle: () =>
    'Yay! This is the response from the server. You have made a simple rpc call!',
})
