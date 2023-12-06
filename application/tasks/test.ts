import { cryptoProvider } from '../domain/crypto.ts'
import { declareTask } from '../helpers.ts'

export const testTask = declareTask(
  {
    handle: async ({ logger, injections }, interations: number) => {
      logger.info(
        'Some CPU-heavy task is being done here with %s iterations...',
        interations
      )
      for (let i = 0; i < interations; i++) {
        injections.crypto.hash(''.padEnd(10, (i ** 2).toString()))
      }
      return `Done with ${interations} iterations.`
    },
    parse: (args, kwargs) => {
      // manually parse agruments for CLI
      const iterations = Array.isArray(kwargs.iterations)
        ? kwargs.iterations[0]
        : kwargs.iterations
      return [parseInt(iterations)] as const
    },
  },
  {
    crypto: cryptoProvider,
  }
)

export default testTask
