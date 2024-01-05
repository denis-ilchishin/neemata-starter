import app from '#app'
import { cryptoProvider } from '../domain/crypto.ts'

export const testTask = app
  .task()
  .withDependencies({ crypto: cryptoProvider })
  .withHandler(async ({ logger, injections }, interations: number) => {
    logger.info(
      'Some CPU-heavy task is being done here with %s iterations...',
      interations
    )
    for (let i = 0; i < interations; i++) {
      injections.crypto.hash(''.padEnd(10, (i ** 2).toString()))
    }
    return `Done with ${interations} iterations.`
  })
  .withParser((args, kwargs) => {
    // manually parse agruments for CLI
    const iterations = Array.isArray(kwargs.iterations)
      ? kwargs.iterations[0]
      : kwargs.iterations
    return [parseInt(iterations)]
  })

export default testTask
