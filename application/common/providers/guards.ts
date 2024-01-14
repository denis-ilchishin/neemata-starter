import { HttpTransportMethod } from '@neemata/transport-websockets/dist/lib/common'
import app from 'application/application.ts'

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
