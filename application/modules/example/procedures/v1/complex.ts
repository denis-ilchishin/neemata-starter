import app from '#app'
import { cryptoProvider } from '#common/providers/crypto.ts'
import { loggingMiddleware } from '#common/providers/middlewares.ts'
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
    // user: adminUserProvider,
  })
  .withMiddlewares(loggingMiddleware)
  .withInput(
    z.object({
      input1: z.string(),
      input2: z.string(),
    })
  )
  .withHandler(async ({ context }, data) => {
    // call another procedure
    const nestedResult = await context.call(simpleProcedure)
    return nestedResult
  })
  .withOutput(
    z.string().transform((val) => ({
      transformed: val,
    }))
  )
