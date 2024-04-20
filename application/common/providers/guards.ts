import { Guard } from '@neematajs/application'
import { HttpTransportMethod } from '@neematajs/transport-websockets/dist/lib/common.ts'

export const httpOnlyGuard = new Guard().withValue(
  ({ connection }) => connection.data.transport === 'http'
)

export const postMethodOnlyGuard = new Guard().withValue(
  ({ connection: { data } }) =>
    data.transport === 'http' && data.method === HttpTransportMethod.Post
)
