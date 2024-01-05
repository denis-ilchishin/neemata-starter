import app from '#app'
import { cryptoProvider } from '#domain/crypto.ts'
import { guardsProvider } from '#domain/guards.ts'
import { middlewaresProvider } from '#domain/middlewares.ts'
import { z } from 'zod'
import simpleProcedure from './simple.ts'

export default app
  .procedure()
  .withOptions({
    someOptionsForExtensions: 'some value',
  })
  .withTimeout(5000)
  .withDependencies({
    guards: guardsProvider,
    middlewares: middlewaresProvider,
    crypto: cryptoProvider,
  })
  .withGuards(({ injections: { guards } }) => [
    guards.someGuard1,
    guards.someGuard2,
  ])
  .withInput(
    z.object({
      input1: z.string(),
      input2: z.string(),
    })
  )
  .withMiddlewares(({ injections: { middlewares } }) => [
    middlewares.loggingMiddleware,
  ])
  .withHandler(async ({ call }) => {
    // call another procedure
    const nestedResult = await call(simpleProcedure)
    return nestedResult
  })
