import { LOGGER_PROVIDER, Middleware } from '@neematajs/application'
import { Readable } from 'node:stream'

export const loggingMiddleware = new Middleware()
  .withDependencies({ logger: LOGGER_PROVIDER })
  .withFactory(({ logger }) => {
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
        logger.info(
          {
            connection: `${connection.data.transport} ${connection.id}`,
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
