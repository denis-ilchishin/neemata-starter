import app from '#app'

export const loggingMiddleware = app.middleware().withFactory(({ app }) => {
  return async ({ name, connection }, next, payload) => {
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
      app.logger.info(
        {
          connection,
          procedure: name,
          successful,
          payload,
          result,
          error,
        },
        'Logging middleware'
      )
    }
  }
})
