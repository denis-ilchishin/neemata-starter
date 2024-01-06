import app from '#app'
import { MiddlewareFn } from '@neemata/application'

export const middlewaresProvider = app.provider().withFactory(({ logger }) => {
  const loggingMiddleware: MiddlewareFn = async (
    { name, client },
    next,
    payload
  ) => {
    let successful: boolean = false
    let error: Error | undefined
    let result: any
    try {
      result = await next(payload)
      successful = true
      return result
    } catch (err) {
      error = error
      successful = false
      throw err
    } finally {
      logger.info('Logging middleware', {
        client: client.data,
        procedure: name,
        successful,
        payload,
        result,
        error,
      })
    }
  }
  return { loggingMiddleware }
})
