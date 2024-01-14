import app from '#app'
import { cryptoProvider } from 'application/common/providers/crypto.ts'

export const testTask = app
  .task()
  .withDependencies({ crypto: cryptoProvider })
  .withHandler(async ({ context, crypto }, interations: number) => {
    context.logger.info(
      'Some CPU-heavy task is being done here with %s iterations...',
      interations
    )
    for (let i = 0; i < interations; i++) {
      crypto.hash(''.padEnd(10, (i ** 2).toString()))
    }
    return `Done with ${interations} iterations.`
  })
  .withParser((args, kwargs) => {
    // manually parse command line agruments
    const iterations = Array.isArray(kwargs.iterations)
      ? kwargs.iterations[0]
      : kwargs.iterations
    return [parseInt(iterations)]
  })

export default testTask
