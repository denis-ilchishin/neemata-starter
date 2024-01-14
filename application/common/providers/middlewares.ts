import app from '#app'
import { Readable } from 'node:stream'

export const loggingMiddleware = app.middleware().withFactory(({ context }) => {
  return async ({ path, connection }, next, payload) => {
    let successful: boolean = false
    let error: Error | undefined
    let result: any
    try {
      result = await next(payload)
      successful = true
      return result
    } catch (err) {
      error = err
      successful = false
      throw err
    } finally {
      context.logger.info(
        {
          connection: `${connection.transportData.transport} ${connection.id}`,
          path: path.map((p) => p.name),
          successful,
          payload,
          result:
            result instanceof Readable
              ? 'Instance: <' + result.constructor.name + '>'
              : result,
          error,
        },
        'Logging middleware'
      )
    }
  }
})
