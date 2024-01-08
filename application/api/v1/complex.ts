import app from '#app'
import { cryptoProvider } from '#domain/crypto.ts'
import { loggingMiddleware } from '#domain/middlewares.ts'
import { adminUserProvider } from '#domain/services/auth.ts'
import { z } from 'zod'
import simpleProcedure from './simple.ts'

export default app
  .procedure()
  .withOptions({
    someOptionsForExtensions: 'some value',
  })
  .withTimeout(5000)
  .withDependencies({
    crypto: cryptoProvider,
    user: adminUserProvider,
  })
  .withMiddlewares(loggingMiddleware)
  .withInput(
    z.object({
      input1: z.string(),
      input2: z.string(),
    })
  )
  .withHandler(async ({ app }, data) => {
    // call another procedure
    const nestedResult = await app.call(simpleProcedure)
    return nestedResult
  })
  .withOutput(
    z.string().transform((val) => ({
      transformed: val,
    }))
  )
