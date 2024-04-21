import { defaultProcedure } from '#common/procedure.ts'
import { cryptoProvider } from '#common/providers/crypto.ts'
import { loggingMiddleware } from '#common/providers/middlewares.ts'
import { CALL_PROVIDER } from '@neematajs/application'
import { z } from 'zod'
import simpleProcedure from './simple.ts'

export default defaultProcedure
  .withTimeout(5000)
  .withDependencies({
    crypto: cryptoProvider,
    call: CALL_PROVIDER,
  })
  .withMiddlewares(loggingMiddleware)
  .withInput(
    z.object({
      input1: z.string(),
      input2: z.string(),
    })
  )
  .withHandler(async ({ call }, data) => {
    // call another procedure
    const nestedResult = await call(simpleProcedure)
    return `Result from nested call "example/simple": ${nestedResult}`
  })
  .withOutput(
    z
      .string()
      .transform(
        (val) =>
          `This value is transformed through "example/complex" procedure's output serializer: ${val}`
      )
  )
