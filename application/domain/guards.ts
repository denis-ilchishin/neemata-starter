import app from '#app'
import { HttpTransportMethod } from '@neemata/transport-http'

export const httpOnlyGuard = app
  .guard()
  .withValue(({ connection }) => connection.transportData.transport === 'http')

export const postMethodOnlyGuard = app
  .guard()
  .withValue(
    ({ connection: { transportData } }) =>
      transportData.transport === 'http' &&
      transportData.method === HttpTransportMethod.Post
  )
